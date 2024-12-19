<template>
  <div class="dashboard-container bg-0A1128 text-FEFCFB min-vh-100 d-flex flex-column justify-content-center align-items-center">
    <div class="card w-100 p-4 shadow-lg bg-001F54" style="max-width: 600px; border-radius: 16px">
      <h1 class="text-center text-1282A2 mb-4">
        Sélection des Marques et Composants
      </h1>

      <!-- Sélection des Marques -->
      <div class="mb-4">
        <label for="marque" class="form-label fw-bold text-FEFCFB">Marques :</label>
        <select v-model="selectedMarque" id="marque" class="form-select border-0 bg-034078 text-FEFCFB shadow-sm" style="height: 50px; border-radius: 12px" @change="fetchModeles">
          <option value="">Sélectionnez une marque</option>
          <option v-for="marque in marques" :key="marque.marque" :value="marque.marque">
            {{ marque.marque }}
          </option>
        </select>
      </div>

      <!-- Sélection des Modèles -->
      <div class="mb-4">
        <label for="modele" class="form-label fw-bold text-FEFCFB">Modèles :</label>
        <select v-model="selectedModele" id="modele" class="form-select border-0 bg-034078 text-FEFCFB shadow-sm" style="height: 50px; border-radius: 12px" @change="fetchComposants">
          <option value="">Sélectionnez un modèle</option>
          <option v-for="modele in modeles" :key="modele.modele" :value="modele.modele">
            {{ modele.modele }}
          </option>
        </select>
      </div>

      <!-- Sélection des Composants ADAS -->
      <div class="mb-4">
        <label for="composant-adas" class="form-label fw-bold text-FEFCFB">Composants ADAS :</label>
        <select v-model="selectedComposant" id="composant-adas" class="form-select border-0 bg-034078 text-FEFCFB shadow-sm" style="height: 50px; border-radius: 12px" @change="checkPDF">
          <option value="">Sélectionnez un composant ADAS</option>
          <option v-for="composant in composants" :key="composant.composant_adas" :value="composant.composant_adas">
            {{ composant.composant_adas }}
          </option>
        </select>
      </div>

      <!-- Affichage du bouton en fonction de l'existence du PDF -->
      <div class="d-flex justify-content-between mb-4">
        <button class="btn fw-bold text-FEFCFB shadow-sm" style="background-color: #1282a2; border-radius: 12px; padding: 12px 24px;" @click="viewPDF" v-if="pdfExist">
          Afficher la procédure
        </button>

        <button class="btn fw-bold text-FEFCFB shadow-sm" style="background-color: #034078; border-radius: 12px; padding: 12px 24px;" @click="triggerUploadPDF" v-else>
          Uploader un PDF
        </button>
      </div>

      <div class="d-flex justify-content-between">
        <button class="btn fw-bold text-FEFCFB shadow-sm" style="background-color: #001f54; border-radius: 12px; padding: 12px 24px;">
          Retour
        </button>
      </div>

      <!-- Input de fichier caché pour uploader le PDF -->
      <input type="file" id="file-input" class="d-none" @change="handleFileUpload" />

      <!-- Affichage du PDF si l'URL est présente -->
      <div v-if="pdfUrl" class="pdf-viewer-container mt-4">
        <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="600px" title="PDF Viewer"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      marques: [],
      modeles: [],
      composants: [],
      selectedMarque: '',
      selectedModele: '',
      selectedComposant: '',
      pdfExist: false,
      selectedFile: null, // Le fichier PDF sélectionné
      pdfUrl: '', // URL du PDF à afficher
    };
  },
  mounted() {
    this.fetchMarques();
  },
  methods: {
    async fetchMarques() {
      try {
        const response = await axios.get('http://localhost:3000/api/procedures/marques');
        this.marques = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des marques:', error);
      }
    },

    async fetchModeles() {
      if (!this.selectedMarque) return;
      try {
        const response = await axios.get(`http://localhost:3000/api/procedures/modeles/${this.selectedMarque}`);
        this.modeles = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des modèles:', error);
      }
    },

    async fetchComposants() {
      if (!this.selectedMarque || !this.selectedModele) return;
      try {
        const response = await axios.get(`http://localhost:3000/api/procedures/composants/${this.selectedMarque}/${this.selectedModele}`);
        this.composants = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des composants ADAS:', error);
      }
    },

    async checkPDF() {
      if (!this.selectedMarque || !this.selectedModele || !this.selectedComposant) return;

      try {
        console.log('Vérification du PDF...');
        const response = await axios.get(
          `http://localhost:3000/api/procedures/pdf-exist/${this.selectedMarque}/${this.selectedModele}/${this.selectedComposant}`
        );
        this.pdfExist = response.data.pdf_exist;
        console.log('PDF existe:', this.pdfExist);

        // Vérifier si le PDF existe et mettre à jour l'URL
        if (this.pdfExist) {
          this.pdfUrl = `http://localhost:3000/api/uploads/pdf/${this.selectedMarque}/${this.selectedModele}/${this.selectedComposant}`;
        } else {
          this.pdfUrl = ''; // Si le PDF n'existe pas, vider l'URL
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du PDF:', error);
      }
    },

    viewPDF() {
      if (this.pdfUrl) {
        window.open(this.pdfUrl, '_blank');
      }
    },

    triggerUploadPDF() {
      document.getElementById('file-input').click();
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.uploadPDF();
      }
    },

    async uploadPDF() {
      if (!this.selectedFile) {
        console.error('Aucun fichier sélectionné');
        return;
      }
      const formData = new FormData();
      formData.append('pdf', this.selectedFile);
      formData.append('marque', this.selectedMarque);
      formData.append('modele', this.selectedModele);
      formData.append('composant', this.selectedComposant);

      try {
        const response = await axios.post(
          'http://localhost:3000/api/procedures/upload-pdf',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        this.pdfExist = true;
        this.pdfUrl = `http://localhost:3000/api/uploads/pdf/${this.selectedMarque}/${this.selectedModele}/${this.selectedComposant}`;
        console.log('PDF téléchargé avec succès');
      } catch (error) {
        console.error('Erreur lors du téléchargement du PDF:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Ajoutez ici des styles personnalisés si nécessaire */
</style>

<template>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <div class="dashboard">
    <h1>Tableau de bord - Gestion des fichiers</h1>

    <!-- Formulaire pour sélectionner la marque, le modèle et le composant -->
    <form @submit.prevent="fetchFiles">
      <label for="marque">Marque :</label>
      <input
        type="text"
        id="marque"
        v-model="marque"
        placeholder="Ex: toyota"
        required
      />

      <label for="modele">Modèle :</label>
      <input
        type="text"
        id="modele"
        v-model="modele"
        placeholder="Ex: corolla"
        required
      />

      <label for="composant">Composant ADAS :</label>
      <input
        type="text"
        id="composant"
        v-model="composant"
        placeholder="Ex: adaptive_cruise_control"
        required
      />

      <button type="submit">Rechercher</button>
    </form>

    <!-- Affichage des fichiers récupérés -->
    <div v-if="files.length > 0">
      <h2>Fichiers disponibles pour {{ marque }} / {{ modele }} / {{ composant }}</h2>
      <ul>
        <li v-for="file in files" :key="file.file_name">
          <a :href="file.file_url" target="_blank">{{ file.file_name }}</a>
        </li>
      </ul>
    </div>

    <p v-else-if="files.length === 0 && searched">Aucun fichier trouvé.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      marque: "", // Marque saisie par l'utilisateur
      modele: "", // Modèle saisi par l'utilisateur
      composant: "", // Composant saisi par l'utilisateur
      files: [], // Liste des fichiers récupérés depuis le backend
      searched: false, // Indique si une recherche a été effectuée
    };
  },
  methods: {
    async fetchFiles() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/files/${this.marque}/${this.modele}/${this.composant}`
        );
        console.log("Réponse du serveur :", response.data);
        this.files = response.data.files;
        this.searched = true;
      } catch (error) {
        console.error("Erreur lors de la récupération des fichiers :", error.response?.data || error);
        this.files = [];
        this.searched = true;
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

form {
  margin-bottom: 20px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 10px;
}

ul li a {
  text-decoration: none;
  color: #007bff;
}

ul li a:hover {
  text-decoration: underline;
}
</style>

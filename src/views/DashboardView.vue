<template>
  <div
    class="dashboard-container bg-0A1128 text-FEFCFB min-vh-100 d-flex flex-column justify-content-center align-items-center"
  >
    <div
      class="card w-100 p-4 shadow-lg bg-001F54"
      style="max-width: 600px; border-radius: 16px"
    >
      <h1 class="text-center text-1282A2 mb-4">
        Sélection des Marques et Composants
      </h1>

      <!-- Sélection des Marques -->
      <div class="mb-4">
        <label for="brand" class="form-label fw-bold text-FEFCFB"
          >Marques :</label
        >
        <select
          v-model="selectedBrand"
          id="brand"
          class="form-select border-0 bg-034078 text-FEFCFB shadow-sm"
          style="height: 50px; border-radius: 12px"
          @change="fetchModels"
        >
          <option value="">Selectionnez une marque</option>
          <option v-for="brand in brands" :key="brand.name" :value="brand.name">
            {{ brand.name }}
          </option>
        </select>
      </div>

      <!-- Sélection des Modèles -->
      <div class="mb-4">
        <label for="model" class="form-label fw-bold text-FEFCFB"
          >Modeles :</label
        >
        <select
          v-model="selectedModel"
          id="model"
          class="form-select border-0 bg-034078 text-FEFCFB shadow-sm"
          style="height: 50px; border-radius: 12px"
          @change="fetchAdasComponents"
        >
          <option value="">Selectionnez un modèle</option>
          <option v-for="model in models" :key="model.name" :value="model.name">
            {{ model.name }}
          </option>
        </select>
      </div>

      <!-- Sélection des Composants ADAS -->
      <div class="mb-4">
        <label for="adas-component" class="form-label fw-bold text-FEFCFB"
          >Composants ADAS :</label
        >
        <select
          v-model="selectedAdasComponent"
          id="adas-component"
          class="form-select border-0 bg-034078 text-FEFCFB shadow-sm"
          style="height: 50px; border-radius: 12px"
        >
          <option value="">Selectionnez un composant ADAS</option>
          <option
            v-for="adasComponent in adasComponents"
            :key="adasComponent.name"
            :value="adasComponent.name"
          >
            {{ adasComponent.name }}
          </option>
        </select>
      </div>

      <!-- Boutons -->
      <div class="d-flex justify-content-between">
        <button
          class="btn fw-bold text-FEFCFB shadow-sm"
          style="
            background-color: #1282a2;
            border-radius: 12px;
            padding: 12px 24px;
          "
        >
          Afficher la procédure
        </button>
        <button
          class="btn fw-bold text-FEFCFB shadow-sm"
          style="
            background-color: #001f54;
            border-radius: 12px;
            padding: 12px 24px;
          "
        >
          Retour
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      brands: [],
      models: [],
      adasComponents: [],
      selectedBrand: "",
      selectedModel: "",
      selectedAdasComponent: "",
    };
  },
  mounted() {
    this.fetchBrands();
  },
  methods: {
    async fetchBrands() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/procedures/brands"
        );
        this.brands = response.data;
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    },
    async fetchModels() {
      if (!this.selectedBrand) return;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/procedures/models/${this.selectedBrand}`
        );
        this.models = response.data;
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    },
    async fetchAdasComponents() {
      if (!this.selectedBrand || !this.selectedModel) return;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/procedures/adas-components/${this.selectedBrand}/${this.selectedModel}`
        );
        this.adasComponents = response.data;
      } catch (error) {
        console.error("Error fetching ADAS components:", error);
      }
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  background-color: #0a1128;
  color: #fefcfb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  border-radius: 16px;
  background-color: #001f54;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 32px;
  color: #1282a2;
  margin-bottom: 1rem;
}

.form-label {
  font-weight: bold;
  color: #fefcfb;
}

.form-select {
  height: 50px;
  border-radius: 12px;
  background-color: #034078;
  color: #fefcfb;
  border: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px #1282a2;
}

button {
  padding: 12px 24px;
  font-weight: bold;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:first-child {
  background-color: #1282a2;
  color: #fefcfb;
}

button:last-child {
  background-color: #001f54;
  color: #fefcfb;
}

button:hover {
  opacity: 0.9;
}
</style>

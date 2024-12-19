<template>
  <div
    class="container d-flex flex-column justify-content-center align-items-center min-vh-100 bg-0A1128 text-FEFCFB"
  >
    <div class="col-md-6">
      <div class="card p-4 shadow-lg bg-034078">
        <h2 class="card-title text-center text-1282A2">Connexion</h2>

        <!-- Affichage des erreurs -->
        <div
          v-if="errorMessage"
          class="alert alert-danger"
          role="alert"
          aria-live="assertive"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="loginUser" novalidate>
          <!-- Champ Email -->
          <div class="mb-3">
            <label
              for="email"
              class="form-label"
              :class="{ 'text-danger': emailError }"
              >Email</label
            >
            <input
              type="email"
              v-model="email"
              class="form-control"
              id="email"
              placeholder="Entrez votre email"
              aria-describedby="emailHelp"
              required
              :aria-invalid="emailError ? 'true' : 'false'"
            />
            <div v-if="emailError" class="text-danger">
              Veuillez entrer un email valide.
            </div>
          </div>

          <!-- Champ Mot de Passe -->
          <div class="mb-3">
            <label
              for="password"
              class="form-label"
              :class="{ 'text-danger': passwordError }"
              >Mot de Passe</label
            >
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="password"
              placeholder="Entrez votre mot de passe"
              required
              :aria-invalid="passwordError ? 'true' : 'false'"
            />
            <div v-if="passwordError" class="text-danger">
              Le mot de passe est requis.
            </div>
          </div>

          <!-- Bouton de Connexion -->
          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="isLoading"
            aria-label="Se connecter"
          >
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm me-1"
            ></span>
            Connexion
          </button>

          <!-- Lien Mot de Passe Oublié -->
          <router-link
            to="/forgot-password"
            class="d-block mt-3 text-center"
            aria-label="Mot de passe oublié ?"
          >
            Mot de passe oublié ?
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { autoLogout } from "../utils/autoLogout";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      isLoading: false,
      emailError: false,
      passwordError: false,
    };
  },
  methods: {
    async loginUser() {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          {
            email: this.email,
            password: this.password,
          }
        );
        // Stocker le token JWT
        localStorage.setItem("token", response.data.token);
        // Redirection vers le dashboard
        console.log("Redirection vers:", response.data.redirect);
        this.$router.push(response.data.redirect);
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Une erreur est survenue.";
      } finally {
        this.isLoading = false;
      }
    },
    methods: {
      login() {
        // Exemple : Requête POST vers le backend pour s'authentifier
        this.$http
          .post("http://localhost:3000/api/auth/login", {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            console.log("Connexion réussie :", response.data);
            localStorage.setItem("token", response.data.token); // Sauvegarder un token si utilisé

            // Planifier la déconnexion dans 1 heure
            autoLogout(3600000); // 1 heure en millisecondes
          })
          .catch((error) => {
            console.error("Erreur de connexion :", error);
          });
      },
    },
  },
};
</script>

<style scoped>
/* Couleurs personnalisées */
.bg-0A1128 {
  background-color: #0a1128; /* Couleur de fond */
}
.bg-034078 {
  background-color: #034078; /* Couleur de la carte */
}
.text-1282A2 {
  color: #1282a2; /* Texte accentué */
}
.text-FEFCFB {
  color: #fefcfb; /* Texte principal */
}

/* Style de la carte */
.card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

/* Responsivité : Largeur et ajustement */
@media (max-width: 768px) {
  .col-md-6 {
    width: 100%; /* Largeur totale pour petits écrans */
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 20px; /* Un peu d'espace pour petits écrans */
  }
}
</style>

<!-- <template>
  <div class="container d-flex flex-column justify-content-center align-items-center min-vh-100 bg-0A1128 text-FEFCFB">
    <div class="col-md-6">
      <div class="card p-4 shadow-lg bg-034078">
        <h2 class="card-title text-center text-1282A2">Connexion</h2>
        <form @submit.prevent="loginUser">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" v-model="email" class="form-control" id="email" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mot de Passe</label>
            <input type="password" v-model="password" class="form-control" id="password" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">Connexion</button>
          <router-link to="/forgot-password" class="d-block mt-3 text-1282A2">Mot de passe oublié?</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password
        });
        console.log('Token:', response.data.token);
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Erreur lors de la connexion:', error.response.data.msg);
      }
    }
  }
};
</script>

<style scoped>
.bg-0A1128 {
  background-color: #0A1128;  /* Couleur spécifiée */
}
.bg-034078 {
  background-color: #034078;  /* Couleur spécifiée */
}
.text-1282A2 {
  color: #1282A2;  /* Couleur spécifiée */
}
.text-FEFCFB {
  color: #FEFCFB;  /* Couleur spécifiée */
}
</style> -->


<template>
  <div class="container d-flex flex-column justify-content-center align-items-center min-vh-100 bg-0A1128 text-FEFCFB">
    <div class="col-md-6">
      <div class="card p-4 shadow-lg bg-034078">
        <h2 class="card-title text-center text-1282A2">Connexion</h2>
        
        <!-- Affichage des erreurs -->
        <div v-if="errorMessage" class="alert alert-danger" role="alert" aria-live="assertive">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="loginUser" novalidate>
          <!-- Champ Email -->
          <div class="mb-3">
            <label for="email" class="form-label" :class="{'text-danger': emailError}">Email</label>
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
            <div v-if="emailError" class="text-danger">Veuillez entrer un email valide.</div>
          </div>

          <!-- Champ Mot de Passe -->
          <div class="mb-3">
            <label for="password" class="form-label" :class="{'text-danger': passwordError}">Mot de Passe</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="password"
              placeholder="Entrez votre mot de passe"
              required
              :aria-invalid="passwordError ? 'true' : 'false'"
            />
            <div v-if="passwordError" class="text-danger">Le mot de passe est requis.</div>
          </div>

          <!-- Bouton de Connexion -->
          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="isLoading"
            aria-label="Se connecter"
          >
            <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
            Connexion
          </button>

          <!-- Lien Mot de Passe Oublié -->
          <router-link
            to="/forgot-password"
            class="d-block mt-3"
            aria-label="Mot de passe oublié ?"
            :style="{ color: '#FFFFFF', fontWeight: 'bold' }"
          >
            Mot de passe oublié ?
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      isLoading: false,
      emailError: false,
      passwordError: false,
    };
  },
  methods: {
    async loginUser() {
      this.isLoading = true;
      this.errorMessage = '';
      this.emailError = false;
      this.passwordError = false;

      if (!this.email || !this.password) {
        if (!this.email) this.emailError = true;
        if (!this.password) this.passwordError = true;
        this.isLoading = false;
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        this.errorMessage = error.response?.data?.msg || 'Une erreur est survenue.';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Couleurs personnalisées */
.bg-0A1128 {
  background-color: #0A1128; /* Couleur de fond */
}
.bg-034078 {
  background-color: #034078; /* Couleur de la carte */
}
.text-1282A2 {
  color: #1282A2; /* Texte accentué */
}
.text-FEFCFB {
  color: #FEFCFB; /* Texte principal */
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

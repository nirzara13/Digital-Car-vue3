<template>
  <div class="container d-flex flex-column justify-content-center align-items-center min-vh-100 bg-0A1128 text-FEFCFB">
    <div class="col-md-6">
      <div class="card p-4 shadow-lg bg-034078">
        <h2 class="card-title text-center text-1282A2">Inscription</h2>
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              v-model="username"
              class="form-control"
              id="username"
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Adresse Email</label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              id="email"
              placeholder="Entrez votre adresse email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mot de Passe</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="password"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
            S'inscrire
          </button>
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
      username: '',
      email: '',
      password: '',
      errorMessage: '',
      isLoading: false
    };
  },
  methods: {
    async register() {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        console.log(response.data);
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Une erreur est survenue.';
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Vos styles existants */
</style>
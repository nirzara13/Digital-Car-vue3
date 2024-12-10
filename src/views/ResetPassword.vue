<template>
    <div class="container d-flex flex-column justify-content-center align-items-center min-vh-100 bg-0A1128 text-FEFCFB">
      <div class="col-md-6">
        <div class="card p-4 shadow-lg bg-034078">
          <h2 class="card-title text-center text-1282A2">Réinitialiser le mot de passe</h2>
          <form @submit.prevent="resetPassword">
            <div class="mb-3">
              <label for="password" class="form-label">Nouveau mot de passe</label>
              <input
                type="password"
                v-model="newPassword"
                class="form-control"
                id="password"
                required
              />
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
              <input
                type="password"
                v-model="confirmPassword"
                class="form-control"
                id="confirmPassword"
                required
              />
              <div v-if="passwordMismatch" class="text-danger">Les mots de passe ne correspondent pas.</div>
            </div>
            <button
              type="submit"
              class="btn btn-primary w-100"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
              Réinitialiser
            </button>
          </form>
          <p v-if="message" class="mt-3 text-success">{{ message }}</p>
          <p v-if="errorMessage" class="mt-3 text-danger">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newPassword: '',
        confirmPassword: '',
        isLoading: false,
        message: '',
        errorMessage: '',
        passwordMismatch: false,
      };
    },
    methods: {
      async resetPassword() {
        this.isLoading = true;
        this.message = '';
        this.errorMessage = '';
        this.passwordMismatch = false;
  
        if (this.newPassword !== this.confirmPassword) {
          this.passwordMismatch = true;
          this.isLoading = false;
          return;
        }
  
        const token = this.$route.query.token; // Récupère le token dans l'URL
  
        try {
          const response = await axios.post('http://localhost:3000/api/auth/reset-password', {
            token,
            newPassword: this.newPassword,
          });
          this.message = response.data.msg;
        } catch (error) {
          this.errorMessage = error.response?.data?.msg || 'Une erreur est survenue.';
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
  </script>
  
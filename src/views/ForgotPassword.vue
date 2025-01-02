<template>
  <div
    class="container d-flex flex-column justify-content-center align-items-center min-vh-100 bg-0A1128 text-FEFCFB"
  >
    <div class="col-md-6">
      <div class="card p-4 shadow-lg bg-034078">
        <h2 class="card-title text-center text-1282A2">
          Réinitialisation du mot de passe
        </h2>
        <form @submit.prevent="sendResetLink">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              id="email"
              placeholder="Entrez votre email"
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="isLoading"
          >
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
            ></span>
            Envoyer le lien
          </button>
        </form>
        <p v-if="message" class="mt-3 text-success">{{ message }}</p>
        <p v-if="errorMessage" class="mt-3 text-danger">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      isLoading: false,
      message: "",
      errorMessage: "",
    };
  },
  methods: {
    async sendResetLink() {
      this.isLoading = true;
      this.message = "";
      this.errorMessage = "";

      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/forgot-password",
          {
            email: this.email,
          }
        );
        this.message = response.data.msg;
      } catch (error) {
        this.errorMessage =
          error.response?.data?.msg || "Une erreur est survenue.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

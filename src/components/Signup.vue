<template>
    <div>
      <h1>Inscription</h1>
      <form @submit.prevent="handleRegister">
        <input v-model="username" type="text" placeholder="Nom d'utilisateur" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">S'inscrire</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { register } from '../services/authService';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async handleRegister() {
        try {
          const userData = {
            username: this.username,
            email: this.email,
            password: this.password,
          };
          const response = await register(userData);
          alert(response.message); // Affiche un message de succès
          this.$router.push('/login'); // Redirige vers la page de connexion
        } catch (error) {
          this.errorMessage = error;
        }
      },
    },
  };
  </script>
  
  <style>
  .error {
    color: red;
  }
  </style>
  
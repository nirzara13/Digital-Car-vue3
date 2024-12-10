<template>
  <div class="container mt-5">
    <h1>Tableau de Bord</h1>
    <p v-if="loading">Chargement...</p>
    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
    <p v-if="userId">Bienvenue, utilisateur {{ userId }}</p>
    <button @click="logout" class="btn btn-danger mt-3">Déconnexion</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const userId = ref(null);
const loading = ref(true);  // Pour afficher un message de chargement
const errorMessage = ref(null);  // Pour gérer les erreurs
const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/dashboard', {
      headers: { 'x-access-token': token },
    });

    if (!response.ok) {
      throw new Error('Accès non autorisé ou session expirée');
    }

    const data = await response.json();
    userId.value = data.userId;  // Remplir la donnée de l'utilisateur
  } catch (error) {
    errorMessage.value = error.message || 'Une erreur est survenue.';
    router.push('/login');  // Rediriger vers la page de connexion en cas d'erreur
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>

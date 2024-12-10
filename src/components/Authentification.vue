<template>
    <div class="min-h-screen bg-[#0B132B] flex justify-center items-center">
      <AuthForm />
    </div>
  </template>
  
  <script>
  import AuthForm from '@/components/AuthForm.vue';
  
  export default {
    components: {
      AuthForm,
    },
  };
  </script>
  
  <style scoped>
  /* Tu peux ajouter des styles spécifiques à ce composant ici */
  </style>
  
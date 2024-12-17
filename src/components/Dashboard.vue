<!-- <template>
    <div>
      <header>
        <h1>Dashboard</h1>
      </header>
  
      <div v-if="data">
        <h2>{{ data.welcomeMessage }}</h2>
  
        <div>
          <h3>Statistiques</h3>
          <p>Utilisateurs totaux : {{ data.stats.users }}</p>
          <p>Utilisateurs actifs : {{ data.stats.activeUsers }}</p>
          <p>Nouvelles commandes : {{ data.stats.newOrders }}</p>
        </div>
      </div>
  
      <div v-else>
        <p>Chargement des données...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        data: null,  // Stocke les données récupérées du backend
      };
    },
    mounted() {
      this.checkSession();  // Vérifie la session avant de récupérer les données
    },
    methods: {
      // Vérification de la session utilisateur
      async checkSession() {
        try {
          const response = await fetch('http://localhost:3000/api/dashboard', {
            method: 'GET',
            credentials: 'include',  // Important pour envoyer les cookies de session
          });
  
          if (response.ok) {
            const data = await response.json();
            this.data = data;
          } else {
            // Si l'utilisateur n'est pas connecté, rediriger vers la page de login
            this.$router.push('/login');
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données', error);
          this.$router.push('/login');  // En cas d'erreur, rediriger vers login
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajoute des styles simples ici pour ton dashboard */
  header {
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
  }
  
  h3 {
    color: #4CAF50;
  }
  
  div {
    padding: 1rem;
  }
  </style>
   -->
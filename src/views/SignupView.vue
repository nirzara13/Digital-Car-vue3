




<!-- <template>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>

  <br>
  <div class="container py-5">
    <h2 class="text-center mb-4" style="color: #1282A2;">Inscription</h2>
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="form-group mb-4">
        <label for="username" class="form-label">Nom d'utilisateur</label>
        <input type="text" class="form-control" id="username" v-model="form.username" required placeholder="Entrez votre nom d'utilisateur">
      </div>
      <div class="form-group mb-4">
        <label for="email" class="form-label">Adresse email</label>
        <input type="email" class="form-control" id="email" v-model="form.email" required placeholder="Entrez votre email">
      </div>
      <div class="form-group mb-4">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="password" v-model="form.password" required placeholder="Créez votre mot de passe">
      </div>
      <button type="submit" class="btn btn-primary btn-block">S'inscrire</button>
    </form>
  </div>
  <br>
  <br>
  <br>
  <br>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
      },
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Envoi des données au backend
        const response = await axios.post('http://localhost:3000/api/register', {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password
        });

        // Réponse réussie
        this.successMessage = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
        console.log(response.data);
        this.$router.push('/login');  // Redirection vers la page de connexion après l'inscription
      } catch (error) {
        // Erreur
        this.errorMessage = error.response.data.message || 'Une erreur est survenue, veuillez réessayer.';
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #0A1128;
  border-radius: 10px;
}

h2 {
  font-family: 'Arial', sans-serif;
  color: #1282A2;
}

.form-container {
  background-color: #034078;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 1rem;
  color: #FEFCFB;
  font-weight: bold;
}

.form-control {
  background-color: #FEFCFB;
  border: 1px solid #1282A2;
  color: #0A1128;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #1282A2;
  outline: none;
  box-shadow: 0 0 5px rgba(18, 130, 162, 0.6);
}

.btn {
  background-color: #1282A2;
  border: none;
  color: #FEFCFB;
  font-size: 1.1rem;
  padding: 0.75rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0A1128;
}

.error {
  color: red;
  margin-top: 1rem;
  font-size: 1rem;
}

.success {
  color: green;
  margin-top: 1rem;
  font-size: 1rem;
}

@media (max-width: 576px) {
  .container {
    padding: 1rem;
  }
}
</style> -->




<!-- <template>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <div class="container py-5">
    <h2 class="text-center mb-4">Inscription</h2>
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="form-group">
        <label for="username" class="form-label">Nom d'utilisateur</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="form.username"
          required
          placeholder="Entrez votre nom d'utilisateur"
        />
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Adresse email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="form.email"
          required
          placeholder="Entrez votre email"
        />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="form.password"
          required
          placeholder="Créez votre mot de passe"
        />
      </div>
      <button type="submit" class="btn btn-primary btn-block">S'inscrire</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>


  <br>
  <br>
  <br>
  <br>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
      },
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    validatePassword(password) {
      const regex = /^(?=.*[a-z]{2,})(?=.*[A-Z]{2,})(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
      return regex.test(password);
    },
    async handleSubmit() {
      if (!this.validatePassword(this.form.password)) {
        this.errorMessage = `Le mot de passe doit contenir :
        - Au moins 8 caractères,
        - 2 majuscules, 2 minuscules,
        - 1 chiffre et 1 caractère spécial.`;
        return;
      }
      try {
        // Envoi des données au backend
        const response = await axios.post('http://localhost:3000/api/register', {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password, // Le backend gérera le hachage
        });

        // Réponse réussie
        this.successMessage = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
        console.log(response.data);
        this.$router.push('/login'); // Redirection vers la page de connexion
      } catch (error) {
        this.errorMessage = error.response.data.message || 'Une erreur est survenue, veuillez réessayer.';
      }
    },
  },
};
</script>




<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #0a1128;
  border-radius: 10px;
}

h2 {
  font-family: 'Arial', sans-serif;
  color: #1282a2;
}

.form-container {
  background-color: #034078;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 1rem;
  color: #fefcfb;
  font-weight: bold;
}

.form-control {
  background-color: #fefcfb;
  border: 1px solid #1282a2;
  color: #0a1128;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #1282a2;
  outline: none;
  box-shadow: 0 0 5px rgba(18, 130, 162, 0.6);
}

.btn {
  background-color: #1282a2;
  border: none;
  color: #fefcfb;
  font-size: 1.1rem;
  padding: 0.75rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0a1128;
}

.error {
  color: red;
  margin-top: 1rem;
  font-size: 1rem;
}

.success {
  color: green;
  margin-top: 1rem;
  font-size: 1rem;
}

@media (max-width: 576px) {
  .container {
    padding: 1rem;
  }
}
</style> -->


<template>
  <div class="container d-flex flex-column justify-content-center align-items-center min-vh-100 bg-0A1128 text-FEFCFB">
    <div class="col-md-6">
      <div class="card p-4 shadow-lg bg-034078">
        <h2 class="card-title text-center text-1282A2">S'inscrire</h2>
        <form @submit.prevent="signupUser">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" v-model="email" class="form-control" id="email" required>
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">Nom d'utilisateur</label>
            <input type="text" v-model="username" class="form-control" id="username" required>
          </div>
          <div class="mb-3 position-relative">
            <label for="password" class="form-label">Mot de passe</label>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              v-model="password" 
              class="form-control" 
              id="password" 
              required
              minlength="10"
              placeholder="Mot de passe"
            >
            <!-- Icône œil -->
            <span 
              class="position-absolute top-50 end-0 me-3" 
              @click="togglePasswordVisibility" 
              style="cursor: pointer;">
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </span>
          </div>
          <button type="submit" class="btn btn-primary w-100">S'inscrire</button>
         <!-- Lien vers la page de connexion -->
<p class="text-center mt-3">
  <span>Déjà un compte ? </span>
  <router-link to="/login" class="text-white fw-bold">Se connecter</router-link>
</p>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      showPassword: false, // État pour afficher/masquer le mot de passe
    };
  },
  methods: {
    async signupUser() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
          email: this.email,
          username: this.username,
          password: this.password
        });
        console.log('Utilisateur inscrit', response.data);
        this.$router.push('/login');
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error.response.data);
        // Afficher l'erreur à l'utilisateur
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>

<style scoped>
.bg-0A1128 {
  background-color: #0A1128;
}
.bg-034078 {
  background-color: #034078;
}
.text-1282A2 {
  color: #1282A2;
}
.text-FEFCFB {
  color: #FEFCFB;
}
.position-relative {
  position: relative;
}
</style>



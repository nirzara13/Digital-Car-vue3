<template>
  <header class="navbar-custom py-4 shadow-sm fixed-top">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <img src="@/assets/car_logo.png" alt="Digital CarLogo" class="logo me-3" />
        <h1 class="h3 mb-0 text-FEFCFB">Digital Car</h1>
      </div>
      <nav class="d-flex align-items-center">
        <ul class="nav me-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-FEFCFB">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link text-FEFCFB">Contact</router-link>
          </li>
        </ul>
        <div>
          <router-link to="/login" class="btn btn-outline-light me-2">Connexion</router-link>
          <router-link to="/signup" class="btn btn-light">Inscription</router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>

<style scoped>
.logo {
  width: 40px;
  height: auto;
}
.navbar-custom {
  background-color: #000;  /* Couleur noire pour la navbar */
  padding-top: 1rem;  /* Agrandir vers le bas */
  padding-bottom: 1rem;  /* Agrandir vers le bas */
}
.nav-link {
  color: #FEFCFB;  /* Couleur spécifiée */
}
</style>

<template>
  <footer class="footer bg-001F54 text-FEFCFB py-5">
    <div class="container">
      <div class="row">
        <!-- Colonne Logo -->
        <div class="col-md-4 d-flex align-items-center">
          <img :src="logo" alt="Logo Digital Car" class="logo-img">
        </div>

        <!-- Colonne Product -->
        <div class="col-md-4">
          <h5 class="text-uppercase fw-bold">Product</h5>
          <ul class="list-unstyled mt-3">
            <li>
              <router-link to="/pricing" class="text-FEFCFB text-decoration-none">Pricing</router-link>
            </li>
            <li>
              <router-link to="/changelog" class="text-FEFCFB text-decoration-none">Changelog</router-link>
            </li>
            <li>
              <router-link to="/terms" class="text-FEFCFB text-decoration-none">Terms</router-link>
            </li>
          </ul>
        </div>

        <!-- Colonne À propos de nous -->
        <div class="col-md-4">
          <h5 class="text-uppercase fw-bold">À propos de nous</h5>
          <ul class="list-unstyled mt-3">
            <li>
              <router-link to="/about" class="text-FEFCFB text-decoration-none">Qui sommes-nous ?</router-link>
            </li>
            <li>
              <router-link to="/news" class="text-FEFCFB text-decoration-none">Contact</router-link>
            </li>
            <li>
              <router-link to="/careers" class="text-FEFCFB text-decoration-none">Nous rejoindre</router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Ligne de séparation -->
      <hr class="bg-light my-4">

      <!-- Texte central -->
      <div class="text-center">
        <p class="mb-0">&copy; 2024 Digital Car. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import logoPath from "@/assets/car_logo.png"; // Importation du logo

export default {
  name: "TheFooter",
  data() {
    return {
      logo: logoPath, // Chemin du logo
    };
  },
};
</script>

<style scoped>
.footer {
  background-color: #001F54; /* Couleur de fond */
  color: #FEFCFB; /* Couleur du texte */
}

.text-FEFCFB {
  color: #FEFCFB; /* Texte en contraste */
}

.text-decoration-none {
  text-decoration: none !important;
}

.text-decoration-none:hover {
  text-decoration: underline; /* Ajout de soulignement au survol */
}

.logo-img {
  max-width: 150px; /* Taille moyenne du logo */
  height: auto;
}
</style>

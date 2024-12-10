<template>
  <footer class="footer bg-001F54 text-FEFCFB py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h5>Product</h5>
          <ul class="list-unstyled">
            <li><router-link to="/features" class="text-FEFCFB">Features</router-link></li>
            <li><router-link to="/faq" class="text-FEFCFB">FAQ</router-link></li>
            <li><router-link to="/pricing" class="text-FEFCFB">Pricing</router-link></li>
            <li><router-link to="/changelog" class="text-FEFCFB">Changelog</router-link></li>
            <li><router-link to="/terms" class="text-FEFCFB">Terms</router-link></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>About us</h5>
          <ul class="list-unstyled">
            <li><router-link to="/about" class="text-FEFCFB">About us</router-link></li>
            <li><router-link to="/news" class="text-FEFCFB">News</router-link></li>
            <li><router-link to="/careers" class="text-FEFCFB">Careers</router-link></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Get in touch</h5>
          <ul class="list-unstyled">
            <li><router-link to="/contact" class="text-FEFCFB">Contact</router-link></li>
            <li><router-link to="/support" class="text-FEFCFB">Support</router-link></li>
            <li><router-link to="/join" class="text-FEFCFB">Join us</router-link></li>
          </ul>
        </div>
      </div>
      <hr class="bg-light">
      <div class="text-center">
        <p class="mb-0">&copy; 2024 Digital Car. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
};
</script>

<style scoped>
.footer {
  background-color: #001F54;  /* Couleur spécifiée */
  color: #FEFCFB;  /* Couleur spécifiée */
}
.text-FEFCFB {
  color: #FEFCFB;  /* Couleur spécifiée */
}
</style>

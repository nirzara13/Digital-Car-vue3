<template>
  <div id="app">
    <TheHeader />
    <router-view />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import { autoLogout } from "./utils/autoLogout";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
  },
  created() {
    // Exemple : Vérifiez si une session existe
    const sessionExpiry = 3600000; // Durée de 1 heure
    if (localStorage.getItem("token")) {
      autoLogout(sessionExpiry);
    }
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
}
</style>

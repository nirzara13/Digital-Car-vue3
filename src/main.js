// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
// import './assets/index.css'

// createApp(App).mount('#app')

// main.js

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css"; // Importer Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importer Bootstrap JS
import "./assets/index.css"; // Importer ton fichier CSS global

// createApp(App).use(router).mount('#app');

const app = createApp(App);

app.use(router); // Lie le système de routage à l'application.
app.mount("#app"); // Monte l'application sur le DOM.

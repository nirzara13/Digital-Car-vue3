<template>
  <div class="bg-0A1128 text-FEFCFB flex flex-col min-vh-100">
    <TheHeader />
    <main class="flex-grow-1 pt-5 mt-5">
      <div class="container py-5 text-center">
        <section class="mb-5">
          <h2 class="display-4 font-weight-bold text-1282A2 mb-4">Bienvenue</h2>
          <p class="lead mb-4">Site pour les techniciens</p>
          <!-- Enlever les boutons de connexion et d'inscription -->
        </section>
        <!-- Ajouter un carousel ici -->
        <section class="carousel-container mb-5">
          <div
            id="surveyCarousel"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="https://via.placeholder.com/800x400?text=Survey+1"
                  class="d-block w-100"
                  alt="Survey 1"
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Image 1</h5>
                  <p></p>
                </div>
              </div>

              <div class="carousel-item">
                <img
                  src="https://via.placeholder.com/800x400?text=Survey+2"
                  class="d-block w-100"
                  alt="Survey 2"
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Image 2</h5>
                  <p>Description</p>
                </div>
              </div>

              <div class="carousel-item">
                <img
                  src="https://via.placeholder.com/800x400?text=Survey+3"
                  class="d-block w-100"
                  alt="Survey 3"
                />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Image 3</h5>
                  <p>Description</p>
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#surveyCarousel"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#surveyCarousel"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </section>
        <section class="row">
          <div class="col-md-4">
            <div class="card shadow-sm mb-4 bg-034078 text-FEFCFB">
              <div class="card-body">
                <h3 class="card-title h4 text-1282A2">Easy to Use</h3>
                <p class="card-text">
                  Our platform is designed to be user-friendly and intuitive.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card shadow-sm mb-4 bg-034078 text-FEFCFB">
              <div class="card-body">
                <h3 class="card-title h4 text-1282A2">Real-Time Results</h3>
                <p class="card-text">
                  Get instant feedback and analyze survey results in real-time.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card shadow-sm mb-4 bg-034078 text-FEFCFB">
              <div class="card-body">
                <h3 class="card-title h4 text-1282A2">Customizable Surveys</h3>
                <p class="card-text">
                  Create surveys that suit your specific needs and preferences.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";

export default {
  name: "HomeView",
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style scoped>
.bg-0A1128 {
  background-color: #0a1128; /* Couleur spécifiée */
}
.text-FEFCFB {
  color: #fefcfb; /* Couleur spécifiée */
}
.text-1282A2 {
  color: #1282a2; /* Couleur spécifiée */
}
.bg-034078 {
  background-color: #034078; /* Couleur spécifiée */
}
.carousel-container {
  padding: 2rem 0;
}
</style>

<!-- <template>
    <nav class="bg-transparent fixed w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out" :class="{'bg-[#0A1128]': isScrolled}">
      <div class="max-w-screen-xl mx-auto flex justify-between items-center py-4 px-6 text-white">
        <div class="font-bold text-xl">Logo</div>
        <div class="space-x-6 hidden md:flex">
          <a href="#" class="hover:text-[#1282A2] transition-colors">Accueil</a>
          <a href="#" class="hover:text-[#1282A2] transition-colors">Fonctionnalités</a>
          <a href="#" class="hover:text-[#1282A2] transition-colors">Tarification</a>
          <a href="#" class="hover:text-[#1282A2] transition-colors">Contact</a>
        </div>
        <div class="flex space-x-4">
          <button class="bg-[#1282A2] text-white px-6 py-2 rounded-lg hover:bg-[#034078] transition-all">Se connecter</button>
          <button class="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-[#034078] transition-all">S'inscrire</button>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const isScrolled = ref(false)
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      isScrolled.value = true
    } else {
      isScrolled.value = false
    }
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })
  </script>
  
  <style scoped>
  /* Pour améliorer l'effet de transition au scroll */
  </style>
   -->


   <template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">MyApp</router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/signup">Signup</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  }
  </script>
  
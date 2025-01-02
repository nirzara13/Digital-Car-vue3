import { createRouter, createWebHistory } from 'vue-router';
import SignupView from '@/views/SignupView.vue';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import HomeView from '@/views/HomeView.vue';
import ContactView from '@/views/Contact.vue'; // Importation de la page Contact

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/signup',
    component: SignupView,
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/contact',
    component: ContactView, // Ajout de la route pour la page Contact
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Garde de navigation
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Vérifie l'authentification
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('Redirecting to login because not authenticated');
    next('/login'); // Redirection vers la page de connexion
  } else {
    next(); // Laisse passer
  }
});

export default router;

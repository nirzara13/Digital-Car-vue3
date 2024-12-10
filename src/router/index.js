import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import DashboardView from '../views/DashboardView.vue';
import ForgotPasswordView from '../views/ForgotPassword.vue';  // Nouvelle vue pour le mot de passe oublié
import ResetPasswordView from '../views/ResetPassword.vue';    // Nouvelle vue pour réinitialiser le mot de passe

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',   // Route pour le mot de passe oublié
    component: ForgotPasswordView
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',     // Route pour réinitialiser le mot de passe
    component: ResetPasswordView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

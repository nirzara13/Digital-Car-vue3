import { createRouter, createWebHistory } from 'vue-router';
import SignupView from '@/views/SignupView.vue';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import HomeView from '@/views/HomeView.vue';
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
];
const router = createRouter({
history: createWebHistory(),
routes,
});
// Garde de navigation
router.beforeEach((to, from, next) => {
const isAuthenticated = localStorage.getItem('token');
if (to.meta.requiresAuth && !isAuthenticated) {
console.log('Redirecting to login because not authenticated');
next('/login');
} else {
next();
}
});
export default router;
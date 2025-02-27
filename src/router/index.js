import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '../views/SignUp.vue';
import SignIn from '../views/SignIn.vue';
import Dashboard from '../views/Dashboard.vue';
import { useAuthStore } from '../store/auth'
const routes = [
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: { requiresGuest: true } 
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard, 
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Wait until `isLoading` is `false`
  if (authStore.isLoading) {
    await authStore.fetchUserSession() // Ensure the session is loaded
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log("Redirecting to SignIn")
    return next('/signin')
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    console.log("Redirecting to Dashboard")
    return next('/')
  }

  next() // Proceed to the route
})


export default router;

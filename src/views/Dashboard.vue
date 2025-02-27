<script setup>
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const logout = async () => {
  await authStore.logout()
  router.push('/signin')
}

</script>

<template v-if="authStore.isAuthenticated">
  <div>
    <h2>Dashboard</h2>
    <p>Welcome </p>
    <button @click="logout">Logout</button>
  </div>
</template>
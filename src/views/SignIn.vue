<script setup >
import {ref, watchEffect } from 'vue'
import { supabase } from '../utils/supabase'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'  

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

watchEffect(() => {
  console.log('authStore.isAuthenticated:', authStore.isAuthenticated)
  
  // redirect if session is fully loaded
  if (!authStore.isLoading && authStore.isAuthenticated) {
    router.push('/')
  }
})


const login = async () => {
  console.log(' email.value',  email.value)
  try {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) throw error
    successMessage.value = 'Logged in!'
     //store user
     console.log('data.user', data.user)
     authStore.user = data.user
     console.log('authStore.user', authStore)
     router.push('/')

  } catch (error) {
    errorMessage.value = error.message
  }  
}

</script>

<template>
  <div v-if="!authStore.isLoading">
    <h2>Login</h2>

    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />

    <button @click="login">Login</button>

    <p v-if="successMessage">{{ successMessage }}</p>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

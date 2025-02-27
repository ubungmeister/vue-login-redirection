<script setup >
import { ref } from 'vue'
import { supabase } from '../utils/supabase'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const register = async () => {
    try {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })
    if (error) throw error
    successMessage.value = 'Account created! Check your email to verify.'
  } catch (error) {
    errorMessage.value = error.message
  }
}

</script>

<template>
  <div>
    <h2>Register</h2>

    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />

    <button @click="register">Register</button>

    <p v-if="successMessage">{{ successMessage }}</p>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../utils/supabase'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const isLoading = ref(true)

    console.log("user", user.value)
  
    //Check session when the app starts
    const fetchUserSession = async () => {
        const { data } = await supabase.auth.getUser()
        console.log("cheks")
        user.value = data.user
        isLoading.value = false
      }

    fetchUserSession()

    //logout 

    const logout = async () => {
        await supabase.auth.signOut()
        user.value = null
    }
      
    const isAuthenticated = computed(() => !!user.value)
      
    return { user, isAuthenticated, isLoading, fetchUserSession, logout }
  })
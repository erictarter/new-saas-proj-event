import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthStore } from '../stores/auth'
import { watchEffect } from 'vue'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const protectedRoutes = ['/tasks', '/rsvp', '/polls', '/profile', '/plans']

  // Ensure the authentication state is restored before making any redirection decisions
  await authStore.restoreAuthState()

  // Watch for changes in the loading state
  return new Promise((resolve) => {
    const stopWatching = watchEffect((onInvalidate) => {
      if (!authStore.isLoading) {
        if (!authStore.isAuthenticated && protectedRoutes.includes(to.path)) {
          resolve(navigateTo('/signin'))
        } else {
          resolve(true)
        }
        onInvalidate(() => {
          // Cleanup logic if needed
        })
      }
    })
  })
})
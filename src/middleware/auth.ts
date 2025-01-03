import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthStore } from '../stores/auth'
import { watchEffect } from 'vue'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const protectedRoutes = ['/tasks', '/rsvp', '/polls', '/profile', '/plans']
  const verificationRoute = '/verification'
  const nonAuthRoutes = ['/signin', '/signup', '/']


  // if (to.path === from.path) {
  //   return
  // }

  return new Promise((resolve) => {
    const stopWatching = watchEffect((onInvalidate) => {
      if (!authStore.isLoading) {
        const user = authStore.getCurrentUser
        if (!authStore.isAuthenticated && protectedRoutes.includes(to.path)) {
          resolve(navigateTo('/signin'))
        } else if (user && !user.emailVerified && protectedRoutes.includes(to.path)) {
          resolve(navigateTo(verificationRoute))
        } else if (user && user.emailVerified && to.path === verificationRoute) {
          resolve(navigateTo('/'))
        } else if (user && !user.emailVerified && nonAuthRoutes.includes(to.path)) {
          resolve(true)
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
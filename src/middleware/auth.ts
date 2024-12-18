import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthStore } from '../stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const protectedRoutes = ['/tasks', '/rsvp', '/polls', '/profile', '/plans']

  if (!authStore.user && protectedRoutes.includes(to.path)) {
    return navigateTo('/signin')
  }
})
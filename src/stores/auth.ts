import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { name: string },
  }),
  actions: {
    setUser(user: { name: string }) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
})
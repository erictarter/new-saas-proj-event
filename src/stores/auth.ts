import { defineStore } from 'pinia'
import { auth, signInWithEmailAndPassword, signOut } from '~/plugins/firebase'
import type { User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { uid: string; email: string },
    loading: false,
  }),
  actions: {
    setUser(user: User | null) {
      this.user = user ? { uid: user.uid, email: user.email } : null
    },
    setLoading(loading: boolean) {
      this.loading = loading
    },
    async signIn(email: string, password: string) {
      this.setLoading(true)
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.setUser(userCredential.user)
      } catch (error) {
        console.error('Error signing in:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },
    async signOut() {
      this.setLoading(true)
      try {
        await signOut(auth)
        this.setUser(null)
      } catch (error) {
        console.error('Error signing out:', error)
        throw error
      } finally {
        this.setLoading(false)
      }
    },
    async nuxtServerInit() {
      return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(
          (user) => {
            this.setUser(user)
            this.setLoading(false)
            unsubscribe()
            resolve(user)
          },
          (error) => {
            console.error('Auth state change error:', error)
            this.setLoading(false)
            unsubscribe()
            reject(error)
          }
        )
      })
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getCurrentUser: (state) => state.user,
    isLoading: (state) => state.loading,
  },
})
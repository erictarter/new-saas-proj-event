import { defineStore } from 'pinia'
import { auth, signInWithEmailAndPassword, signOut } from '~/plugins/firebase'
import type { User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { uid: string; email: string; accessToken: string; emailVerified: boolean, subscriptionLevel: string },
    loading: false,
  }),
  actions: {
    async setUser(user: User | null, subscriptionLevel: string = 'free') {
      if (user) {
        const accessToken = await user.getIdToken()
        this.user = { 
          uid: user.uid, 
          email: user.email, 
          accessToken, 
          emailVerified: user.emailVerified,
          subscriptionLevel
        }
      } else {
        this.user = null
      }
    },
    setLoading(loading: boolean) {
      this.loading = loading
    },
    async signIn(email: string, password: string) {
      this.setLoading(true)
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        await this.setUser(userCredential.user)
        console.log('User signed in:', userCredential.user)
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
    async restoreAuthState() {
      this.setLoading(true)
      return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(
          async (user) => {
            if (user) {
              await this.setUser(user)
            } else {
              this.setUser(null)
            }
            this.setLoading(false)
            unsubscribe()
            resolve(user)
          },
          (error) => {
            console.error('Error restoring auth state:', error)
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
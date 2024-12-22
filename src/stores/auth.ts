import { defineStore } from 'pinia'
import { auth, signInWithEmailAndPassword, signOut } from '~/plugins/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '~/plugins/firebase' // Adjust the import based on your project structure
import type { User } from 'firebase/auth'

interface AuthUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  accessToken: string;
}

interface AppUser {
  subscriptionLevel: string;
  paymentInfo: any;
  rsvp: any;
  tasks: any;
  polls: any;
  events: any;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authUser: null as null | AuthUser,
    appUser: null as null | AppUser,
    loading: false,
  }),
  actions: {
    async setUser(user: User | null) {
      if (user) {
        const accessToken = await user.getIdToken()
        this.authUser = { 
          uid: user.uid, 
          email: user.email, 
          emailVerified: user.emailVerified,
          accessToken
        }
        await this.fetchAppUser(user.uid)
      } else {
        this.authUser = null
        this.appUser = null
      }
    },
    async fetchAppUser(uid: string) {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        this.appUser = userDoc.data() as AppUser
      } else {
        this.appUser = {
          subscriptionLevel: 'free',
          paymentInfo: null,
          rsvp: null,
          tasks: null,
          polls: null,
          events: null
        }
        await setDoc(doc(db, 'users', uid), this.appUser)
      }
    },
    async updatePaymentInfo(paymentInfo: any) {
      if (this.authUser) {
        this.appUser.paymentInfo = paymentInfo
        await updateDoc(doc(db, 'users', this.authUser.uid), { paymentInfo })
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
    isAuthenticated: (state) => !!state.authUser,
    getCurrentUser: (state) => state.authUser,
    getAppUser: (state) => state.appUser,
    isLoading: (state) => state.loading,
  },
})
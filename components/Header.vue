<template>
  <header class="bg-gray-900 text-white p-4">
    <div class="container header-container mx-auto flex justify-between items-center">
      <nuxt-link to="/"><h1 class="text-2xl font-bold">EventFlow</h1></nuxt-link>
      <div class="flex items-center">
        <nav v-if="isAuthenticated" class="flex items-center space-x-6 text-gray-400">
          <nuxt-link to="/" exact-active-class="text-white" class="hover:text-gray-200 flex items-center space-x-1">
            <i class="material-icons">home</i>
            <span>Home</span>
          </nuxt-link>
          <nuxt-link to="/tasks" exact-active-class="text-white" class="hover:text-gray-200 flex items-center space-x-1">
            <i class="material-icons">assignment</i>
            <span>Tasks</span>
          </nuxt-link>
          <nuxt-link to="/rsvp" exact-active-class="text-white" class="hover:text-gray-200 flex items-center space-x-1">
            <i class="material-icons">event</i>
            <span>RSVP</span>
          </nuxt-link>
          <nuxt-link to="/polls" exact-active-class="text-white" class="hover:text-gray-200 flex items-center space-x-1">
            <i class="material-icons">poll</i>
            <span>Polls</span>
          </nuxt-link>
        </nav>
        <div v-if="isAuthenticated" class="relative ml-4">
          <button @click="toggleDropdown" class="flex items-center bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
            <i class="material-icons mr-2">account_circle</i>
            {{ user?.email }}
            <i class="material-icons ml-2">expand_more</i>
          </button>
            <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg" style="z-index: 9999;">
            <nuxt-link to="/profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-1">
              <i class="material-icons">account_circle</i>
              <span>Profile</span>
            </nuxt-link>
            <button @click="handleSignOut" class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-1">
              <i class="material-icons">exit_to_app</i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
        <nuxt-link v-else to="/signin" class="ml-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 flex items-center space-x-1">
          <i class="material-icons mr-1">login</i>
          <strong>SIGN IN</strong>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../src/stores/auth'

// Store
const authStore = useAuthStore()

// Computed Properties
const user = computed(() => authStore.user)
const isAuthenticated = computed(() => !!authStore.user)

// Dropdown state
const dropdownOpen = ref(false)
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

// Sign out handler
const handleSignOut = () => {
  authStore.signOut()
  dropdownOpen.value = false
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>
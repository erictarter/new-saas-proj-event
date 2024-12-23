<template>
    <div>
      <!-- Fixed header -->
      <header class="fixed top-0 left-0 right-0 bg-gray-900 text-white h-16 z-30">
        <div class="mx-auto flex justify-between items-center h-full px-4">
          <nuxt-link to="/"><h1 class="text-2xl font-bold">EventFlow</h1></nuxt-link>
          <button @click="toggleMenu" class="text-white focus:outline-none z-40">
            <i class="material-icons text-3xl">menu</i>
          </button>
        </div>
      </header>
  
      <!-- Spacer div to prevent content from going under fixed header -->
      <div class="h-16"></div>
  
      <!-- Overlay -->
      <div 
        v-show="menuOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-30"
        :class="{ 'opacity-0': !menuOpen, 'opacity-100': menuOpen }"
        @click="toggleMenu"
      ></div>
  
      <!-- Side Menu -->
      <nav 
        class="fixed top-0 right-0 h-full w-full sm:w-1/2 bg-gray-950 transform transition-transform duration-300 ease-out z-40 overflow-y-auto"
        :class="{ 'translate-x-full': !menuOpen, 'translate-x-0': menuOpen }"
      >
        <!-- Close button -->
        <button 
          @click="toggleMenu" 
          class="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
        >
          <i class="material-icons text-3xl">close</i>
        </button>
  
        <div class="flex flex-col space-y-2 p-4 mt-16">
          <nuxt-link 
            v-for="(link, index) in navLinks" 
            :key="index"
            :to="link.to"
            class="bg-gray-900 hover:bg-gray-900 text-white p-3 rounded flex items-center space-x-2 transition-colors duration-200"
            @click="closeMenu"
          >
            <i class="material-icons">{{ link.icon }}</i>
            <span>{{ link.text }}</span>
          </nuxt-link>
  
          <template v-if="isAuthenticated">
            <nuxt-link 
              to="/profile" 
              class="bg-gray-900 hover:bg-gray-900 text-white p-3 rounded flex items-center space-x-2"
              @click="closeMenu"
            >
              <i class="material-icons">account_circle</i>
              <span>Profile</span>
            </nuxt-link>
            <button 
              @click="handleSignOut" 
              class="bg-gray-900 hover:bg-gray-900 text-white p-3 rounded flex items-center space-x-2 w-full"
            >
              <i class="material-icons">exit_to_app</i>
              <span>Sign Out</span>
            </button>
          </template>
  
          <template v-else>
            <nuxt-link 
              to="/signin" 
              class="bg-gray-900 hover:bg-gray-900 text-white p-3 rounded flex items-center space-x-2"
              @click="closeMenu"
            >
              <i class="material-icons">login</i>
              <span>Sign In</span>
            </nuxt-link>
          </template>
        </div>
      </nav>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import { useAuthStore } from '../src/stores/auth'
  
  // Store
  const authStore = useAuthStore()
  
  // Computed Properties
  const isAuthenticated = computed(() => !!authStore.getCurrentUser && authStore.getCurrentUser.emailVerified)
  const needsVerification = computed(() => {
    const currentUser = authStore.getCurrentUser
    return currentUser && !currentUser.emailVerified
  })
  
  // Menu state
  const menuOpen = ref(false)
  
  // Navigation links
  const navLinks = computed(() => [
    { to: '/', icon: 'home', text: 'Home' },
    { to: '/tasks', icon: 'assignment', text: 'Tasks' },
    { to: '/rsvp', icon: 'event', text: 'RSVP' },
    { to: '/polls', icon: 'poll', text: 'Polls' },
    ...(needsVerification.value ? [{ to: '/verification', icon: 'warning', text: 'VERIFY EMAIL' }] : []),
  ])
  
  // Toggle menu
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
    handleScrollLock()
  }
  
  // Close menu
  const closeMenu = () => {
    menuOpen.value = false
    handleScrollLock()
  }
  
  // Handle scroll lock
  const handleScrollLock = () => {
    document.body.style.overflow = menuOpen.value ? 'hidden' : ''
    if (!menuOpen.value) {
      // Reset scroll position when closing menu
      window.scrollTo(0, window.scrollY)
    }
  }
  
  // Sign out handler
  const handleSignOut = () => {
    authStore.signOut()
    closeMenu()
  }
  
  // Clean up on component unmount
  onBeforeUnmount(() => {
    document.body.style.overflow = ''
  })
  </script>
  
  <style scoped>
  /* Ensure smooth iOS momentum scrolling */
  nav {
    -webkit-overflow-scrolling: touch;
  }
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  nav::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  nav {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  </style>
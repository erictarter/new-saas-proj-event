<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto flex justify-between items-center">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import authMiddleware from '../src/middleware/auth'

definePageMeta({
  middleware: authMiddleware
})
</script>

<style scoped>
/* Add any necessary styles here */
</style>
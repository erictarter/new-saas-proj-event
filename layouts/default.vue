<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow w-full p-4">
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
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
  </script>
  <style>
    .container {
      max-width: 1200px;
    }
</style>
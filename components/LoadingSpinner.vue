<template>
  <div class="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-100">
    <div class="loader lg:w-20 lg:h-20 w-16 h-16 lg:translate-x-0 translate-x-[-50%]"></div>
  </div>
</template>

<script setup lang="ts">
// No script needed for this simple component
</script>

<style scoped>
.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid rgba(219, 39, 119, 1);
  border-radius: 50%;
  animation: spin .75s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
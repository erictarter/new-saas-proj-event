<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div class="loader"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No script needed for this simple component
  </script>
  
  <style scoped>
  .loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid rgba(219, 39, 119, 1);;
    border-radius: 50%;
    width: 85px;
    height: 85px;
    animation: spin .75s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
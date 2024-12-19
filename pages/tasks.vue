<template>
    <div class="p-4">
      <div class="flex justify-center mb-6">
        <button
          @click="activeTab = 'tasks'"
          :class="{
            'bg-indigo-500 text-white': activeTab === 'tasks',
            'bg-gray-200 text-gray-800': activeTab !== 'tasks'
          }"
          class="px-4 py-2 rounded-l-lg focus:outline-none uppercase font-bold"
        >
          Task Board
        </button>
        <button
          @click="activeTab = 'budget'"
          :class="{
            'bg-indigo-500 text-white': activeTab === 'budget',
            'bg-gray-200 text-gray-800': activeTab !== 'budget'
          }"
          class="px-4 py-2 rounded-r-lg focus:outline-none uppercase font-bold"
        >
          Budget Board
        </button>
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="activeTab === 'tasks'" key="tasks" class="w-full">
          <TaskBoard />
        </div>
        <div v-else key="budget" class="w-full">
          <BudgetBoard />
        </div>
      </transition>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import TaskBoard from '~/components/TaskBoard.vue'
  import BudgetBoard from '~/components/BudgetBoard.vue'
  import authMiddleware from '../src/middleware/auth'
  
  definePageMeta({
    middleware: authMiddleware
  })
  
  export default defineComponent({
    components: {
      TaskBoard,
      BudgetBoard,
    },
    setup() {
      const activeTab = ref('tasks')
      return {
        activeTab,
      }
    },
  })
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
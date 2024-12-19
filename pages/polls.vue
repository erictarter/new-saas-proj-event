<template>
    <div class="p-4">
      <div class="flex justify-center mb-6">
        <button
          @click="activeTab = 'new'"
          :class="{
            'bg-pink-500 text-white': activeTab === 'new',
            'bg-gray-200 text-gray-800': activeTab !== 'new'
          }"
          class="px-4 py-2 rounded-l-lg uppercase font-bold focus:outline-none"
        >
          New Poll
        </button>
        <button
          @click="activeTab = 'existing'"
          :class="{
            'bg-pink-500 text-white': activeTab === 'existing',
            'bg-gray-200 text-gray-800': activeTab !== 'existing'
          }"
          class="px-4 py-2 uppercase font-bold rounded-r-lg focus:outline-none"
        >
          Existing Polls
        </button>
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="activeTab === 'new'" key="new">
          <NewPoll />
        </div>
        <div v-else key="existing">
          <PollList />
        </div>
      </transition>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import NewPoll from '~/components/NewPoll.vue'
  import PollList from '~/components/PollList.vue'
  import authMiddleware from '../src/middleware/auth'
  
  definePageMeta({
    middleware: authMiddleware
  })
  
  export default defineComponent({
    components: {
      NewPoll,
      PollList,
    },
    setup() {
      const activeTab = ref('new')
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
<template>
    <div class="p-4 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800">Welcome to EventFlow</h1>
      
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <nuxt-link to="/tasks" class="block p-6 bg-indigo-500 text-white rounded-lg shadow-lg hover:bg-indigo-600 flex items-center space-x-4">
          <i class="material-icons text-4xl">assignment</i>
          <span class="text-xl font-bold">Go to Task Board</span>
        </nuxt-link>
        <nuxt-link to="/rsvp" class="block p-6 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 flex items-center space-x-4">
          <i class="material-icons text-4xl">event</i>
          <span class="text-xl font-bold">Manage RSVPs</span>
        </nuxt-link>
        <nuxt-link to="/polls" class="block p-6 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 flex items-center space-x-4">
          <i class="material-icons text-4xl">poll</i>
          <span class="text-xl font-bold">Create Polls</span>
        </nuxt-link>
      </div>
  
      <div class="mt-8">
        <h2 class="text-2xl font-bold text-gray-800">Recent Activity</h2>
        <ul class="mt-4 space-y-4">
          <li class="p-4 bg-white rounded-lg shadow flex items-center space-x-4">
            <i class="material-icons text-pink-500 text-3xl">poll</i>
            <div>
              <p class="text-gray-700">You created a new poll: <strong>Event Date Poll</strong></p>
              <p class="text-gray-500 text-sm">2 hours ago</p>
            </div>
          </li>
          <li class="p-4 bg-white rounded-lg shadow flex items-center space-x-4">
            <i class="material-icons text-teal-500 text-3xl">event</i>
            <div>
              <p class="text-gray-700">You RSVP'd to: <strong>Annual Meetup</strong></p>
              <p class="text-gray-500 text-sm">1 day ago</p>
            </div>
          </li>
          <li class="p-4 bg-white rounded-lg shadow flex items-center space-x-4">
            <i class="material-icons text-indigo-500 text-3xl">assignment_turned_in</i>
            <div>
              <p class="text-gray-700">You completed a task: <strong>Send Invitations</strong></p>
              <p class="text-gray-500 text-sm">3 days ago</p>
            </div>
          </li>
        </ul>
      </div>
  
      <div class="mt-8">
        <h2 class="text-2xl font-bold text-gray-800">Upcoming Events</h2>
        <ul class="mt-4 space-y-4">
          <li class="p-4 bg-white rounded-lg shadow flex items-center space-x-4">
            <i class="material-icons text-indigo-500 text-3xl">event</i>
            <div>
              <p class="text-gray-700"><strong>Project Kickoff</strong></p>
              <p class="text-gray-500 text-sm">Date: 1st Jan 2024</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'HomeAuth',
  });
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>
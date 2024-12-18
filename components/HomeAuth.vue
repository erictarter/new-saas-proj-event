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
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeAuth',
});
</script>
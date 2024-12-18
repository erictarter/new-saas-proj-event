<template>
    <div class="p-4">
        <div class="">
            <h1 class="text-4xl font-bold text-indigo-600">Welcome to EventFlow</h1>
            <p class="mt-4 text-2xl text-gray-600">Plan and manage your events with ease...</p>
        </div>

        <div class="mt-12 bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-3xl font-bold text-gray-800">Who is this for?</h2>
            <p class="mt-4 text-gray-600">
                Our tool is perfect for small groups planning casual or professional events. Whether you're an event planner, community organizer, or a small business, our tool will help you manage tasks, budgets, RSVPs, and more.
            </p>
        </div>

        <div class="mt-12 bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-3xl font-bold text-gray-800">Features</h2>
            <ul class="mt-4 text-gray-600 list-disc list-inside">
                <li>Shared planning boards for tasks and budgets</li>
                <li>RSVP management and reminders</li>
                <li>Polling features for deciding dates or venues</li>
                <li>Exportable reports and integrations with third-party tools like Google Calendar</li>
            </ul>
        </div>

        <div class="mt-12">
            <h2 class="text-3xl font-bold text-gray-800">Pricing Plans</h2>
            <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <nuxt-link to="/signin" class="block">
                    <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                        <h3 class="text-2xl font-bold text-indigo-600">Basic</h3>
                        <p class="mt-4 text-gray-600">$0/month</p>
                        <ul class="mt-4 text-gray-600 list-disc list-inside">
                            <li>Access to task and budget boards</li>
                            <li>Basic RSVP management</li>
                        </ul>
                    </div>
                </nuxt-link>
                <nuxt-link to="/signin" class="block">
                    <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                        <h3 class="text-2xl font-bold text-teal-600">Pro</h3>
                        <p class="mt-4 text-gray-600">$2.99/month</p>
                        <ul class="mt-4 text-gray-600 list-disc list-inside">
                            <li>All Basic features</li>
                            <li>Advanced RSVP management and reminders</li>
                            <li>Polling features</li>
                        </ul>
                    </div>
                </nuxt-link>
                <nuxt-link to="/signin" class="block">
                    <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                        <h3 class="text-2xl font-bold text-pink-600">Enterprise</h3>
                        <p class="mt-4 text-gray-600">$4.99/month</p>
                        <ul class="mt-4 text-gray-600 list-disc list-inside">
                            <li>All Pro features</li>
                            <li>Exportable reports</li>
                            <li>Integrations with third-party tools like Google Calendar</li>
                        </ul>
                    </div>
                </nuxt-link>
            </div>
        </div>

        <div class="mt-12 text-center">
            <nuxt-link to="/signin" class="block w-full px-6 py-3 text-white rounded bg-pink-500 shadow hover:bg-pink-600"><strong>GET STARTED</strong></nuxt-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeNonAuth',
});
</script>
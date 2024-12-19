<template>
    <div class="p-4 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-center">Update Plan</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div @click="openModal('Pro', 2.99)" class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                <h3 class="text-2xl font-bold text-teal-600">Pro</h3>
                <p class="mt-4 text-gray-600">$2.99/month</p>
                <ul class="mt-4 text-gray-600 list-disc list-inside">
                    <li>All Basic features</li>
                    <li>Advanced RSVP management and reminders</li>
                    <li>Polling features</li>
                </ul>
            </div>
            <div @click="openModal('Enterprise', 4.99)" class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                <h3 class="text-2xl font-bold text-pink-600">Enterprise</h3>
                <p class="mt-4 text-gray-600">$4.99/month</p>
                <ul class="mt-4 text-gray-600 list-disc list-inside">
                    <li>All Pro features</li>
                    <li>Exportable reports</li>
                    <li>Integrations with third-party tools like Google Calendar</li>
                </ul>
            </div>
        </div>
        <CheckoutModal :show="showModal" :plan="selectedPlan" @close="closeModal" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CheckoutModal from '~/components/CheckoutModal.vue';
import authMiddleware from '../src/middleware/auth'

definePageMeta({
  middleware: authMiddleware
})

export default defineComponent({
    name: 'PlansPage',
    components: {
        CheckoutModal,
    },
    setup() {
        const showModal = ref(false);
        const selectedPlan = ref<{ name: string; price: number } | null>(null);

        const openModal = (name: string, price: number) => {
            selectedPlan.value = { name, price };
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
        };

        return {
            showModal,
            selectedPlan,
            openModal,
            closeModal,
        };
    },
});
</script>
<template>
    <div class="p-4 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-center">Update Plan</h1>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div @click="openCheckoutModal('Free', 0)" :class="getCardClass('Free')" class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                <h3 class="text-2xl font-bold text-indigo-600">Free</h3>
                <p class="mt-4 text-gray-600">Free</p>
                <ul class="mt-4 text-gray-600 list-disc list-inside">
                    <li>Basic features</li>
                </ul>
                <div v-if="user.subscriptionLevel === 'free'" class="mt-4 bg-indigo-500 text-white font-bold px-1 rounded text-center inline-block">
                    Current Plan
                </div>
            </div>
            <div @click="openCheckoutModal('Pro', 2.99)" :class="getCardClass('Pro')" class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                <h3 class="text-2xl font-bold text-teal-600">Pro</h3>
                <p class="mt-4 text-gray-600">$2.99/month</p>
                <ul class="mt-4 text-gray-600 list-disc list-inside">
                    <li>All Basic features</li>
                    <li>Advanced RSVP management and reminders</li>
                    <li>Polling features</li>
                </ul>
                <div v-if="user.subscriptionLevel === 'pro'" class="mt-4 bg-teal-500 text-white font-bold px-1 rounded text-center inline-block">
                    Current Plan
                </div>
            </div>
            <div @click="openCheckoutModal('Enterprise', 4.99)" :class="getCardClass('Enterprise')" class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                <h3 class="text-2xl font-bold text-pink-600">Enterprise</h3>
                <p class="mt-4 text-gray-600">$4.99/month</p>
                <ul class="mt-4 text-gray-600 list-disc list-inside">
                    <li>All Pro features</li>
                    <li>Exportable reports</li>
                    <li>Integrations with third-party tools like Google Calendar</li>
                </ul>
                <div v-if="user.subscriptionLevel === 'enterprise'" class="mt-4 bg-pink-500 text-white font-bold px-1 rounded text-center inline-block">
                    Current Plan
                </div>
            </div>
        </div>
        <CheckoutModal :show="showModalCheckout" :plan="selectedPlan" @close="closeModal" />
        <UpdateSubscriptionModal :show="showModalSubscriptionUpdate" :plan="selectedPlan" :currentSubscription="user.subscriptionLevel" @close="closeModal" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import authMiddleware from '../src/middleware/auth'
import { useAuthStore } from '../src/stores/auth'

definePageMeta({
  middleware: authMiddleware
})

export default defineComponent({
    name: 'PlansPage',

    setup() {
        const showModalCheckout = ref(false);
        const showModalSubscriptionUpdate = ref(false);
        const selectedPlan = ref<{ name: string; price: number } | null>(null);
        const authStore = useAuthStore();
        const user = authStore.getCurrentUser;

        const openCheckoutModal = (name: string, price: number) => {
            selectedPlan.value = { name, price };
            showModalCheckout.value = true;
        };

        const openUpgradeSubscriptionModal = (name: string, price: number) => {
            selectedPlan.value = { name, price };
            showModalSubscriptionUpdate.value = true;
        };

        const closeModal = () => {
            showModalCheckout.value = false;
            showModalSubscriptionUpdate.value = false;
        };

        const getCardClass = (planName: string) => {
            return user.subscriptionLevel === planName.toLowerCase() ? 'opacity-50' : 'opacity-100';
        };

        return {
            openCheckoutModal,
            showModalCheckout,
            selectedPlan,
            showModalSubscriptionUpdate,
            openUpgradeSubscriptionModal,
            closeModal,
            getCardClass,
            user,
        };
    },
});
</script>
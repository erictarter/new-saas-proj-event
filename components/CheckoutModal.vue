<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 class="text-2xl font-bold mb-4">Checkout</h2>
            <p class="mb-4">You are about to subscribe to the <strong :class="planColor">{{ plan.name }}</strong> plan for <strong>${{ plan.price }}/month</strong>.</p>
            <form @submit.prevent="checkout">
                <div class="mb-4">
                    <label for="cardNumber" class="block text-gray-700">Card Number</label>
                    <input type="text" id="cardNumber" v-model="cardNumber" class="mt-2 block w-full border-gray-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" required>
                </div>
                <div class="mb-4">
                    <label for="expiryDate" class="block text-gray-700">Expiration Date</label>
                    <input type="text" id="expiryDate" v-model="expiryDate" placeholder="MM/YY" class="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" required>
                </div>
                <div class="mb-4">
                    <label for="cvv" class="block text-gray-700">CVV</label>
                    <input type="text" id="cvv" v-model="cvv" class="mt-2 block w-full border-gray-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" required>
                </div>
                <button type="submit" class="bg-pink-500 text-white px-4 font-bold uppercase mr-3 py-2 rounded hover:bg-pink-600">Proceed to Payment</button>
                <button type="button" @click="close" class="mt-4 bg-gray-500 font-bold uppercase text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useAuthStore } from '../src/stores/auth';

export default defineComponent({
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        plan: {
            type: Object as () => { name: string; price: number },
            required: true,
        },
    },
    setup(props, { emit }) {
        const cardNumber = ref('');
        const expiryDate = ref('');
        const cvv = ref('');
        const authStore = useAuthStore();
        const user = authStore.getCurrentUser;

        const planColor = computed(() => {
            switch (props.plan.name) {
                case 'Basic':
                    return 'text-indigo-600';
                case 'Pro':
                    return 'text-teal-600';
                case 'Enterprise':
                    return 'text-pink-600';
                default:
                    return 'text-gray-800';
            }
        });

        const checkout = async () => {
            if (user) {
                const paymentInfo = {
                    cardNumber: cardNumber.value,
                    expiryDate: expiryDate.value,
                    cvv: cvv.value,
                };
                try {
                    await authStore.updatePaymentInfo(paymentInfo);
                    alert('Payment information updated successfully.');
                    close();
                } catch (error) {
                    console.error('Error updating payment information:', error);
                    alert('An error occurred while updating your payment information. Please try again.');
                }
            }
        };

        const close = () => {
            emit('close');
        };

        return {
            cardNumber,
            expiryDate,
            cvv,
            planColor,
            checkout,
            close,
        };
    },
});
</script>
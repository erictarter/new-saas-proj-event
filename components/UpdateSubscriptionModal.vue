<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">Confirm Subscription Change</h2>
        <p class="mb-4">
          Are you sure you want to switch from <strong>{{ currentSubscription }}</strong> to <strong>{{ plan.name }}</strong>?
        </p>
        <div class="flex justify-end">
          <button @click="close" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
          <button @click="confirmChange" class="bg-indigo-500 text-white px-4 py-2 rounded">Confirm</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import { useAuthStore } from '../src/stores/auth';
  import { doc, updateDoc } from 'firebase/firestore';
  import { db } from '~/plugins/firebase'; // Adjust the import based on your project structure
  
  export default defineComponent({
    name: 'UpdateSubscriptionModal',
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      plan: {
        type: Object as PropType<{ name: string; price: number }>,
        required: true,
      },
      currentSubscription: {
        type: String,
        required: true,
      },
    },
    setup(props, { emit }) {
      const authStore = useAuthStore();
      const user = authStore.getCurrentUser;
  
      const close = () => {
        emit('close');
      };
  
      const confirmChange = async () => {
        if (user) {
          try {
            await updateDoc(doc(db, 'users', user.uid), { subscriptionLevel: props.plan.name.toLowerCase() });
            // authStore.setUser({ ...user, subscriptionLevel: props.plan.name.toLowerCase() });
            alert(`Your subscription has been updated to ${props.plan.name}.`);
            close();
          } catch (error) {
            console.error('Error updating subscription:', error);
            alert('An error occurred while updating your subscription. Please try again.');
          }
        }
      };
  
      return {
        close,
        confirmChange,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>
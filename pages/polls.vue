<template>
    <div class="p-4">
        <div class="flex justify-center mb-6">
            <button @click="activeTab = 'new'" :class="{'bg-pink-500 text-white': activeTab === 'new', 'bg-gray-200 text-gray-800': activeTab !== 'new'}" class="px-4 py-2 rounded-l-lg uppercase font-bold focus:outline-none">New Poll</button>
            <button @click="activeTab = 'existing'" :class="{'bg-pink-500 text-white': activeTab === 'existing', 'bg-gray-200 text-gray-800': activeTab !== 'existing'}" class="px-4 py-2 uppercase font-bold rounded-r-lg focus:outline-none">Existing Polls</button>
        </div>
        <div v-if="activeTab === 'new'">
            <NewPoll />
        </div>
        <div v-else>
            <PollList />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NewPoll from '~/components/NewPoll.vue';
import PollList from '~/components/PollList.vue';
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
        const activeTab = ref('new');
        return {
            activeTab,
        };
    },
});
</script>
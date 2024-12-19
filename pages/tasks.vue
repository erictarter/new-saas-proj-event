<template>
    <div class="p-4">
        <div class="flex justify-center mb-6">
            <button @click="activeTab = 'tasks'" :class="{'bg-indigo-500 text-white': activeTab === 'tasks', 'bg-gray-200 text-gray-800': activeTab !== 'tasks'}" class="px-4 py-2 rounded-l-lg focus:outline-none uppercase font-bold">Task Board</button>
            <button @click="activeTab = 'budget'" :class="{'bg-indigo-500 text-white': activeTab === 'budget', 'bg-gray-200 text-gray-800': activeTab !== 'budget'}" class="px-4 py-2 rounded-r-lg focus:outline-none uppercase font-bold">Budget Board</button>
        </div>
        <div v-if="activeTab === 'tasks'" class="w-full">
            <TaskBoard />
        </div>
        <div v-else class="w-full">
            <BudgetBoard />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TaskBoard from '~/components/TaskBoard.vue';
import BudgetBoard from '~/components/BudgetBoard.vue';

export default defineComponent({
    components: {
        TaskBoard,
        BudgetBoard,
    },
    setup() {
        const activeTab = ref('tasks');
        return {
            activeTab,
        };
    },
});
</script>

<style>
/* Add any additional styling here */
</style>
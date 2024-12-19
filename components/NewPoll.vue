<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Create a New Poll</h2>
        <div class="mt-4">
            <input v-model="newPollQuestion" placeholder="New Poll Question" class="border p-2 rounded w-full mb-4" />
            <div v-for="(option, index) in newPollOptions" :key="index" class="flex items-center mb-2">
                <input v-model="option.text" placeholder="Option" class="border p-2 rounded w-full" />
                <button @click="removeOption(index)" class="ml-2 text-red-500 flex items-center">
                    <i class="material-icons">remove_circle</i>
                </button>
            </div>
            <button @click="addOption" class="mb-4 bg-teal-500 text-white font-bold uppercase px-4 py-2 rounded hover:bg-teal-600 flex items-center">
                <i class="material-icons mr-1">add_circle</i>
                Add Option
            </button>
            <button @click="createPoll" class="bg-pink-500 text-white px-4 py-2 font-bold uppercase rounded hover:bg-pink-600 flex items-center">
                <i class="material-icons mr-1">poll</i>
                Create Poll
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface PollOption {
    text: string;
}

interface NewPoll {
    id: number;
    question: string;
    options: { id: number; text: string; votes: number }[];
}

export default defineComponent({
    name: 'NewPoll',
    setup(_, { emit }) {
        const newPollQuestion = ref<string>('');
        const newPollOptions = ref<PollOption[]>([{ text: '' }, { text: '' }]);

        const addOption = () => {
            newPollOptions.value.push({ text: '' });
        };

        const removeOption = (index: number) => {
            newPollOptions.value.splice(index, 1);
        };

        const createPoll = () => {
            if (newPollQuestion.value.trim() && newPollOptions.value.every(option => option.text.trim())) {
                const newPoll: NewPoll = {
                    id: Date.now(),
                    question: newPollQuestion.value,
                    options: newPollOptions.value.map((option, index) => ({ id: index + 1, text: option.text, votes: 0 })),
                };
                emit('poll-created', newPoll);
                newPollQuestion.value = '';
                newPollOptions.value = [{ text: '' }, { text: '' }];
            }
        };

        return {
            newPollQuestion,
            newPollOptions,
            addOption,
            removeOption,
            createPoll,
        };
    },
});
</script>

<style>
/* Add any additional styling here */
</style>
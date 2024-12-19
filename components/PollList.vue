<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Existing Polls</h2>
        <ul class="space-y-4">
            <li v-for="poll in polls" :key="poll.id" class="bg-white p-6 rounded-lg shadow-lg">
                <h3 class="text-xl font-bold mb-2 flex items-center">
                    <i class="material-icons text-pink-500 mr-2">poll</i>
                    {{ poll.question }}
                </h3>
                <ul class="mt-2 space-y-1">
                    <li v-for="option in poll.options" :key="option.id" class="flex justify-between">
                        <span>{{ option.text }}</span>
                        <span>{{ option.votes }} votes</span>
                    </li>
                </ul>
                <div class="mt-4 flex space-x-2">
                    <button @click="editPoll(poll)" class="text-blue-500 flex items-center">
                        <i class="material-icons mr-1">edit</i>
                        Edit
                    </button>
                    <button @click="deletePoll(poll.id)" class="text-red-500 flex items-center">
                        <i class="material-icons mr-1">delete</i>
                        Delete
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Option {
    id: number;
    text: string;
    votes: number;
}

interface Poll {
    id: number;
    question: string;
    options: Option[];
}

export default defineComponent({
    setup() {
        const polls = ref<Poll[]>([
            {
                id: 1,
                question: 'What is your favorite color?',
                options: [
                    { id: 1, text: 'Red', votes: 10 },
                    { id: 2, text: 'Blue', votes: 20 },
                    { id: 3, text: 'Green', votes: 5 },
                ],
            },
            {
                id: 2,
                question: 'What is your favorite food?',
                options: [
                    { id: 1, text: 'Pizza', votes: 15 },
                    { id: 2, text: 'Burger', votes: 25 },
                    { id: 3, text: 'Pasta', votes: 10 },
                ],
            },
        ]);

        const editPoll = (poll: Poll) => {
            // Implement edit poll functionality
            alert(`Edit poll: ${poll.question}`);
        };

        const deletePoll = (id: number) => {
            polls.value = polls.value.filter(poll => poll.id !== id);
        };

        return {
            polls,
            editPoll,
            deletePoll,
        };
    },
});
</script>

<style>
/* Add any additional styling here */
</style>
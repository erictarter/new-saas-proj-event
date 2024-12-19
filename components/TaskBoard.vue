<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Task Board</h2>
        
        <!-- Filter and Search -->
        <div class="flex space-x-4 mb-4">
            <input v-model="searchQuery" placeholder="Search tasks" class="border p-2 rounded w-full" />
            <select v-model="selectedCategory" class="border p-2 rounded">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
        </div>
        
        <!-- Task List -->
        <ul class="space-y-2">
            <li v-for="task in filteredTasks" :key="task.id" class="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                    <input type="checkbox" v-model="task.completed" class="mr-2" />
                    <span :class="{ 'line-through text-gray-500': task.completed }">{{ task.name }}</span>
                    <span class="text-gray-500">({{ task.category }})</span>
                    <span class="text-gray-500"> - Due: {{ task.dueDate }}</span>
                </div>
                <div class="flex space-x-2">
                    <button @click="editTask(task)" class="text-blue-500 uppercase font-bold hover:underline">Edit</button>
                    <button @click="deleteTask(task.id)" class="text-red-500 uppercase font-bold hover:underline">Delete</button>
                </div>
            </li>
        </ul>
        
        <!-- Add/Edit Task Form -->
        <div class="mt-4">
            <input v-model="newTaskName" placeholder="New Task" class="border p-2 rounded w-full" />
            <input v-model="newTaskDueDate" placeholder="Due Date" type="date" class="border p-2 rounded w-full mt-2" />
            <select v-model="newTaskCategory" class="border p-2 rounded w-full mt-2">
                <option value="">Select Category</option>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
            <button @click="addTask" class="mt-2 bg-indigo-500 uppercase font-bold text-white px-4 py-2 rounded hover:bg-indigo-600">{{ editMode ? 'Update Task' : 'Add Task' }}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

interface Task {
    id: number;
    name: string;
    dueDate: string;
    category: string;
    completed: boolean;
}

export default defineComponent({
    setup() {
        const tasks = ref<Task[]>([]);
        const newTaskName = ref('');
        const newTaskDueDate = ref('');
        const newTaskCategory = ref('');
        const searchQuery = ref('');
        const selectedCategory = ref('');
        const editMode = ref(false);
        const editTaskId = ref<number | null>(null);
        const categories = ref(['Work', 'Personal', 'Urgent', 'Miscellaneous']);

        const filteredTasks = computed(() => {
            return tasks.value.filter(task => {
                return (
                    (!searchQuery.value || task.name.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
                    (!selectedCategory.value || task.category === selectedCategory.value)
                );
            });
        });

        const addTask = () => {
            if (newTaskName.value.trim() && newTaskDueDate.value.trim() && newTaskCategory.value.trim()) {
                if (editMode.value) {
                    const task = tasks.value.find(task => task.id === editTaskId.value);
                    if (task) {
                        task.name = newTaskName.value;
                        task.dueDate = newTaskDueDate.value;
                        task.category = newTaskCategory.value;
                    }
                    editMode.value = false;
                    editTaskId.value = null;
                } else {
                    tasks.value.push({ id: Date.now(), name: newTaskName.value, dueDate: newTaskDueDate.value, category: newTaskCategory.value, completed: false });
                }
                newTaskName.value = '';
                newTaskDueDate.value = '';
                newTaskCategory.value = '';
            }
        };

        const editTask = (task: Task) => {
            newTaskName.value = task.name;
            newTaskDueDate.value = task.dueDate;
            newTaskCategory.value = task.category;
            editMode.value = true;
            editTaskId.value = task.id;
        };

        const deleteTask = (id: number) => {
            tasks.value = tasks.value.filter(task => task.id !== id);
        };

        return {
            tasks,
            newTaskName,
            newTaskDueDate,
            newTaskCategory,
            searchQuery,
            selectedCategory,
            editMode,
            editTaskId,
            categories,
            filteredTasks,
            addTask,
            editTask,
            deleteTask
        };
    }
});
</script>

<style>
/* Add any additional styling here */
</style>
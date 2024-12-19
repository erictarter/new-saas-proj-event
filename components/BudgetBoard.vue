<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Budget Board</h2>
      
      <!-- Total Budget -->
      <div class="bg-gray-100 p-4 rounded shadow mb-4">
        <h3 class="text-xl font-bold">Total Budget: ${{ totalBudget }}</h3>
      </div>
      
      <!-- Filter and Search -->
      <div class="flex space-x-4 mb-4">
        <input v-model="searchQuery" placeholder="Search items" class="border p-2 rounded w-full" />
        <select v-model="selectedCategory" class="border p-2 rounded">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      
      <!-- Budget Items List -->
      <ul class="space-y-2">
        <li v-for="item in filteredItems" :key="item.id" class="bg-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <span class="font-bold">{{ item.name }}</span> - ${{ item.amount }} <span class="text-gray-500">({{ item.category }})</span>
          </div>
          <div class="flex space-x-2">
            <button @click="editItem(item)" class="text-blue-500 uppercase font-bold hover:underline">Edit</button>
            <button @click="deleteItem(item.id)" class="text-red-500 uppercase font-bold hover:underline">Delete</button>
          </div>
        </li>
      </ul>
      
      <!-- Add/Edit Item Form -->
      <div class="mt-4">
        <input v-model="newItemName" placeholder="New Item" class="border p-2 rounded w-full" />
        <input v-model="newItemAmount" placeholder="Amount" type="number" class="border p-2 rounded w-full mt-2" />
        <select v-model="newItemCategory" class="border p-2 rounded w-full mt-2">
          <option value="">Select Category</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
        <button @click="addItem" class="mt-2 bg-green-500 uppercase font-bold text-white px-4 py-2 rounded hover:bg-green-600">{{ editMode ? 'Update Item' : 'Add Item' }}</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  interface BudgetItem {
    id: number
    name: string
    amount: number
    category: string
  }
  
  // State
  const budgetItems = ref<BudgetItem[]>([])
  const newItemName = ref('')
  const newItemAmount = ref<number | null>(null)
  const newItemCategory = ref('')
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const editMode = ref(false)
  const editItemId = ref<number | null>(null)
  const categories = ref(['Food', 'Transport', 'Accommodation', 'Miscellaneous'])
  
  // Computed Properties
  const totalBudget = computed(() => {
    return budgetItems.value.reduce((total, item) => total + item.amount, 0)
  })
  
  const filteredItems = computed(() => {
    return budgetItems.value.filter(item => {
      return (
        (!searchQuery.value || item.name.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
        (!selectedCategory.value || item.category === selectedCategory.value)
      )
    })
  })
  
  // Methods
  const addItem = () => {
    if (newItemName.value.trim() && newItemAmount.value !== null && newItemCategory.value.trim()) {
      if (editMode.value) {
        const item = budgetItems.value.find(item => item.id === editItemId.value)
        if (item) {
          item.name = newItemName.value
          item.amount = newItemAmount.value
          item.category = newItemCategory.value
        }
        editMode.value = false
        editItemId.value = null
      } else {
        budgetItems.value.push({ id: Date.now(), name: newItemName.value, amount: newItemAmount.value, category: newItemCategory.value })
      }
      newItemName.value = ''
      newItemAmount.value = null
      newItemCategory.value = ''
    }
  }
  
  const editItem = (item: BudgetItem) => {
    newItemName.value = item.name
    newItemAmount.value = item.amount
    newItemCategory.value = item.category
    editMode.value = true
    editItemId.value = item.id
  }
  
  const deleteItem = (id: number) => {
    budgetItems.value = budgetItems.value.filter(item => item.id !== id)
  }
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
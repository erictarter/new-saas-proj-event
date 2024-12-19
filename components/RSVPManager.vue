<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">RSVP Management</h2>
      
      <!-- Tabs for Adding and Searching RSVPs -->
      <div class="flex justify-center mb-6">
        <button
          @click="activeTab = 'search'"
          :class="{
            'bg-teal-500 text-white': activeTab === 'search',
            'bg-gray-200 text-gray-800': activeTab !== 'search'
          }"
          class="px-4 py-2 rounded-l-lg uppercase font-bold focus:outline-none"
        >
          Search RSVPs
        </button>
        <button
          @click="activeTab = 'add'"
          :class="{
            'bg-teal-500 text-white': activeTab === 'add',
            'bg-gray-200 text-gray-800': activeTab !== 'add'
          }"
          class="px-4 py-2 rounded-r-lg uppercase font-bold focus:outline-none"
        >
          Add RSVP
        </button>
      </div>
  
      <transition name="fade" mode="out-in">
        <div v-if="activeTab === 'search'" key="search">
          <!-- Select Event -->
          <div class="mb-4">
            <select v-model="selectedEvent" class="border p-2 rounded w-full">
              <option value="">Select Event</option>
              <option v-for="event in pendingEvents" :key="event.id" :value="event.id">{{ event.name }}</option>
            </select>
          </div>
          
          <!-- Search and Filter -->
          <div class="flex space-x-4 mb-4">
            <input v-model="searchQuery" placeholder="Search RSVPs" class="border p-2 rounded w-full" />
            <select v-model="selectedStatus" class="border p-2 rounded">
              <option value="">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          
          <!-- RSVP List -->
          <ul class="space-y-2">
            <li v-for="rsvp in paginatedRSVPs" :key="rsvp.id" class="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <span class="font-bold">{{ rsvp.name }}</span> - {{ rsvp.email }}
                <span class="text-gray-500">({{ rsvp.status }})</span>
                <p class="text-gray-500">{{ rsvp.notes }}</p>
              </div>
              <div class="flex space-x-2">
                <button @click="editRSVP(rsvp)" class="text-blue-500 uppercase font-bold hover:underline">Edit</button>
                <button @click="deleteRSVP(rsvp.id)" class="text-red-500 uppercase font-bold hover:underline">Delete</button>
                <button @click="sendReminder(rsvp.email)" class="text-green-500 uppercase font-bold hover:underline">Send Reminder</button>
              </div>
            </li>
          </ul>
          
          <!-- Pagination -->
          <div class="flex justify-between items-center mt-4">
            <button @click="prevPage" :disabled="currentPage === 1" class="border border-gray-500 uppercase font-bold text-gray-800 px-4 py-2 rounded hover:bg-gray-100">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="border border-gray-500 uppercase font-bold text-gray-800 px-4 py-2 rounded hover:bg-gray-100">Next</button>
          </div>
        </div>
        <div v-else key="add">
          <!-- Add/Edit RSVP Form -->
          <div class="mt-4">
            <input v-model="newRSVPName" placeholder="Name" class="border p-2 rounded w-full" />
            <input v-model="newRSVPEmail" placeholder="Email" type="email" class="border p-2 rounded w-full mt-2" />
            <select v-model="newRSVPStatus" class="border p-2 rounded w-full mt-2">
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
            </select>
            <textarea v-model="newRSVPNotes" placeholder="Notes" class="border p-2 rounded w-full mt-2"></textarea>
            <select v-model="newRSVPEvent" class="border p-2 rounded w-full mt-2">
              <option value="">Select Event</option>
              <option v-for="event in pendingEvents" :key="event.id" :value="event.id">{{ event.name }}</option>
            </select>
            <button @click="addRSVP" class="mt-2 bg-teal-500 text-white uppercase font-bold px-4 py-2 rounded hover:bg-teal-600">{{ editMode ? 'Update RSVP' : 'Add RSVP' }}</button>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  
  interface RSVP {
    id: number;
    name: string;
    email: string;
    status: string;
    notes: string;
    eventId: number;
  }
  
  interface Event {
    id: number;
    name: string;
  }
  
  export default defineComponent({
    setup() {
      const rsvps = ref<RSVP[]>([]);
      const newRSVPName = ref('');
      const newRSVPEmail = ref('');
      const newRSVPStatus = ref('pending');
      const newRSVPNotes = ref('');
      const newRSVPEvent = ref<number | ''>('');
      const searchQuery = ref('');
      const selectedStatus = ref('');
      const selectedEvent = ref<number | ''>('');
      const editMode = ref(false);
      const editRSVPId = ref<number | null>(null);
      const currentPage = ref(1);
      const itemsPerPage = ref(5);
      const activeTab = ref('search');
      const pendingEvents = ref<Event[]>([
        { id: 1, name: 'Event 1' },
        { id: 2, name: 'Event 2' },
      ]);
  
      const filteredRSVPs = computed(() => {
        return rsvps.value.filter(rsvp => {
          return (
            (!selectedEvent.value || rsvp.eventId === selectedEvent.value) &&
            (!searchQuery.value || rsvp.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || rsvp.email.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
            (!selectedStatus.value || rsvp.status === selectedStatus.value)
          );
        });
      });
  
      const paginatedRSVPs = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return filteredRSVPs.value.slice(start, end);
      });
  
      const totalPages = computed(() => {
        return Math.ceil(filteredRSVPs.value.length / itemsPerPage.value);
      });
  
      const addRSVP = () => {
        if (newRSVPName.value.trim() && newRSVPEmail.value.trim() && newRSVPEvent.value) {
          if (editMode.value) {
            const rsvp = rsvps.value.find(rsvp => rsvp.id === editRSVPId.value);
            if (rsvp) {
              rsvp.name = newRSVPName.value;
              rsvp.email = newRSVPEmail.value;
              rsvp.status = newRSVPStatus.value;
              rsvp.notes = newRSVPNotes.value;
              rsvp.eventId = newRSVPEvent.value as number;
            }
            editMode.value = false;
            editRSVPId.value = null;
          } else {
            rsvps.value.push({ id: Date.now(), name: newRSVPName.value, email: newRSVPEmail.value, status: newRSVPStatus.value, notes: newRSVPNotes.value, eventId: newRSVPEvent.value as number });
          }
          newRSVPName.value = '';
          newRSVPEmail.value = '';
          newRSVPStatus.value = 'pending';
          newRSVPNotes.value = '';
          newRSVPEvent.value = '';
        }
      };
  
      const editRSVP = (rsvp: RSVP) => {
        newRSVPName.value = rsvp.name;
        newRSVPEmail.value = rsvp.email;
        newRSVPStatus.value = rsvp.status;
        newRSVPNotes.value = rsvp.notes;
        newRSVPEvent.value = rsvp.eventId;
        editMode.value = true;
        editRSVPId.value = rsvp.id;
      };
  
      const deleteRSVP = (id: number) => {
        rsvps.value = rsvps.value.filter(rsvp => rsvp.id !== id);
      };
  
      const sendReminder = (email: string) => {
        alert(`Reminder sent to ${email}`);
      };
  
      const prevPage = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
        }
      };
  
      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
        }
      };
  
      return {
        rsvps,
        newRSVPName,
        newRSVPEmail,
        newRSVPStatus,
        newRSVPNotes,
        newRSVPEvent,
        searchQuery,
        selectedStatus,
        selectedEvent,
        editMode,
        editRSVPId,
        currentPage,
        itemsPerPage,
        activeTab,
        pendingEvents,
        filteredRSVPs,
        paginatedRSVPs,
        totalPages,
        addRSVP,
        editRSVP,
        deleteRSVP,
        sendReminder,
        prevPage,
        nextPage,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
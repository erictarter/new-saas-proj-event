<template>
    <div class="p-4">
        <RSVPManager />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RSVPManager from '~/components/RSVPManager.vue';
import authMiddleware from '../src/middleware/auth'

definePageMeta({
  middleware: authMiddleware
})

export default defineComponent({
    components: {
        RSVPManager,
    },
});
</script>
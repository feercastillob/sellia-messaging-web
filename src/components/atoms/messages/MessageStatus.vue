<template>
  <div class="mt-1 flex items-center justify-end space-x-1 text-[10px] opacity-70">
    <span>{{ formattedTime }}</span>

    <span v-if="status" class="ml-1">
      <span v-if="status === 'sent'">✔</span>
      <span v-else-if="status === 'delivered'">✔✔</span>
      <span v-else-if="status === 'read'" class="text-primary">✔✔</span>
      <span v-else-if="status === 'error'" class="text-error">⚠</span>
    </span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    date: string;
    status?: 'sent' | 'delivered' | 'read' | 'error';
  }>();

  const formattedTime = computed(() => {
    const d = new Date(props.date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
</script>

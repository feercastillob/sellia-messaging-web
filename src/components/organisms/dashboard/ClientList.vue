<template>
  <div
    class="w-80 h-screen flex flex-col bg-bg-surface border-r border-border text-text transition-colors duration-300"
  >
    <h2 class="text-lg font-bold p-4 border-b border-border">Clientes ({{ clients.length }})</h2>
    <div class="flex-1 overflow-y-auto space-y-1 p-2">
      <ClientItem v-for="c in clients" :key="c.id" :client="c" @select="$emit('select', c)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ClientItem from '@/components/molecules/dashboard/ClientItem.vue';
  import type { Client } from '@/types/client';

  defineProps<{
    clients: Client[];
  }>();

  defineEmits<{
    (e: 'select', client: Client): void;
  }>();
</script>

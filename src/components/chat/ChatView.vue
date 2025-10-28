<template>
  <main
    class="bg-surface text-text-primary flex min-h-0 flex-1 flex-col"
    role="main"
    aria-label="Ventana de conversación"
  >
    <ChatHeader v-if="activeClient" :client="activeClient" />
    <ChatMessages v-if="activeClient" />
    <div
      v-else
      class="text-text-secondary flex flex-1 items-center justify-center px-4 text-center"
      role="note"
    >
      Selecciona un cliente para comenzar la conversación.
    </div>
    <MessageInput v-if="activeClient" class="shrink-0" />
  </main>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useClientsStore } from '@/stores/clients';
  import ChatHeader from './ChatHeader.vue';
  import ChatMessages from './ChatMessages.vue';
  import MessageInput from './MessageInput.vue';

  const { activeClient } = storeToRefs(useClientsStore());
</script>

<template>
  <div
    class="divide-outline bg-bg-primary text-text-primary divide-y"
    role="list"
    aria-label="Lista de clientes"
  >
    <ClientItem
      v-for="client in clients"
      :key="client._id"
      :client="client"
      :selected="activeClientId === client._id"
      @select="selectClient"
    />

    <div v-if="loading" class="text-on-surface-variant p-3 text-center text-sm" aria-live="polite">
      Cargando clientes...
    </div>

    <div v-if="error" class="text-error p-3 text-center text-sm" aria-live="assertive">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useClientsStore } from '@/stores/clients';

  const { clients } = defineProps<{
    clients: { _id: string; name: string }[];
  }>();

  const clientsStore = useClientsStore();
  const { activeClientId, loading, error } = storeToRefs(clientsStore);
  const { setActiveClient } = clientsStore;

  function selectClient(id: string) {
    setActiveClient(id);
  }
</script>

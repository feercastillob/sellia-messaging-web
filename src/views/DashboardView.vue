<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import ClientList from '@/components/organisms/dashboard/ClientList.vue';
  import ChatPanel from '@/components/organisms/dashboard/ChatPanel.vue';
  import type { Client } from '@/types/client';
  import type { Message } from '@/types/message';
  import { fetchClients, fetchConversation } from '@/api/clients';

  const clients = ref<Client[]>([]);
  const selectedClient = ref<Client | null>(null);
  const messagesByClient = ref<Record<string, Message[]>>({});
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function loadClients() {
    try {
      isLoading.value = true;
      clients.value = await fetchClients();
    } catch (err) {
      error.value = 'Error al cargar clientes.';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  async function loadConversation(client: Client) {
    selectedClient.value = client;

    if (!messagesByClient.value[client._id]) {
      const messages = await fetchConversation(client._id);
      messagesByClient.value[client._id] = messages;
    }
  }

  const currentMessages = computed(() =>
    selectedClient.value ? messagesByClient.value[selectedClient.value._id] || [] : []
  );

  onMounted(() => loadClients());
</script>

<template>
  <div class="flex h-screen bg-bg-default text-text-default">
    <div v-if="isLoading" class="m-auto text-gray-500">Cargando clientes...</div>
    <div v-else-if="error" class="m-auto text-red-500">{{ error }}</div>
    <template v-else>
      <ClientList :clients="clients" @select="loadConversation" />
      <ChatPanel :selected-client="selectedClient" :messages="currentMessages" />
    </template>
  </div>
</template>

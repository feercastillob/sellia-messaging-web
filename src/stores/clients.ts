import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { Client, Message } from '@/types';
import { clientApi } from '@/api/clients';

export const useClientsStore = defineStore('clients', () => {
  const clients = ref<Client[]>([]);
  const activeClientId = ref<string | null>(null);
  const activeClient = computed(
    () => clients.value.find((c) => c._id === activeClientId.value) ?? null,
  );

  const messages = ref<Record<string, Message[]>>({});
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchClients() {
    try {
      loading.value = true;
      error.value = null;
      clients.value = await clientApi.getAll();
    } catch (err) {
      error.value = 'No se pudieron cargar los clientes.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function loadMessages(clientId: string) {
    try {
      loading.value = true;
      error.value = null;

      const data = await clientApi.getConversation(clientId);
      messages.value[clientId] = data.map((item: any) => ({
        id: item.message._id,
        type: item.message.type,
        text: item.message.text,
        buttons: item.message.buttons || [],
        multimedia: item.message.multimedia,
        typeUser: item.message.typeUser,
        createdAt: item.message.createdAt,
      }));
    } catch (err) {
      error.value = 'Error al obtener la conversación.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  function sendMessage(text: string) {
    if (!activeClientId.value || !text.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      type: 'text',
      text: text.trim(),
      typeUser: 'User',
      createdAt: new Date().toISOString(),
    };
    const id = activeClientId.value;
    messages.value[id] ??= [];
    messages.value[id].push(msg);
    clientApi
      .sendMessage(id, msg)
      .catch(() => console.warn('No se pudo enviar el mensaje (modo demo).'));
  }

  function receiveMessage(msg: Message) {
    if (!activeClientId.value) return;
    const id = activeClientId.value;
    messages.value[id] ??= [];
    messages.value[id].push(msg);
  }

  function setActiveClient(id: string) {
    activeClientId.value = id;
  }
  watch(activeClientId, (id) => {
    if (id && !messages.value[id]) {
      loadMessages(id);
    }
  });

  return {
    clients,
    activeClientId,
    activeClient,
    messages,
    loading,
    error,
    fetchClients,
    loadMessages,
    sendMessage,
    receiveMessage,
    setActiveClient,
  };
});

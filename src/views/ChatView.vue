<template>
  <div class="bg-background text-on-surface flex h-screen transition-colors">
    <aside class="border-outline bg-surface flex w-80 flex-col border-r">
      <header class="border-outline flex items-center justify-between border-b p-4">
        <h1 class="text-lg font-semibold">Sellia Chat</h1>
        <div class="flex items-center gap-2">
          <ThemeToggle />
          <button
            class="border-outline hover:bg-surface-variant rounded-md border px-3 py-1 text-xs transition"
            :class="{ 'bg-surface-variant text-primary': simulating }"
            title="Simular mensajes automáticos"
            @click="toggleSim"
          >
            {{ simulating ? '🛑 Detener' : '🤖 Simular' }}
          </button>
        </div>
      </header>
      <ClientList class="flex-1 overflow-y-auto" />
    </aside>
    <section class="flex min-h-0 flex-1 flex-col">
      <ChatView />
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useClientsStore } from '@/stores/clients';
  import {
    startMessageSimulation,
    stopMessageSimulation,
    isSimulating,
  } from '@/services/messageSimulator';

  const store = useClientsStore();
  const simulating = ref(isSimulating());

  function toggleSim() {
    if (simulating.value) {
      stopMessageSimulation();
    } else {
      startMessageSimulation();
    }
    simulating.value = !simulating.value;
  }

  onMounted(async () => {
    await store.fetchClients();
  });
</script>

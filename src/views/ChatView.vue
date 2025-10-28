<template>
  <div class="bg-background text-on-surface flex h-screen transition-colors">
    <aside class="border-outline bg-surface flex w-80 flex-col border-r">
      <header class="border-outline flex items-center justify-between border-b p-4">
        <h1 class="text-lg font-light">Sellia Chats</h1>
        <div class="flex items-center gap-2">
          <ThemeToggle />
          <IconLogout />
        </div>
      </header>
      <SearchInput
        v-model="searchQuery"
        placeholder="Buscar cliente..."
        class="border-outline border-b"
      />
      <ClientList class="flex-1 overflow-y-auto" :clients="filteredClients" />
    </aside>
    <section class="flex min-h-0 flex-1 flex-col">
      <ChatView />
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useClientsStore } from '@/stores/clients';

  const store = useClientsStore();
  const searchQuery = ref('');

  onMounted(async () => {
    await store.fetchClients();
  });

  const filteredClients = computed(() => {
    if (!searchQuery.value) return store.clients;
    return store.clients.filter((client) =>
      client.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  });
</script>

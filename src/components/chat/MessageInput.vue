<template>
  <form
    class="border-outline bg-surface flex items-center gap-3 border-t p-3"
    @submit.prevent="handleSend"
  >
    <input
      v-model="text"
      type="text"
      placeholder="Escribe un mensaje..."
      class="border-outline bg-surface-variant text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-primary flex-1 rounded-lg border px-3 py-2 transition-all focus:ring-1 focus:outline-none"
    />
    <button
      type="submit"
      class="bg-primary text-on-primary hover:bg-primary/90 rounded-lg px-4 py-2 font-medium transition-colors disabled:opacity-50"
      :disabled="!text.trim()"
    >
      Enviar
    </button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useClientsStore } from '@/stores/clients';

  const store = useClientsStore();
  const text = ref('');

  function handleSend() {
    store.sendMessage(text.value);
    text.value = '';
  }
</script>

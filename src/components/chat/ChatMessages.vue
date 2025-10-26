<template>
  <div
    ref="scrollContainer"
    class="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 leading-relaxed"
    role="log"
    aria-live="polite"
    aria-label="Mensajes del chat"
  >
    <ChatBubble v-for="msg in activeMessages" :key="msg.id" :msg="msg" />
    <TypingIndicator v-if="isTyping" />
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useClientsStore } from '@/stores/clients';
  import ChatBubble from './ChatBubble.vue';
  import TypingIndicator from './TypingIndicator.vue';
  import { isTyping } from '@/services/messageSimulator';

  const scrollContainer = ref<HTMLDivElement | null>(null);
  const store = useClientsStore();
  const { activeClient, messages } = storeToRefs(store);

  const activeMessages = computed(() => messages.value[activeClient.value?._id ?? ''] ?? []);

  watch(
    [activeMessages, () => isTyping.value],
    async () => {
      await nextTick();
      requestAnimationFrame(() => {
        const el = scrollContainer.value;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      });
    },
    { deep: true },
  );
</script>

<template>
  <form
    class="border-outline bg-surface relative flex items-center gap-3 border-t p-3"
    @submit.prevent="handleSend"
  >
    <AppButton
      variant="naked"
      icon-only
      size="sm"
      title="Insertar emoji"
      @click="toggleEmojiPicker"
    >
      <Smile class="h-5 w-5" />
    </AppButton>
    <div v-if="showEmojiPicker" ref="emojiRef" class="absolute bottom-16 left-6 z-50">
      <emoji-picker @emoji-click="addEmoji" />
    </div>
    <AppButton
      as="label"
      for="fileInput"
      variant="naked"
      icon-only
      size="sm"
      title="Adjuntar archivo"
    >
      <Paperclip class="h-5 w-5" />
    </AppButton>
    <input id="fileInput" type="file" class="hidden" multiple @change="handleFileUpload" />
    <input
      v-model="text"
      type="text"
      placeholder="Escribe un mensaje..."
      class="border-outline bg-surface-variant text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-primary flex-1 rounded-lg border px-3 py-2 transition-all focus:ring-1 focus:outline-none"
    />
    <AppButton type="submit" variant="primary" size="md" :disabled="!text.trim()">
      <Send class="h-4 w-4" />
    </AppButton>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useClientsStore } from '@/stores/clients';
  import 'emoji-picker-element';
  import { Smile, Paperclip, Send } from 'lucide-vue-next';

  const store = useClientsStore();
  const text = ref('');
  const showEmojiPicker = ref(false);

  function handleSend() {
    if (!text.value.trim()) return;
    store.sendMessage(text.value);
    text.value = '';
  }

  function toggleEmojiPicker() {
    showEmojiPicker.value = !showEmojiPicker.value;
  }

  function addEmoji(event: any) {
    const emoji = event.detail.unicode;
    text.value += emoji;
  }

  function handleFileUpload(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
    console.log([...files]);
  }
</script>

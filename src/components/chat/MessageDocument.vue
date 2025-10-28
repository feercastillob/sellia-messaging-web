<template>
  <a
    :href="multimedia.file"
    target="_blank"
    rel="noopener noreferrer"
    class="bg-chat-surface-variant hover:bg-bubble-user-bg text-chat-body hover:text-chat-color-on-primary border-chat-border-outline flex items-center gap-3 rounded-lg border px-3 py-2 font-medium shadow-sm transition"
  >
    <div
      class="bg-bubble-user-bg text-chat-color-primary flex h-8 w-8 items-center justify-center rounded-md"
    >
      <FileText class="h-5 w-5" />
    </div>
    <span class="max-w-[150px] truncate">{{ multimedia.filename || 'Documento' }}</span>
  </a>
</template>

<script setup lang="ts">
  import { FileText } from 'lucide-vue-next';
  defineProps<{ multimedia: { file: string; filename?: string } }>();
</script>

<template>
  <div :class="bubbleClasses">
    <template v-if="msg.type === 'text'">
      <p>{{ msg.text }}</p>

      <div v-if="msg.buttons?.length" class="mt-3 flex flex-wrap gap-2">
        <button
          v-for="(btn, i) in msg.buttons"
          :key="i"
          type="button"
          :aria-label="`Botón de mensaje: ${btn.text}`"
          class="border-primary text-primary hover:bg-primary focus-visible:ring-primary rounded-lg border px-3 py-1.5 text-sm transition hover:text-white focus-visible:ring-2"
        >
          {{ btn.text }}
        </button>
      </div>
    </template>

    <template v-else-if="msg.type === 'image' && msg.multimedia">
      <img
        :src="msg.multimedia.file || msg.multimedia.thumbnail"
        alt="Imagen del mensaje"
        class="border-border max-w-[220px] rounded-lg border"
      />
    </template>

    <template v-else-if="msg.type === 'video' && msg.multimedia">
      <video
        controls
        class="border-border max-w-[260px] rounded-lg border"
        aria-label="Video del mensaje"
      >
        <source :src="msg.multimedia.file" type="video/mp4" />
        Tu navegador no soporta video.
      </video>
    </template>

    <template v-else-if="msg.type === 'document' && msg.multimedia">
      <a
        :href="msg.multimedia.file"
        target="_blank"
        rel="noopener noreferrer"
        class="border-border bg-bg-secondary hover:bg-primary flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:text-white"
        :aria-label="`Abrir documento ${msg.multimedia.filename}`"
      >
        📄
        <span class="truncate">{{ msg.multimedia.filename || 'Documento' }}</span>
      </a>
    </template>

    <small
      class="text-text-secondary mt-1 block text-right text-[11px] leading-none select-none"
      aria-hidden="true"
    >
      {{ formattedDate }}
    </small>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { Message } from '@/types';

  const props = defineProps<{ msg: Message }>();

  const formattedDate = computed(() =>
    new Date(props.msg.createdAt).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  );

  const bubbleClasses = computed(() => {
    const base = 'w-fit px-4 py-2.5 text-[15px] whitespace-pre-wrap shadow-sm leading-relaxed';
    switch (props.msg.typeUser) {
      case 'Client':
        return `${base} ml-auto bg-primary text-on-primary rounded-xl max-w-[70%]`;
      case 'User':
        return `${base} mr-auto bg-surface text-on-surface rounded-xl max-w-[70%]`;
      case 'UserSystem':
        return `${base} mx-auto bg-surface-variant text-text-secondary text-center text-xs rounded-lg max-w-[60%] px-3 py-1.5`;
      default:
        return `${base} mr-auto bg-surface text-on-surface rounded-xl max-w-[70%]`;
    }
  });
</script>

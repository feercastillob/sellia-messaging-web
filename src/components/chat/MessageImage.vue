<template>
  <div
    class="group border-chat-border-outline relative overflow-hidden rounded-xl border shadow-sm"
  >
    <img
      :src="multimedia.file || multimedia.thumbnail"
      alt="Imagen del mensaje"
      class="max-w-100px rounded-xl transition-transform duration-200 group-hover:scale-[1.02]"
    />
    <div
      class="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100"
    >
      <a
        :href="multimedia.file"
        target="_blank"
        rel="noopener noreferrer"
        class="text-chat-button rounded-md bg-white/90 px-3 py-1.5 shadow transition hover:bg-white"
      >
        Ver imagen
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ multimedia: { file: string; thumbnail?: string } }>();
</script>

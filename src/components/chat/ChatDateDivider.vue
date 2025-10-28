<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{ date: string | Date }>();

  const label = computed(() => {
    const inputDate = new Date(props.date);
    const today = new Date();
    const diffTime = today.setHours(0, 0, 0, 0) - inputDate.setHours(0, 0, 0, 0);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';

    const dayOfWeek = inputDate.toLocaleDateString('es-ES', { weekday: 'long' });
    if (diffDays < 7) return capitalize(dayOfWeek);

    const formatted = inputDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
    return formatted.replace('.', '').replace(/^./, (c) => c.toUpperCase());
  });

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
</script>
<template>
  <div class="my-5 flex items-center justify-center">
    <div class="bg-chat-border-outline h-px max-w-80 flex-1 opacity-40"></div>
    <span
      class="bg-chat-surface-variant/80 text-chat-text-secondary mx-3 rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-sm"
    >
      {{ label }}
    </span>
    <div class="bg-chat-border-outline h-px max-w-80 flex-1 opacity-40"></div>
  </div>
</template>

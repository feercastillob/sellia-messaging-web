<template>
  <p class="text-chat-meta mt-0.5 block" :class="align === 'right' ? 'text-right' : 'text-left'">
    {{ formattedDate }}
  </p>
</template>

<script setup lang="ts">
  defineProps<{ formattedDate: string; align?: 'left' | 'right' }>();
</script>

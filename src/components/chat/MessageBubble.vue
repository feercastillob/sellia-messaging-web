<template>
  <div
    class="flex"
    :class="{
      'justify-end': message.typeUser === 'User',
      'justify-start': message.typeUser === 'Client',
    }"
  >
    <div class="max-w-[75%] rounded-xl px-4 py-2 shadow" :class="bubbleStyle">
      <p class="text-sm">{{ message.text }}</p>
      <span class="text-on-surface-variant mt-1 block text-xs">
        {{ formatDate(message.createdAt) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { Message } from '@/types';

  const props = defineProps<{ message: Message }>();

  const bubbleStyle = computed(() =>
    props.message.typeUser === 'User'
      ? 'bg-primary text-on-primary rounded-br-none'
      : 'bg-surface text-on-surface rounded-bl-none',
  );

  function formatDate(date: string) {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
</script>

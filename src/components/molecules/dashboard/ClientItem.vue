<template>
  <div
    class="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer bg-bg-bubble hover:bg-bg-surface text-text transition-all duration-300"
    @click="$emit('select', client)"
  >
    <div class="flex items-center space-x-3">
      <AvatarLetter :name="client.name" :bgColor="client.color || 'bg-gray-400'" />
      <div class="text-left">
        <p class="text-sm font-semibold text-text">{{ client.name }}</p>
        <p class="text-xs text-text-secondary truncate w-40">{{ client.lastMessage }}</p>
      </div>
    </div>
    <!-- <div v-if="client.unread > 0" class="bg-error text-white text-xs px-2 py-0.5 rounded-full">
      {{ client.unread }}
    </div> -->
  </div>
</template>

<script setup lang="ts">
  import AvatarLetter from '@/components/atoms/avatars/AvatarLetter.vue';
  import type { Client } from '@/types/client';

  defineProps<{
    client: Client;
  }>();

  defineEmits<{
    (e: 'select', client: Client): void;
  }>();
</script>

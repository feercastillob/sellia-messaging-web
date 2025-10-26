<template>
  <div
    class="hover:bg-surface-variant flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors"
    :class="{ 'bg-surface-variant': selected }"
    @click="$emit('select', client._id)"
  >
    <AvatarLetter :name="client.name" size="sm" />
    <div class="flex flex-col overflow-hidden">
      <span class="text-on-surface truncate text-sm font-medium">
        {{ client.name || 'Cliente sin nombre' }}
      </span>
      <span class="text-on-surface/70 truncate text-xs">
        {{ client.lastMessage || 'Sin mensajes' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Client } from '@/types';

  defineProps<{
    client: Client;
    selected: boolean;
  }>();

  defineEmits(['select']);
</script>

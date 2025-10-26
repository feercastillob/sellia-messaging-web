<template>
  <header
    v-if="client"
    class="border-border bg-bg-secondary flex shrink-0 items-center gap-3 border-b p-4"
    role="banner"
  >
    <img
      v-if="client.avatar"
      :src="client.avatar"
      :alt="`Avatar de ${client.name}`"
      class="h-10 w-10 rounded-full object-cover"
    />
    <div>
      <h2 class="text-lg leading-snug font-semibold">{{ client.name }}</h2>
      <p class="text-text-secondary text-sm leading-none">Conversación activa</p>
    </div>
  </header>
</template>

<script setup lang="ts">
  import type { Client } from '@/types';

  defineProps<{ client: Client | null }>();
</script>

<template>
  <header
    v-if="client"
    class="border-border bg-bg-secondary flex shrink-0 items-center justify-between border-b p-4"
    role="banner"
  >
    <div class="flex items-center gap-3">
      <AvatarLetter :name="client.name" size="md" />
      <div>
        <h2 class="text-lg leading-snug font-light">{{ client.name }}</h2>
        <p class="text-text-secondary font-light text-sm leading-none">Conversación activa</p>
      </div>
    </div>
    <SimulateToggle />
  </header>
</template>

<script setup lang="ts">
  import type { Client } from '@/types';
  import SimulateToggle from '@/components/atoms/toggles/SimulateToggle .vue';

  defineProps<{ client: Client | null }>();
</script>

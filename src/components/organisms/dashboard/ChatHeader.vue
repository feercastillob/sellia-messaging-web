<template>
  <header
    class="flex items-center justify-between px-5 py-3 border-b border-border-default bg-bg-surface/80 backdrop-blur-md"
  >
    <div class="flex items-center space-x-3" v-if="selectedClient">
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
        :class="selectedClient.color"
      >
        {{ selectedClient.name.charAt(0).toUpperCase() }}
      </div>
      <div>
        <p class="text-sm font-semibold text-text-default">{{ selectedClient.name }}</p>
        <p class="text-xs text-text-secondary">Activo ahora</p>
      </div>
    </div>

    <div class="flex items-center space-x-3">
      <ThemeToggle />
      <button
        @click="$emit('logout')"
        class="px-3 py-1.5 rounded-md text-sm bg-error/80 text-white hover:bg-error transition-all"
      >
        Salir
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
  import ThemeToggle from '@/components/atoms/themes/ThemeToggle.vue';
  import type { Client } from '@/types/client';

  defineProps<{
    selectedClient: Client | null;
  }>();

  defineEmits<{
    (e: 'logout'): void;
  }>();
</script>

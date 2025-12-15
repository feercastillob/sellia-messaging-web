<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{ size?: 'sm' | 'md' | 'lg'; color?: string }>();

  const sizeClass = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-8 h-8';
      default:
        return 'w-5 h-5';
    }
  });
</script>

<template>
  <svg
    class="animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    :class="sizeClass"
    role="status"
    aria-label="loading"
  >
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
</template>

<style scoped>
  svg {
    color: var(--color-primary);
  }
</style>

<template>
  <div
    :class="[
      'flex items-center justify-center rounded-full font-semibold uppercase select-none transition-all duration-300',
      bgColor || 'bg-[var(--color-primary)] text-white',
      'shadow-sm]',
      sizeClass,
    ]"
  >
    {{ initial }}
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    name: string;
    bgColor?: string;
    size?: 'sm' | 'md' | 'lg';
  }>();

  const initial = computed(() => props.name.charAt(0).toUpperCase());

  const sizeClass = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'lg':
        return 'w-12 h-12 text-lg';
      default:
        return 'w-10 h-10 text-base';
    }
  });
</script>

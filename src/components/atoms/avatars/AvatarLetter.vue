<template>
  <div
    :class="[
      'flex items-center justify-center rounded-full font-semibold uppercase shadow-sm transition-all duration-300 select-none',
      backgroundClass,
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

  const initial = computed(() => {
    const firstChar = props.name?.trim().charAt(0).toUpperCase();
    return firstChar || '?';
  });

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

  const backgroundClass = computed(() => {
    if (props.bgColor) return props.bgColor;
    return 'bg-primary-container text-on-primary-container dark:bg-primary dark:text-on-primary';
  });
</script>

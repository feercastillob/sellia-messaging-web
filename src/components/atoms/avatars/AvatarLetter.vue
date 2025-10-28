<template>
  <div
    :class="[
      'flex items-center justify-center rounded-full font-semibold text-white uppercase shadow-sm transition-all duration-300 select-none',
      sizeClass,
    ]"
    :style="{ backgroundColor: backgroundColor }"
  >
    {{ initial }}
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    name: string;
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
  function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 45%)`;
  }

  const backgroundColor = computed(() => (props.name ? stringToColor(props.name) : '#9e9e9e'));
</script>

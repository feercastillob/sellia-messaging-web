<script setup lang="ts">
  import { computed } from 'vue';

  type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'naked';
  type ButtonSize = 'sm' | 'md' | 'lg';
  type ButtonType = 'button' | 'submit' | 'reset';

  const props = defineProps({
    variant: { type: String as () => ButtonVariant, default: 'primary' },
    type: { type: String as () => ButtonType, default: 'button' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    size: { type: String as () => ButtonSize, default: 'md' },
  });

  const emit = defineEmits(['click']);

  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = computed(() => {
    switch (props.variant) {
      case 'secondary':
        return 'bg-bg-surface text-text-secondary border border-border hover:bg-bg-bubble-client focus:ring-primary-light';
      case 'danger':
        return 'bg-error text-white hover:bg-[color-mix(in srgb, var(--color-error) 85%, black)] focus:ring-error/40';
      case 'naked':
        return 'bg-transparent text-primary hover:text-primary-dark focus:ring-0';
      case 'primary':
      default:
        return 'bg-blue-900 text-white hover:bg-primary-dark focus:ring-primary-light';
    }
  });

  const sizeClasses = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  });

  const stateClasses = computed(() => {
    return props.disabled || props.loading ? 'opacity-60 cursor-not-allowed' : '';
  });

  const handleClick = (event: MouseEvent) => {
    if (!props.disabled && !props.loading) emit('click', event);
  };
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[baseClasses, variantClasses, sizeClasses, stateClasses]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

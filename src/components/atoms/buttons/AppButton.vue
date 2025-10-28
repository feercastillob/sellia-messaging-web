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
    'inline-flex items-center justify-center font-medium rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = computed(() => {
    switch (props.variant) {
      case 'secondary':
        return `
        bg-secondary text-on-secondary
        hover:bg-secondary-container
        dark:bg-secondary-container dark:text-on-secondary-container
        focus:ring-secondary/40
      `;

      case 'danger':
        return `
        bg-error text-white
        hover:bg-[color-mix(in srgb, var(--color-error) 85%, black)]
        dark:bg-error-container dark:text-on-error-container
        focus:ring-error/40
      `;

      case 'naked':
        return `
        bg-transparent text-primary
        hover:text-primary-dark
        dark:text-on-primary-container
        dark:hover:text-primary-light
        focus:ring-0
      `;

      case 'primary':
      default:
        return `
        bg-bubble-user-bg text-white
        hover:bg-primary-container
        dark:bg-primary-container
        dark:hover:bg-primary-container
        focus:ring-primary/40
      `;
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
    return props.disabled || props.loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
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

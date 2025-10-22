<script setup lang="ts">
  import { computed } from 'vue';
  // import IconSpinner from '../icons/IconSpinner.vue';

  type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'naked';
  type ButtonSize = 'sm' | 'md' | 'lg';
  type ButtonType = 'button' | 'submit' | 'reset';

  const props = defineProps({
    variant: {
      type: String as () => ButtonVariant,
      default: 'primary',
    },
    type: {
      type: String as () => ButtonType,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as () => ButtonSize,
      default: 'md',
    },
  });

  const emit = defineEmits(['click']);

  const isClickable = computed(() => !props.disabled && !props.loading);

  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = computed(() => {
    switch (props.variant) {
      case 'secondary':
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 focus:ring-gray-400';
      case 'danger':
        return 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400';
      case 'naked':
        return 'bg-transparent text-primary-500 hover:underline shadow-none focus:ring-0';
      case 'primary':
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-300 focus:ring-blue-500';
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
    if (isClickable.value) emit('click', event);
  };
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[baseClasses, variantClasses, sizeClasses, stateClasses]"
    @click="handleClick"
    :aria-busy="loading"
    :aria-disabled="disabled || loading"
  >
    <template v-if="loading">
      <IconSpinner class="animate-spin w-5 h-5 mr-2" />
      Cargando...
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

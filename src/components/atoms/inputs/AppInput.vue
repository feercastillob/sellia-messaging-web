<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Eye, EyeOff } from 'lucide-vue-next';

  type InputState = 'error' | 'success' | 'disabled' | null;

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      required: true,
    },
    state: {
      type: String as () => InputState,
      validator: (val: string | null) => [null, 'error', 'success', 'disabled'].includes(val),
      default: null,
    },
    message: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const internalValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });

  const showPassword = ref(false);

  const inputType = computed(() => {
    if (props.type !== 'password') return props.type;
    return showPassword.value ? 'text' : 'password';
  });

  const inputId = computed(() => `input-${props.label.replace(/\s+/g, '-').toLowerCase()}`);

  const stateClasses = computed(() => {
    const base =
      'w-full rounded-lg border p-3 pr-10 text-sm shadow-sm transition-all duration-200 focus:outline-none text-text placeholder:text-text-secondary bg-surface-variant border-outline';

    if (props.disabled || props.state === 'disabled') {
      return `${base} opacity-60 cursor-not-allowed`;
    }

    switch (props.state) {
      case 'error':
        return `${base} bg-error-container border-error text-on-error-container focus:ring-2 focus:ring-error`;
      case 'success':
        return `${base} bg-success-container border-success text-on-success-container focus:ring-2 focus:ring-success`;
      default:
        return `${base} focus:border-primary focus:ring-2 focus:ring-primary/40`;
    }
  });
</script>

<template>
  <div class="my-2 flex flex-col space-y-1 font-sans">
    <label
      :for="inputId"
      class="text-text text-on-surface dark:bg-on-surface text-sm font-medium select-none"
      :class="{ 'opacity-60': disabled }"
    >
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="inputId"
        v-model="internalValue"
        :type="inputType"
        :disabled="disabled || state === 'disabled'"
        :placeholder="placeholder"
        :aria-invalid="state === 'error'"
        :aria-describedby="message ? `${inputId}-message` : undefined"
        :class="stateClasses"
      />
      <button
        v-if="props.type === 'password'"
        type="button"
        class="text-text-secondary hover:text-text absolute top-1/2 right-3 -translate-y-1/2 transition"
        tabindex="-1"
        @click="showPassword = !showPassword"
      >
        <component :is="showPassword ? EyeOff : Eye" class="h-5 w-5" />
      </button>
    </div>
    <p
      v-if="message"
      :id="`${inputId}-message`"
      class="mt-1 min-h-4 text-xs transition-colors"
      :class="{
        'text-error': state === 'error',
        'text-success': state === 'success',
        'text-text-secondary': !state,
      }"
    >
      {{ message }}
    </p>
  </div>
</template>

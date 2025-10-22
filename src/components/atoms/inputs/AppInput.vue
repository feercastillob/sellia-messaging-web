<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Eye, EyeOff } from 'lucide-vue-next'; // 👈 íconos (instálalos si aún no los tienes)

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
      'border rounded-lg w-full p-3 pr-10 text-sm shadow-sm transition-all duration-200 focus:outline-none text-text-default placeholder-text-secondary';
    if (props.disabled || props.state === 'disabled') {
      return `${base} bg-bg-surface border-border text-text-secondary cursor-not-allowed opacity-60`;
    }
    switch (props.state) {
      case 'error':
        return `${base} bg-red-50 border-error ring-1 ring-error focus:ring-error`;
      case 'success':
        return `${base} bg-green-50 border-success ring-1 ring-success focus:ring-success`;
      default:
        return `${base} bg-bg-surface border-border focus:border-primary-light focus:ring-1 focus:ring-primary-light`;
    }
  });
</script>

<template>
  <div class="flex flex-col space-y-1 my-2 font-primary">
    <label :for="inputId" class="text-sm font-medium text-text-default select-none">
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
        class="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-default transition"
        @click="showPassword = !showPassword"
        tabindex="-1"
      >
        <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
      </button>
    </div>

    <p
      v-if="message"
      :id="`${inputId}-message`"
      class="text-xs mt-1 min-h-4"
      :class="{
        'text-error': state === 'error',
        'text-success': state === 'success',
        'text-text-secondary': state !== 'error' && state !== 'success',
      }"
    >
      {{ message }}
    </p>
  </div>
</template>

<style scoped>
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 9999s ease-in-out 0s;
    -webkit-text-fill-color: var(--color-text) !important;
  }
</style>

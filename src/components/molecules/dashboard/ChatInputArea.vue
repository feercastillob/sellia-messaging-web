<template>
  <footer class="border-t border-border-default bg-bg-surface p-4 flex items-center space-x-3">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      type="text"
      placeholder="Escribe un mensaje..."
      class="flex-1 px-4 py-2 rounded-full bg-bg-default text-text-default border border-border-default focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      @keyup.enter="handleSend"
    />
    <button
      @click="handleSend"
      class="bg-primary hover:bg-primary/90 text-white rounded-full px-4 py-2 font-medium transition-all"
    >
      Enviar
    </button>
  </footer>
</template>

<script setup lang="ts">
  // Usamos modelValue para v-model en Vue 3
  const props = defineProps<{
    modelValue: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'send-message'): void;
  }>();

  function handleSend() {
    if (props.modelValue.trim() !== '') {
      emit('send-message');
    }
  }
</script>

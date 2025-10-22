<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div class="bg-gray-900 text-white rounded-xl p-6 w-80 text-center shadow-2xl animate-pop">
      <h2 class="text-lg font-semibold mb-2">{{ title }}</h2>
      <p class="text-sm text-gray-300 mb-6">{{ message }}</p>
      <button
        @click="$emit('close')"
        class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition-all duration-200"
      >
        Aceptar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title: string;
    message: string;
  }>();

  defineEmits<{
    (e: 'close'): void;
  }>();
</script>

<style scoped>
  @keyframes pop {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .animate-pop {
    animation: pop 0.2s ease-out;
  }
</style>

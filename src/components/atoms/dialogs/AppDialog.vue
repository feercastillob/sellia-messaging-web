<script setup lang="ts">
  defineProps<{
    title: string;
    message: string;
  }>();

  defineEmits<{
    (e: 'close'): void;
  }>();
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div
      class="bg-surface text-on-surface animate-pop dark:bg-surface dark:text-on-surface w-80 rounded-xl p-6 text-center shadow-2xl transition-colors duration-300"
    >
      <h2 class="mb-2 text-lg font-light">{{ title }}</h2>
      <p class="text-on-surface-variant mb-6 text-sm">{{ message }}</p>
      <AppButton
        type="submit"
        size="lg"
        variant="secondary"
        class="mt-3 w-full"
        @click="$emit('close')"
      >
        Aceptar
      </AppButton>
    </div>
  </div>
</template>

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

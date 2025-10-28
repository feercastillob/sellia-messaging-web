<template>
  <button
    class="border-outline bg-on-primary hover:bg-surface-variant focus:ring-primary dark:border-outline dark:bg-surface dark:hover:bg-surface-variant dark:focus:ring-primary dark:focus:ring-offset-background relative flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none"
    aria-label="Cerrar sesión"
    @click="logout"
  >
    <transition name="fade" mode="out-in">
      <LogOut key="logout" class="text-on-surface dark:text-on-surface h-5 w-5 transition-colors" />
    </transition>
  </button>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { LogOut } from 'lucide-vue-next';

  const router = useRouter();

  function logout() {
    router.push('/');
  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }
</style>

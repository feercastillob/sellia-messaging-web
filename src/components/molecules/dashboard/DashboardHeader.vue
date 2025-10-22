<template>
  <div class="flex items-center justify-end space-x-3 p-4">
    <ThemeToggle />

    <button
      @click="handleLogout"
      class="p-2 rounded-full border border-border-default bg-bg-surface hover:bg-red-600 transition-all duration-300 w-9 h-9 flex items-center justify-center"
      aria-label="Cerrar sesión"
    >
      <IconLogout class="w-5 h-5 text-error dark:text-red-400" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import ThemeToggle from '@/components/atoms/themes/ThemeToggle.vue';
  import IconLogout from '@/components/atoms/icons/IconLogout.vue';

  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem('auth');
    router.push('/');
  }
</script>

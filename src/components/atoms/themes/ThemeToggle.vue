<template>
  <button
    class="border-outline bg-on-primary hover:bg-surface-variant focus:ring-primary dark:border-outline dark:bg-surface dark:hover:bg-surface-variant dark:focus:ring-primary dark:focus:ring-offset-background relative flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none"
    aria-label="Cambiar tema"
    @click="toggleTheme"
  >
    <transition name="fade" mode="out-in">
      <component
        :is="isDark ? IconSun : IconMoon"
        :key="isDark ? 'sun' : 'moon'"
        class="text-on-surface dark:text-on-surface h-5 w-5 transition-colors"
      />
    </transition>
  </button>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import IconSun from '@/components/atoms/icons/IconSun.vue';
  import IconMoon from '@/components/atoms/icons/IconMoon.vue';

  const isDark = ref(false);

  onMounted(() => {
    isDark.value =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    applyTheme();
  });

  function toggleTheme() {
    isDark.value = !isDark.value;
    applyTheme();
  }

  function applyTheme() {
    const html = document.documentElement;
    if (isDark.value) {
      html.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      html.classList.remove('dark');
      localStorage.theme = 'light';
    }
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

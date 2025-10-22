<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-full border border-border-default bg-bg-surface hover:bg-bg-bubble transition-all duration-300 relative w-9 h-9 flex items-center justify-center overflow-hidden"
    aria-label="Cambiar tema"
  >
    <transition name="fade" mode="out-in">
      <component
        :is="isDark ? IconSun : IconMoon"
        :key="isDark ? 'sun' : 'moon'"
        class="w-5 h-5 text-text-default"
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

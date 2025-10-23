<template>
  <div
    class="flex items-center justify-center select-none transition-all duration-300"
    aria-label="Sellia Logo"
  >
    <img
      :src="currentLogo"
      alt="Sellia Logo"
      class="h-10 w-auto transition-transform duration-500 hover:scale-105 drop-shadow-sm"
      draggable="false"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import logoColor from '@/assets/images/png/logo_color_sellia.png';
  import logoWhite from '@/assets/images/png/logo_white_sellia.png';

  const isDark = ref(false);
  let observer: MutationObserver | null = null;

  function updateThemeState() {
    isDark.value = document.documentElement.classList.contains('dark');
  }

  onMounted(() => {
    updateThemeState();
    observer = new MutationObserver(updateThemeState);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  const currentLogo = computed(() => (isDark.value ? logoWhite : logoColor));
</script>

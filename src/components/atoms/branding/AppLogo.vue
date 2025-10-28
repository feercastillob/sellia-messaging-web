<template>
  <img
    :src="currentLogo"
    alt="Sellia Logo"
    class="h-10 w-auto transition-all duration-300 select-none"
    draggable="false"
  />
</template>
<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import logoColor from '@/assets/images/png/logo_color_sellia.png';
  import logoWhite from '@/assets/images/png/logo_white_sellia.png';

  const isDark = ref(false);

  function updateThemeState() {
    isDark.value = document.documentElement.classList.contains('dark');
  }
  onMounted(() => {
    updateThemeState();
    const observer = new MutationObserver(updateThemeState);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    onUnmounted(() => observer.disconnect());
  });
  const currentLogo = computed(() => (isDark.value ? logoWhite : logoColor));
</script>

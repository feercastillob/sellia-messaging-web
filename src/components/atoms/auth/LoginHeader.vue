<template>
  <header class="pb-4 text-center transition-colors space-y-2">
    <h1 class="text-2xl font-semibold text-text">{{ t('login.title') }}</h1>
    <p class="text-sm text-text-secondary">{{ t('login.subtitle') }}</p>
  </header>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>

<style scoped>
  header {
    transition-property: color, background-color, border-color;
    transition-duration: 180ms;
    transition-timing-function: ease-in-out;
  }
</style>

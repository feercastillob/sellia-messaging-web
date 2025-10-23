<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
</script>

<template>
  <footer
    class="pt-6 text-center md:text-left text-xs text-text-secondary transition-colors duration-300"
  >
    <p class="leading-relaxed text-center tracking-wide">
      {{ t('login.testCreds') }}
    </p>
  </footer>
</template>

<style scoped>
  footer {
    color: var(--color-text-secondary);
    font-family: var(--font-family-secondary, 'Roboto', sans-serif);
    line-height: 1.5;
  }
</style>

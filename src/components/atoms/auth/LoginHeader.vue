<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
</script>
<template>
  <header
    class="space-y-2 pb-4 text-center transition-colors duration-300 sm:space-y-3 sm:pb-6 md:text-left"
  >
    <h1
      class="font-poppins text-primary dark:text-primary text-center text-2xl leading-tight font-light tracking-tight transition-colors duration-300 sm:text-3xl"
    >
      {{ t('login.title') }}
    </h1>

    <p class="text-on-surface-variant dark:bg-on-surface-variant text-center text-sm sm:text-base">
      {{ t('login.subtitle') }}
    </p>
  </header>
</template>

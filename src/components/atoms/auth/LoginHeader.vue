<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
</script>

<template>
  <header class="space-y-2 pb-4">
    <h1 class="text-3xl font-extrabold text-text-default">{{ t('login.title') }}</h1>
    <p class="text-sm text-text-secondary">{{ t('login.subtitle') }}</p>
  </header>
</template>

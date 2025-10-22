<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
</script>

<template>
  <footer class="text-xs text-text-secondary pt-6">
    <p>{{ t('login.testCreds') }}</p>
  </footer>
</template>

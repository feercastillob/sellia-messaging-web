<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
</script>

<template>
  <footer
    class="text-on-surface-variant w-full rounded-b-lg py-6 text-xs transition-colors duration-300 md:text-left"
  >
    <p
      class="text-on-surface-variant mx-auto max-w-md text-center font-sans leading-relaxed tracking-wide md:mx-0"
    >
      {{ t('login.testCreds') }}
    </p>
  </footer>
</template>

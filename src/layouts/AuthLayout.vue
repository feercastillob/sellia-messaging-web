<template>
  <div
    class="bg-background dark:bg-background text-text-default flex min-h-screen flex-col items-center justify-center transition-colors duration-300"
  >
    <header class="absolute top-0 left-0 flex w-full items-center justify-between p-6">
      <AppLogo />
      <div class="flex items-center gap-3">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
    <main class="flex w-full flex-1 items-center justify-center">
      <div class="w-full max-w-md px-4">
        <slot />
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
  import AppLogo from '@/components/atoms/branding/AppLogo.vue';
  import ThemeToggle from '@/components/atoms/toggles/ThemeToggle.vue';
  import LanguageToggle from '@/components/atoms/toggles/LanguageToggle.vue';
</script>

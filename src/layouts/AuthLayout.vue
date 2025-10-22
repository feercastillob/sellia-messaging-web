<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-bg-default text-text-default transition-colors duration-300"
  >
    <header class="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
      <AppLogo />
      <div class="flex items-center gap-3">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
    <main class="flex-1 w-full flex items-center justify-center">
      <div class="w-full max-w-md px-4">
        <slot />
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
  import AppLogo from '@/components/atoms/branding/AppLogo.vue';
  import ThemeToggle from '@/components/atoms/themes/ThemeToggle.vue';
  import LanguageToggle from '@/components/atoms/themes/LanguageToggle.vue';
</script>

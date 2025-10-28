<template>
  <button
    @click="toggleLanguage"
    class="relative overflow-hidden flex items-center justify-center w-20 h-9 rounded-full border border-border-default bg-bg-surface hover:bg-bg-bubble transition-all duration-300 text-sm font-medium text-text-default"
    aria-label="Cambiar idioma"
  >
    <transition name="fade" mode="out-in">
      <div :key="language" class="absolute inset-0 flex items-center justify-center gap-2">
        <img
          :src="language === 'es' ? flagEs : flagEn"
          :alt="language === 'es' ? 'Español' : 'English'"
          class="w-5 h-5 rounded-full object-cover shadow-sm"
        />
        <span class="hidden sm:inline">{{ language.toUpperCase() }}</span>
      </div>
    </transition>
  </button>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  import flagEs from '@/assets/images/svg/es.svg';
  import flagEn from '@/assets/images/svg/en.svg';

  const { locale } = useI18n();
  const language = ref<'es' | 'en'>('es');

  onMounted(() => {
    const storedLang = localStorage.getItem('lang');
    const lang =
      storedLang === 'es' || storedLang === 'en'
        ? storedLang
        : navigator.language.startsWith('es')
          ? 'es'
          : 'en';

    language.value = lang;
    locale.value = lang;
  });

  function toggleLanguage() {
    language.value = language.value === 'es' ? 'en' : 'es';
  }

  watch(language, (val) => {
    localStorage.setItem('lang', val);
    locale.value = val;
  });
</script>
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>

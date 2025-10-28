<template>
  <button
    class="border-outline bg-on-primary hover:bg-surface-variant focus:ring-primary dark:border-outline dark:bg-surface dark:hover:bg-surface-variant dark:focus:ring-primary dark:focus:ring-offset-background relative flex h-9 w-20 items-center justify-center overflow-hidden rounded-full border shadow-sm transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none"
    aria-label="Cambiar idioma"
    @click="toggleLanguage"
  >
    <transition mode="out-in" name="fade">
      <div :key="language" class="absolute inset-0 flex items-center justify-center gap-2">
        <img
          class="h-5 w-5 rounded-full object-cover shadow-sm"
          :alt="language === 'es' ? 'Español' : 'English'"
          :src="language === 'es' ? flagEs : flagEn"
        />
        <span class="text-on-surface dark:text-on-surface hidden transition-colors sm:inline">
          {{ language.toUpperCase() }}
        </span>
      </div>
    </transition>
  </button>
</template>

<script lang="ts" setup>
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

import './assets/tailwind.css';

import { createApp, type Component } from 'vue';
import { createPinia } from 'pinia';
import { i18n } from './plugins/i18n';
import App from './App.vue';
import router from './router';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
const options: ToastContainerOptions = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnHover: true,
  theme: 'colored',
};

app.use(Vue3Toastify, options);
app.use(i18n);
app.use(router);

if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
// 1. Usar glob para escanear todos los archivos .vue dentro de src/components
// El parámetro 'eager' hace que la importación sea síncrona,
// lo cual es ideal para componentes pequeños o globales.
const components = import.meta.glob('./components/**/*.vue', { eager: true });
// 2. Iterar sobre las importaciones y registrar cada componente
for (const path in components) {
  // 1. Define el tipo esperado para la configuración del componente
  const componentConfig = components[path] as { default: Component };
  //    ^ Aquí le decimos a TypeScript: "Confía en mí, este objeto tiene una propiedad 'default' que es un Componente de Vue."

  const componentName = path
    .split('/')
    .pop()!
    .replace(/\.\w+$/, '');

  // 2. Usar 'componentConfig.default' directamente
  app.component(componentName, componentConfig.default);
}

app.mount('#app');

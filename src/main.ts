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
const components = import.meta.glob('./components/**/*.vue', { eager: true });
for (const path in components) {
  const componentConfig = components[path] as { default: Component };
  const componentName = path
    .split('/')
    .pop()!
    .replace(/\.\w+$/, '');
  app.component(componentName, componentConfig.default);
}
app.mount('#app');

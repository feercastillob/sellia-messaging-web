import type { App } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import { i18n } from './i18n';
import { setupToastify } from './toastify';
import { registerGlobalComponents } from './registerComponents';
import { setupTheme } from './theme';

export function setupPlugins(app: App) {
  const pinia = createPinia();
  app.use(pinia);
  app.use(router);
  app.use(i18n);
  setupToastify(app);
  registerGlobalComponents(app);
  setupTheme();
}

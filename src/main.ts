import './assets/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import { setupPlugins } from './plugins';

const app = createApp(App);

// 🔌 Carga todos los plugins en un solo lugar
setupPlugins(app);

app.mount('#app');

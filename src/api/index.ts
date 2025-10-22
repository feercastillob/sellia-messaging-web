import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 🧠 Interceptores globales
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = (error.response?.data as { message?: string })?.message || error.message;

    switch (status) {
      case 400:
        toast.warn(`⚠️ Solicitud incorrecta: ${message}`);
        break;
      case 401:
        toast.error('🔒 Sesión expirada. Redirigiendo al login...');
        localStorage.removeItem('authToken');
        setTimeout(() => (window.location.href = '/login'), 2000);
        break;
      case 403:
        toast.error('🚫 No tienes permisos para realizar esta acción.');
        break;
      case 404:
        toast.info('🔍 Recurso no encontrado.');
        break;
      case 500:
        toast.error('💥 Error interno del servidor.');
        break;
      default:
        toast.error(`❌ ${message}`);
    }

    return Promise.reject(error);
  }
);

export default api;

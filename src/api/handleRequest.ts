import api from './index';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'vue3-toastify';

/**
 * 🧩 Maneja solicitudes HTTP con tipado y control de errores global
 */
export async function handleRequest<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<T> = await api.request<T>(config);
    return response.data;
  } catch (error) {
    // Cast seguro
    const axiosError = error as AxiosError<{ message?: string }>;
    const message = axiosError.response?.data?.message || axiosError.message || 'Error desconocido';

    toast.error(`❌ ${message}`);
    throw axiosError;
  }
}

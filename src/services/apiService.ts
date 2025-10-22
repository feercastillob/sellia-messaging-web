import { handleRequest } from '../api/handleRequest';
import type { AxiosRequestConfig } from 'axios';

export const apiService = {
  get<T>(url: string, config?: AxiosRequestConfig) {
    return handleRequest<T>({
      url,
      method: 'GET',
      ...config,
    });
  },

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return handleRequest<T>({
      url,
      method: 'POST',
      data,
      ...config,
    });
  },

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return handleRequest<T>({
      url,
      method: 'PUT',
      data,
      ...config,
    });
  },

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return handleRequest<T>({
      url,
      method: 'DELETE',
      ...config,
    });
  },
};

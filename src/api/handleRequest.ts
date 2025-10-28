import api from './index';
import type { AxiosRequestConfig } from 'axios';

export async function handleRequest<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await api.request<T>(config);
  return response.data;
}

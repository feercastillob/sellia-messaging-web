import api from './index';
import type { Client, Message } from '@/types';

export const clientApi = {
  async getAll() {
    const { data } = await api.get<Client[]>('/clients.json');
    return data;
  },

  async getConversation(clientId: string) {
    const { data } = await api.get<Message[]>(`/${clientId}.json`);
    return data;
  },

  async sendMessage(clientId: string, message: Partial<Message>) {
    const { data } = await api.post<Message>(`/${clientId}/messages`, message);
    return data;
  },
};

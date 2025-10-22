import { apiService } from '../services/apiService';
import type { Client } from '@/types/client';
import type { Message } from '@/types/message';

const STORAGE_KEY = 'messagesByClient';

export async function fetchClients(): Promise<Client[]> {
  const data = await apiService.get<Client[]>('/clients.json');
  return data.map((client) => ({
    ...client,
    color: getRandomColor() as string,
    lastMessage: 'Sin mensajes aún',
    unread: 0,
  }));
}

export async function fetchConversation(clientId: string): Promise<Message[]> {
  const data = await apiService.get<Message[]>(`/${clientId}.json`);
  return data.sort(
    (a, b) => new Date(a.message.createdAt).getTime() - new Date(b.message.createdAt).getTime()
  );
}

function getRandomColor(): string {
  const colors = [
    'bg-green-600',
    'bg-blue-600',
    'bg-red-600',
    'bg-indigo-600',
    'bg-amber-600',
    'bg-purple-600',
    'bg-teal-600',
    'bg-rose-600',
  ] as const;

  const index = Math.floor(Math.random() * colors.length);
  return colors[index] ?? 'bg-gray-400';
}
export async function saveMessage(clientId: string, message: Message) {
  const stored = localStorage.getItem(STORAGE_KEY);
  const allMessages = stored ? JSON.parse(stored) : {};
  if (!allMessages[clientId]) allMessages[clientId] = [];
  allMessages[clientId].push(message);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allMessages));
  return message;
}

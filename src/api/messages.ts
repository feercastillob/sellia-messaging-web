import api from './index'
import type { Message } from '@/types/message'

export async function getMessagesByClientId(clientId: number): Promise<Message[]> {
  const endpoints: Record<number, string> = {
    1: '/629e39e8b2d31319081e0650.json',
    2: '/629a8125b2d313190810212f.json',
  }

  const endpoint = endpoints[clientId]
  if (!endpoint) throw new Error('Cliente no tiene conversación asociada.')

  const { data } = await api.get<Message[]>(endpoint)
  return data
}

export interface MessageContent {
  _id: string;
  type: 'text' | 'image' | 'file';
  text: string;
  typeUser: 'User' | 'Client';
  user: string;
  createdAt: string;
  readAt?: string;
  updatedAt?: string;
  /**
   * Estado del mensaje:
   * - 'sent': enviado por el usuario
   * - 'delivered': recibido por el cliente
   * - 'read': leído
   */
  status?: 'sent' | 'delivered' | 'read';
}

export interface Message {
  _id: string;
  type: 'Message';
  client: string;
  message: MessageContent;
  createdAt: string;
}

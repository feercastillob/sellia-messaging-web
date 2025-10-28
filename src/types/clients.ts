export interface Client {
  _id: string;
  name: string;
  avatar?: string;
  email?: string;
  channel?: string;
  lastMessage: string;
}

export interface Message {
  id: string;
  type: 'text' | 'image' | 'video' | 'document';
  text?: string;
  buttons?: { text: string }[];
  multimedia?: {
    file: string;
    thumbnail?: string;
    filename?: string;
  };
  typeUser: 'Client' | 'User' | 'UserSystem';
  createdAt: string;
}

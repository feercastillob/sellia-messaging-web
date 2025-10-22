export interface Client {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  // Campos opcionales para la UI (Ejemplo más estetico)
  lastMessage?: string;
  unread?: number;
  color?: string;
}

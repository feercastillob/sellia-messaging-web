import type { Message } from '@/types/message';
import { saveMessage } from '@/api/clients';

const AUTO_MESSAGES = [
  'Hola 👋, ¿cómo estás hoy?',
  '¿Tienes alguna duda sobre tu pedido?',
  'Te comparto la información que pediste 📄',
  'Gracias por tu paciencia 🙏',
  'Estamos revisando tu caso, te aviso en unos minutos ⏳',
  'Excelente, seguimos en contacto 👍',
];

interface SimulatorOptions {
  interval?: number;
  random?: boolean;
  onTyping?: (clientId: string) => void;
  onMessage?: (msg: Message) => void;
}

let timer: number | null = null;
let typingTimer: number | null = null;

export function startSocketSimulator(clientIds: string[], options: SimulatorOptions) {
  stopSocketSimulator();

  const { interval = 10000, random = true, onTyping, onMessage } = options;

  timer = window.setInterval(
    async () => {
      if (!clientIds.length) return;

      const clientId = clientIds[Math.floor(Math.random() * clientIds.length)];
      if (!clientId) return;

      onTyping?.(clientId);

      typingTimer = window.setTimeout(
        async () => {
          const autoMsg: Message = {
            _id: crypto.randomUUID(),
            type: 'Message',
            client: clientId,
            createdAt: new Date().toISOString(),
            message: {
              _id: crypto.randomUUID(),
              type: 'text',
              text:
                AUTO_MESSAGES[Math.floor(Math.random() * AUTO_MESSAGES.length)] ??
                'Mensaje automático',
              typeUser: 'Client',
              user: clientId,
              createdAt: new Date().toISOString(),
              status: 'delivered',
            },
          };

          await saveMessage(clientId, autoMsg);
          onMessage?.(autoMsg);
        },
        2000 + Math.random() * 2000
      );
    },
    random ? interval + Math.random() * interval : interval
  );
}

export function stopSocketSimulator() {
  if (timer) clearInterval(timer);
  if (typingTimer) clearTimeout(typingTimer);
  timer = null;
  typingTimer = null;
}

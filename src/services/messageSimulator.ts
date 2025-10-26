import { useClientsStore } from '@/stores/clients';
import { ref } from 'vue';

export const isTyping = ref(false);

const messages = [
  '¡Hola! ¿Cómo estás?',
  '¿Podrías ayudarme con mi pedido?',
  'Gracias por la información 😄',
  '¿Tienen soporte los fines de semana?',
  'Perfecto, muchas gracias.',
  '¿Puedo cambiar la dirección de entrega?',
  'Estoy teniendo un problema con el pago.',
  '¿Cuánto tardan los envíos normalmente?',
  'He recibido un producto defectuoso.',
  '¡Todo funciona excelente, gracias!',
];

let interval: ReturnType<typeof setInterval> | null = null;
let simulating = false;

export function startMessageSimulation() {
  if (simulating) return;
  simulating = true;

  const chat = useClientsStore();

  interval = setInterval(() => {
    if (!chat.activeClientId) return;

    const msg = messages[Math.floor(Math.random() * messages.length)];
    isTyping.value = true;

    setTimeout(() => {
      chat.receiveMessage({
        id: Date.now().toString(),
        type: 'text',
        text: msg,
        typeUser: 'Client',
        createdAt: new Date().toISOString(),
      });
      isTyping.value = false;
    }, 2000);
  }, 8000);
}

export function stopMessageSimulation() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  simulating = false;
  isTyping.value = false;
}

export function isSimulating() {
  return simulating;
}

import { useClientsStore } from '@/stores/clients';
import { ref } from 'vue';

export const isTyping = ref(false);

const clientMessages = [
  '¡Hola! ¿Podrías ayudarme con algo?',
  'Tengo una duda sobre mi pedido.',
  '¿Cuánto tardan los envíos normalmente?',
  'Perfecto, muchas gracias.',
  '¿Puedo cambiar la dirección de entrega?',
];

const userMessages = [
  '¡Hola! 😊 Claro, ¿podrías darme tu número de pedido?',
  'Enseguida te ayudo con eso.',
  'Sí, los envíos tardan de 2 a 4 días hábiles.',
  'Listo, ya quedó actualizado.',
  '¿Hay algo más con lo que pueda ayudarte?',
];

const systemMessages = [
  '📦 Tu pedido #1234 ha sido enviado.',
  '✅ Tu pago fue confirmado correctamente.',
  '⚙️ Estamos actualizando tu información...',
  '📞 Recuerda que el soporte está disponible de lunes a sábado.',
  '💬 El agente Pedro Naranjo se ha unido a la conversación.',
];

let interval: ReturnType<typeof setInterval> | null = null;
let simulating = false;

function randomDelay(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomMessage<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function startMessageSimulation() {
  if (simulating) return;
  simulating = true;

  const chat = useClientsStore();

  interval = setInterval(
    () => {
      if (!chat.activeClientId) return;

      const typeSelector = Math.random();

      let msgText = '';
      let typeUser: 'Client' | 'User' | 'UserSystem' = 'Client';

      if (typeSelector < 0.5) {
        msgText = randomMessage(clientMessages);
        typeUser = 'Client';
      } else if (typeSelector < 0.8) {
        msgText = randomMessage(userMessages);
        typeUser = 'User';
      } else {
        msgText = randomMessage(systemMessages);
        typeUser = 'UserSystem';
      }

      isTyping.value = typeUser !== 'UserSystem';

      const delay = randomDelay(1500, 3500);

      setTimeout(() => {
        chat.receiveMessage({
          id: Date.now().toString(),
          type: 'text',
          text: msgText,
          typeUser,
          createdAt: new Date().toISOString(),
        });
        isTyping.value = false;
      }, delay);
    },
    randomDelay(6000, 12000),
  );
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

<template>
  <div
    v-if="selectedClient"
    class="flex flex-col flex-1 bg-bg-surface border-l border-border-default transition-colors duration-300"
  >
    <header
      class="flex items-center justify-between px-5 py-3 border-b border-border-default bg-bg-surface/80 backdrop-blur-md"
    >
      <div class="flex items-center space-x-3">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
          :class="selectedClient.color"
        >
          {{ selectedClient.name.charAt(0).toUpperCase() }}
        </div>
        <div>
          <p class="text-sm font-semibold text-text-default">{{ selectedClient.name }}</p>
          <p class="text-xs text-text-secondary">Activo ahora</p>
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <ThemeToggle />
        <button
          @click="logout"
          class="px-3 py-1.5 rounded-md text-sm bg-error/80 text-white hover:bg-error transition-all"
        >
          Salir
        </button>
      </div>
    </header>

    <!-- 🔹 MENSAJES -->
    <main
      ref="chatContainer"
      class="flex-1 overflow-y-auto p-5 space-y-6 bg-bg-default transition-colors duration-300"
    >
      <template v-for="(group, index) in groupedMessages" :key="index">
        <!-- 🔹 SEPARADOR DE FECHA -->
        <div class="flex justify-center my-3">
          <span
            class="text-xs px-3 py-1 bg-bg-surface border border-border-default rounded-full text-text-secondary"
          >
            {{ formatDateSeparator(group.date) }}
          </span>
        </div>

        <!-- 🔹 MENSAJES -->
        <div
          v-for="msg in group.messages"
          :key="msg._id"
          class="flex w-full"
          :class="{
            'justify-end': msg.message.typeUser === 'User' || msg.message.typeUser === 'UserSystem',
            'justify-start': msg.message.typeUser === 'Client',
            'justify-center': msg.message.typeUser === 'System',
          }"
        >
          <!-- 🧍 Avatar + Nombre (solo para Cliente o Agente) -->
          <template v-if="msg.message.typeUser !== 'System'">
            <div
              v-if="msg.message.typeUser === 'Client'"
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
              :class="selectedClient.color"
            >
              {{ selectedClient.name.charAt(0).toUpperCase() }}
            </div>
            <div
              v-else-if="msg.message.typeUser === 'User'"
              class="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-sm font-semibold text-secondary"
            >
              A
            </div>
          </template>

          <div
            :class="[
              'max-w-[75%] p-2 rounded-2xl shadow-sm break-words',
              msg.message.typeUser === 'User'
                ? 'bg-primary text-white rounded-br-none'
                : msg.message.typeUser === 'Client'
                  ? 'bg-bg-surface text-text-default rounded-bl-none'
                  : 'bg-border/40 text-text-secondary text-center italic rounded-xl w-fit mx-auto',
            ]"
          >
            <!-- 🔹 Nombre encima (si aplica) -->
            <p
              v-if="msg.message.typeUser === 'Client'"
              class="text-[11px] text-primary font-semibold mb-1"
            >
              {{ selectedClient.name }}
            </p>
            <p
              v-else-if="msg.message.typeUser === 'User'"
              class="text-[11px] text-secondary font-semibold mb-1"
            >
              Agente
            </p>

            <!-- 🔹 TEXTOS -->
            <div
              v-if="msg.message.type === 'text'"
              class="text-sm leading-snug whitespace-pre-line"
              v-html="parseMessage(msg.message.text)"
            ></div>

            <!-- 🔹 IMÁGENES -->
            <div
              v-else-if="msg.message.type === 'image' && msg.message.multimedia?.file"
              class="relative mt-1"
            >
              <img
                :src="resolveMediaUrl(msg.message.multimedia.file)"
                alt="Imagen"
                class="rounded-lg w-[180px] h-[180px] object-cover cursor-pointer"
                @click="openPreview(msg.message.multimedia.file)"
              />
            </div>

            <!-- 🔹 VIDEOS -->
            <div
              v-else-if="msg.message.type === 'video' && msg.message.multimedia?.file"
              class="mt-1 rounded-lg overflow-hidden max-w-[220px]"
            >
              <video
                :src="resolveMediaUrl(msg.message.multimedia.file)"
                controls
                class="rounded-lg w-full h-auto max-h-[200px] object-cover"
              ></video>
            </div>

            <!-- 🔹 DOCUMENTOS -->
            <div
              v-else-if="msg.message.type === 'document' && msg.message.multimedia?.file"
              class="flex items-center space-x-3 mt-1 bg-bg-surface/40 p-2 rounded-lg border border-border-default"
            >
              <div class="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-md">
                📄
              </div>
              <div class="flex-1 text-xs">
                <p class="font-semibold truncate">
                  {{ msg.message.multimedia.originalname || 'Documento' }}
                </p>
                <p class="text-[11px] text-text-secondary">
                  {{ formatFileSize(msg.message.multimedia.size || 0) }}
                </p>
                <a
                  :href="resolveMediaUrl(msg.message.multimedia.file)"
                  target="_blank"
                  class="text-primary underline text-[11px]"
                >
                  Abrir archivo
                </a>
              </div>
            </div>

            <!-- 🔹 TIMESTAMP + ESTADO -->
            <div class="flex items-center justify-end mt-1 space-x-1 text-[10px] opacity-70">
              <span>{{ formatTime(msg.message.createdAt) }}</span>
              <span v-if="msg.message.status" class="ml-1">
                <span v-if="msg.message.status === 'sent'">✔</span>
                <span v-else-if="msg.message.status === 'delivered'">✔✔</span>
                <span v-else-if="msg.message.status === 'error'">⚠</span>
              </span>
            </div>
          </div>
        </div>
      </template>
      <div
        v-if="previewImage"
        class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-zoom-out"
        @click="closePreview"
      >
        <img
          :src="resolveMediaUrl(previewImage)"
          class="max-w-[90%] max-h-[90%] rounded-xl shadow-lg object-contain"
        />
      </div>
    </main>

    <footer class="border-t border-border-default bg-bg-surface p-4 flex items-center space-x-3">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Escribe un mensaje..."
        class="flex-1 px-4 py-2 rounded-full bg-bg-default text-text-default border border-border-default focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        @keyup.enter="sendMessage"
      />
      <button
        @click="sendMessage"
        class="bg-primary hover:bg-primary/90 text-text-default rounded-full px-4 py-2 font-medium transition-all"
      >
        Enviar
      </button>
    </footer>
  </div>

  <!-- 🔹 PLACEHOLDER -->
  <div
    v-else
    class="flex flex-1 items-center justify-center text-text-secondary bg-bg-surface border-l border-border-default"
  >
    <p class="text-lg opacity-70">Selecciona un cliente para comenzar a chatear 💬</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, nextTick, watch, computed } from 'vue';
  import ThemeToggle from '@/components/atoms/themes/ThemeToggle.vue';
  import type { Client } from '@/types/client';
  import type { Message } from '@/types/message';

  const props = defineProps<{
    selectedClient: Client | null;
    messages: Message[];
  }>();

  const emit = defineEmits<{
    (e: 'logout'): void;
    (e: 'send-message', message: Message): void;
    (e: 'button-click', label: string): void;
  }>();

  const newMessage = ref('');
  const chatContainer = ref<HTMLElement | null>(null);

  watch(
    () => props.messages,
    async () => {
      await nextTick();
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    },
    { deep: true }
  );

  function formatTime(date: string) {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  /**
   * Convierte el texto del mensaje en HTML seguro
   * - Respeta etiquetas HTML ya existentes
   * - Convierte saltos de línea a <br>
   * - Transforma [Opción] en botones interactivos
   */
  function parseMessage(text: string): string {
    if (!text) return '';
    // Escapar texto básico y conservar HTML permitido
    let parsed = text.replace(/\n/g, '<br>');

    // Detecta los botones estilo [Texto]
    parsed = parsed.replace(
      /\[([^\]]+)\]/g,
      (_, label) =>
        `<button class="inline-flex items-center px-3 py-1 mx-1 mt-1 text-sm rounded-full bg-bg-surface border border-border-default hover:bg-primary/20 transition-all" onclick="window.dispatchEvent(new CustomEvent('chat-btn-click', { detail: '${label}' }))">${label}</button>`
    );

    return parsed;
  }

  function resolveMediaUrl(file?: string): string {
    if (!file) return '';
    // Si ya es una URL completa (https:// o data:), la devolvemos
    if (/^https?:\/\//.test(file) || file.startsWith('data:')) return file;

    // Si empieza con "//", agregamos https:
    if (file.startsWith('//')) return `https:${file}`;

    // Si es relativa (por ejemplo "/uploads/..."), agregamos el dominio correcto
    const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'https://tuservidor.com';
    return `${baseUrl}${file.startsWith('/') ? '' : '/'}${file}`;
  }

  const previewImage = ref<string | null>(null);

  function openPreview(file: string) {
    previewImage.value = file;
  }

  function closePreview() {
    previewImage.value = null;
  }

  // Escuchar clics de botones en los mensajes
  window.addEventListener('chat-btn-click', (e) => {
    const event = e as CustomEvent<string>;
    emit('button-click', event.detail);
  });

  function sendMessage() {
    const text = newMessage.value.trim();
    if (!text || !props.selectedClient) return;

    const message: Message = {
      _id: crypto.randomUUID(),
      type: 'Message',
      client: props.selectedClient._id,
      createdAt: new Date().toISOString(),
      message: {
        _id: crypto.randomUUID(),
        type: 'text',
        text,
        typeUser: 'User',
        user: 'agent-id',
        errorCode: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    emit('send-message', message);
    newMessage.value = '';
  }

  function logout() {
    localStorage.removeItem('auth');
    emit('logout');
  }
  // Agrupar mensajes por día
  const groupedMessages = computed(() => {
    const groups: { date: string; messages: Message[] }[] = [];
    props.messages.forEach((msg) => {
      const day = new Date(msg.message.createdAt).toDateString();
      const group = groups.find((g) => g.date === day);
      if (group) group.messages.push(msg);
      else groups.push({ date: day, messages: [msg] });
    });
    return groups;
  });

  function formatDateSeparator(dateStr: string) {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Hoy';
    if (date.toDateString() === yesterday.toDateString()) return 'Ayer';

    return date.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' });
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }
</script>

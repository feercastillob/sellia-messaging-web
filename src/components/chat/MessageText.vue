<template>
  <div
    :class="[
      msg.typeUser === 'Client'
        ? 'animate-chat-bubble-left'
        : msg.typeUser === 'User'
          ? 'animate-chat-bubble-right'
          : '',
      bubbleClasses,
    ]"
  >
    <p
      :class="[
        msg.typeUser === 'UserSystem' ? 'text-[11px]' : 'text-chat-body',
        'whitespace-pre-wrap',
      ]"
      v-html="msg.text"
    />

    <div v-if="msg.buttons?.length" class="mt-2 flex flex-wrap gap-1.5">
      <button
        v-for="(btn, i) in msg.buttons"
        :key="i"
        type="button"
        :aria-label="`Botón de mensaje: ${btn.text}`"
        class="border-primary text-primary hover:bg-primary focus-visible:ring-primary rounded-md border px-2 py-0.5 text-[11px] transition hover:text-white focus-visible:ring-2"
      >
        {{ btn.text }}
      </button>
    </div>
    <MessageTime
      v-show="msg.typeUser !== 'UserSystem'"
      :formatted-date="formattedDate"
      align="right"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { Message } from '@/types';

  const props = defineProps<{ msg: Message; formattedDate: string }>();

  const base =
    'relative min-w-[90px] max-w-[70%] px-4 py-2.5 text-[15px] rounded-2xl break-words transition-all duration-200 leading-snug';

  const bubbleClasses = computed(() => {
    switch (props.msg.typeUser) {
      case 'Client':
        return `${base} bubble-left bg-[#e8fddf] text-[#1b1b1b] ml-2 shadow-chat`;
      case 'User':
        return `${base} bubble-right bg-[#2d8cff] text-white ml-auto mr-2 shadow-chat`;
      case 'UserSystem':
        return `max-w-[60%] mx-auto px-4 py-5 text-center text-[11px] font-medium rounded-md
  bg-[color:var(--color-system-bg)]/60 text-[color:var(--color-system-text)]
  backdrop-blur-md shadow-none`;

      default:
        return `${base} bg-chat-surface text-chat-body shadow-chat`;
    }
  });
</script>

<style scoped>
  .shadow-chat {
    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.06),
      0 1px 2px rgba(0, 0, 0, 0.04);
  }

  .bubble-left::after {
    content: '';
    position: absolute;
    bottom: 0.4rem;
    left: -6px;
    width: 16px;
    height: 16px;
    background: #e8fddf;
    border-bottom-right-radius: 14px;
    transform: rotate(40deg);
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05));
  }

  .bubble-right::after {
    content: '';
    position: absolute;
    bottom: 0.4rem;
    right: -6px;
    width: 16px;
    height: 16px;
    background: #2d8cff;
    border-bottom-left-radius: 14px;
    transform: rotate(-40deg);
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05));
  }
</style>

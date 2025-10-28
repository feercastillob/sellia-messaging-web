<template>
  <div :class="wrapperClasses">
    <MessageText
      v-if="msg.type === 'text'"
      class="min-w-[20%] max-w-[70%] rounded-xl object-cover"
      :msg="msg"
      :formatted-date="formattedDate"
    />
    <div
      v-else
      :class="[
        'relative max-w-[60%] min-w-[30%] overflow-hidden rounded-2xl shadow-md transition-all duration-200',
        msg.typeUser === 'User'
          ? 'bg-chat-bubble-user text-chat-bubble-user-text animate-chat-bubble-right ml-auto'
          : 'bg-chat-bubble-client text-chat-bubble-client-text animate-chat-bubble-left mr-auto',
      ]"
    >
      <span
        v-if="msg.typeUser === 'User'"
        class="bg-chat-bubble-user absolute -right-2 bottom-2 h-3 w-3 rotate-45"
      ></span>
      <span v-else class="bg-chat-bubble-client absolute bottom-2 -left-2 h-3 w-3 rotate-45"></span>

      <div class="p-1.5">
        <MessageImage
          v-if="msg.type === 'image' && msg.multimedia"
          :multimedia="msg.multimedia"
          class="max-h-[200px] max-w-[250px] rounded-xl object-cover"
        />
        <MessageDocument
          v-else-if="msg.type === 'document' && msg.multimedia"
          :multimedia="msg.multimedia"
        />
      </div>
      <MessageTime
        :formatted-date="formattedDate"
        :align="msg.typeUser === 'User' ? 'right' : 'left'"
        class="px-2 pb-1 text-xs opacity-70"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { Message } from '@/types';

  const props = defineProps<{ msg: Message }>();

  const formattedDate = computed(() => {
    const date = new Date(props.msg.createdAt);
    return date.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
    });
  });

  const wrapperClasses = computed(() => {
    switch (props.msg.typeUser) {
      case 'User':
        return 'flex justify-end';
      case 'Client':
      case 'UserSystem':
        return 'flex justify-start';
      default:
        return 'flex justify-start';
    }
  });
</script>

<style scoped>
  div[class*='bg-chat-bubble'] {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    transition:
      transform 0.15s ease,
      box-shadow 0.2s ease;
  }

  div[class*='bg-chat-bubble']:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  }

  span.absolute {
    border-radius: 0.2rem;
  }
</style>

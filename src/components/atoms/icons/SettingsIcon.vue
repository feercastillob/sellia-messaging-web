<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="['h-5 w-5', props.class]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.8"
    role="img"
    aria-label="Icono de configuración"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.107c1.543-.894 3.307.87 2.413 2.413a1.724 1.724 0 001.107 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.107 2.573c.894 1.543-.87 3.307-2.413 2.413a1.724 1.724 0 00-2.573 1.107c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.107c-1.543.894-3.307-.87-2.413-2.413a1.724 1.724 0 00-1.107-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.107-2.573c-.894-1.543.87-3.307 2.413-2.413.946.548 2.147.171 2.573-1.107z"
    />
    <circle cx="12" cy="12" r="3" />
  </svg>
</template>

<script setup lang="ts">
  const props = defineProps<{ class?: string }>();
</script>

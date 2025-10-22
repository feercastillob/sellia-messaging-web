<template>
  <div
    :class="[
      'w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg',
      bgColor,
    ]"
  >
    {{ initial }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  bgColor?: string
}>()

const initial = props.name.charAt(0).toUpperCase()
</script>

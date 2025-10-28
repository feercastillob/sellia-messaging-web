<template>
  <button
    class="border-outline bg-surface text-on-surface hover:bg-surface-variant dark:bg-surface dark:hover:bg-surface-variant relative flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none"
    :class="{ 'bg-primary text-on-primary': simulating }"
    aria-label="Simular mensajes automáticos"
    @click="toggleSim"
  >
    <transition name="fade" mode="out-in">
      <component
        :is="simulating ? IconStop : IconRobot"
        :key="simulating ? 'stop' : 'robot'"
        class="h-5 w-5 transition-colors"
      />
    </transition>
  </button>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import IconRobot from '@/components/atoms/icons/IconRobot.vue';
  import IconStop from '@/components/atoms/icons/IconStop.vue';
  import {
    startMessageSimulation,
    stopMessageSimulation,
    isSimulating,
  } from '@/services/messageSimulator';

  const simulating = ref(isSimulating());

  function toggleSim() {
    if (simulating.value) stopMessageSimulation();
    else startMessageSimulation();
    simulating.value = !simulating.value;
  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }
</style>

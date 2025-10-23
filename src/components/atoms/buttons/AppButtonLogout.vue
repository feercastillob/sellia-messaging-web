<template>
  <button
    @click="$emit('logout')"
    class="px-4 py-2 rounded-md text-sm font-medium text-white shadow-sm transition-all duration-200 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2"
    :style="{
      backgroundColor: 'var(--color-error)',
    }"
  >
    Salir
  </button>
</template>

<style scoped>
  button:hover {
    background-color: var(--color-error-hover);
  }
  .dark button:hover {
    background-color: var(--color-error-hover-dark);
  }
</style>

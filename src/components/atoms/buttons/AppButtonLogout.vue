<template>
  <button
    @click="$emit('logout')"
    class="px-3 py-1.5 rounded-md text-sm bg-error/80 text-white hover:bg-error transition-all"
  >
    Salir
  </button>
</template>

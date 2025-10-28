<template>
  <button
    class="bg-error text-on-error hover:bg-error focus:ring-error transform rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:scale-[1.03] focus:ring-2 focus:ring-offset-2 focus:outline-none"
    @click="$emit('logout')"
  >
    Salir
  </button>
</template>

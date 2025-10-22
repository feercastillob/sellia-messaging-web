<script setup lang="ts">
  import { ref } from 'vue';
  // import ClientList from '@/components/organisms/ClientList.vue';
  // import ConversationPanel from '@/components/organisms/ConversationPanel.vue';
  // import ThemeToggle from '@/components/atoms/themes/ThemeToggle.vue';
  // import { type Client, type Message } from '@/types/Chat';

  // Estado del cliente actualmente seleccionado
  // const selectedClient = ref<Client | null>(null);

  // Estado para controlar la visibilidad en móvil: true = lista, false = conversación
  const showClientList = ref(true);

  /**
   * Maneja la selección de un cliente y cambia la vista a la conversación en móvil.
   * @param client - El cliente seleccionado.
   */
  // const handleClientSelect = (client: Client) => {
  //   selectedClient.value = client;
  //   // En móviles, oculta la lista y muestra el panel de conversación
  //   // Usamos una media query simple para la simulación responsive
  //   if (window.innerWidth < 768) {
  //     showClientList.value = false;
  //   }
  // };

  /**
   * Maneja el evento de volver a la lista de clientes (solo visible en móvil).
   */
  // const handleBackToList = () => {
  //   showClientList.value = true;
  // };
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header Fijo con Título y Tema -->
    <header
      class="flex items-center justify-between p-4 bg-white dark:bg-bg-sidebar-dark shadow-md sticky top-0 z-10"
    >
      <h1 class="text-xl font-bold text-primary-light dark:text-primary-dark">Sellia Messenger</h1>
      <!-- <ThemeToggle /> -->
    </header>

    <!-- Contenedor Principal: Lista y Conversación -->
    <main class="flex flex-1 overflow-hidden">
      <!--
        Panel de Lista de Clientes
        - Muestra siempre en escritorio (md:block)
        - Muestra solo cuando showClientList es true en móvil
        - Flex-grow-0 y w-full en móvil; ancho fijo en escritorio
      -->
      <div
        :class="{
          hidden: !showClientList,
          'w-full': showClientList,
          'md:w-80 md:block': true,
        }"
        class="flex-shrink-0 border-r border-gray-200 dark:border-gray-700 bg-bg-sidebar-light dark:bg-bg-sidebar-dark transition-all duration-300 overflow-y-auto"
      >
        <!-- <ClientList
          @select-client="handleClientSelect"
          :selected-client-id="selectedClient?.id || null"
        /> -->
      </div>

      <!--
        Panel de Conversación
        - Oculto en móvil si showClientList es true
        - Muestra siempre en escritorio (md:block)
      -->
      <!-- <div
        :class="{
          hidden: showClientList && !selectedClient,
          'w-full': !showClientList || selectedClient,
          'md:block': true,
        }"
        class="flex-1 transition-all duration-300 flex flex-col bg-bg-default dark:bg-gray-900"
      >
        <ConversationPanel :client="selectedClient" @back-to-list="handleBackToList" />
      </div> -->
    </main>
  </div>
</template>

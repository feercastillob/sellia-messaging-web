Sellia Omnichannel Messaging App - Reto Técnico Frontend

Este proyecto es la solución al Take-Home Coding Challenge para el perfil de Desarrollador Frontend. La aplicación rediseña la plataforma de mensajería omnicanal de Sellia, priorizando la accesibilidad, la ergonomía visual y la adaptabilidad (responsive) para usuarios B2B.

Stack Tecnológico

Framework: Vue 3 (Composition API & <script setup>)

Estilos: Tailwind CSS (con soporte para Modo Oscuro/Claro basado en clases)

Bundler: Vite

Testing: Vitest & Vue Test Utils (Testing Library)

Análisis de código: ESLint

Formato: Prettier

Estructura del Proyecto

Se ha optado por una arquitectura modular, siguiendo el patrón Atomic Design para facilitar la escalabilidad, la reutilización de componentes y la implementación de pruebas unitarias.

src/components/atoms: Componentes UI básicos (Botones, Inputs, Toggle de Tema).

src/components/molecules: Combinaciones de átomos (e.g., Formulario de Login, Item de la Lista de Clientes).

src/components/organisms: Secciones complejas (e.g., Panel Lateral de Clientes, Ventana de Conversación).

src/views/: Contenedores o páginas completas (e.g., Login, MainLayout).

src/composables/: Lógica reutilizable (e.g., useAuth, useTheme).

src/services/: Capa de abstracción para el consumo de APIs.

Scripts Disponibles

Para ejecutar el proyecto:

Comando

Descripción

npm install

Instala todas las dependencias del proyecto.

npm run dev

Inicia el servidor de desarrollo con hot-reloading.

npm run build

Genera los archivos de producción en la carpeta dist.

npm run preview

Previsualiza la build de producción localmente.

npm run test

Ejecuta las pruebas unitarias con Vitest.

npm run lint

Ejecuta ESLint para verificar errores de código.

npm run format

Formatea el código con Prettier.

Credenciales de Acceso Fijas

Para la ventana de Login, se usan las siguientes credenciales simuladas:

Usuario: admin

Contraseña: admin123
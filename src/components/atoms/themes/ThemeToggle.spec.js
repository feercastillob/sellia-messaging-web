import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest'; // 'afterEach' eliminado
import ThemeToggle from '../ThemeToggle.vue';

// Mockear localStorage para Vitest
const localStorageMock = (function () {
  let store = {}; // CORRECCIÓN: Eliminado el tipo explícito TS (Record<string, string>) que confundía al linter JS.
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    // Función para resetear el estado del store entre tests
    _reset: () => {
      store = {};
    },
  };
})();

// Mockear matchMedia para simular preferencia del sistema operativo
// CORRECCIÓN: Eliminado el tipado ': boolean' en el argumento 'matches'
const matchMediaMock = (matches) => ({
  matches: matches,
  addListener: vi.fn(),
  removeListener: vi.fn(),
});

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

beforeEach(() => {
  localStorageMock._reset();
  document.documentElement.classList.remove('dark'); // Limpiar estado del DOM
});

describe('ThemeToggle.vue', () => {
  it('renders IconSun initially if no preference is stored and system prefers light', async () => {
    // Simular que el sistema prefiere el modo claro
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn(() => matchMediaMock(false)),
    });

    const wrapper = mount(ThemeToggle);

    // El tema por defecto debe ser 'light' y el icono debe ser el Sol
    expect(wrapper.vm.currentTheme).toBe('light');
    expect(wrapper.findComponent({ name: 'IconSun' }).exists()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('initializes to dark theme if no preference is stored and system prefers dark', async () => {
    // Simular que el sistema prefiere el modo oscuro
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn(() => matchMediaMock(true)),
    });

    const wrapper = mount(ThemeToggle);

    // El tema debe ser 'dark' y el icono debe ser la Luna
    expect(wrapper.vm.currentTheme).toBe('dark');
    expect(wrapper.findComponent({ name: 'IconMoon' }).exists()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles theme from light to dark on click', async () => {
    // Inicializar en modo claro
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn(() => matchMediaMock(false)),
    });
    const wrapper = mount(ThemeToggle);

    // Estado inicial: Light
    expect(wrapper.vm.currentTheme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Clic para cambiar
    await wrapper.find('button').trigger('click');

    // Estado después del clic: Dark
    expect(wrapper.vm.currentTheme).toBe('dark');
    expect(wrapper.findComponent({ name: 'IconMoon' }).exists()).toBe(true);

    // Verificar que la clase 'dark' fue agregada y se persistió
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('toggles theme from dark to light on click', async () => {
    // Forzar el estado inicial a 'dark' a través de localStorage
    localStorage.setItem('theme', 'dark');
    Object.defineProperty(window, 'matchMedia', {
        value: vi.fn(() => matchMediaMock(false)),
    });

    const wrapper = mount(ThemeToggle);

    // Esperar a que onMounted lea localStorage
    await wrapper.vm.$nextTick();

    // Estado inicial: Dark
    expect(wrapper.vm.currentTheme).toBe('dark');

    // Clic para cambiar
    await wrapper.find('button').trigger('click');

    // Estado después del clic: Light
    expect(wrapper.vm.currentTheme).toBe('light');
    expect(wrapper.findComponent({ name: 'IconSun' }).exists()).toBe(true);

    // Verificar que la clase 'dark' fue removida y se persistió
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });
});

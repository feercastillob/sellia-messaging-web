import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ThemeToggle from '@/components/atoms/toggles/ThemeToggle.vue';

function mockMatchMedia(isDark = false) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: isDark && query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

describe('ThemeToggle.vue', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
    mockMatchMedia(false);
  });

  it('renders correctly', () => {
    const wrapper = mount(ThemeToggle);
    expect(wrapper.exists()).toBe(true);
  });

  it('should apply dark theme by default', () => {
    mount(ThemeToggle);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.theme).toBe('dark');
  });

  it('should respect saved light theme in localStorage', () => {
    localStorage.theme = 'light';
    mount(ThemeToggle);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.theme).toBe('light');
  });

  it('should apply dark theme when system prefers dark', () => {
    mockMatchMedia(true);
    localStorage.clear();
    mount(ThemeToggle);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.theme).toBe('dark');
  });

  it('should toggle theme from dark to light', async () => {
    const wrapper = mount(ThemeToggle);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await wrapper.find('button').trigger('click');

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.theme).toBe('light');
  });

  it('should toggle theme from light to dark', async () => {
    localStorage.theme = 'light';
    document.documentElement.classList.remove('dark');
    const wrapper = mount(ThemeToggle);

    await wrapper.find('button').trigger('click');

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.theme).toBe('dark');
  });
});

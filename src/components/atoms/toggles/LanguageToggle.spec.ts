import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LanguageToggle from '@/components/atoms/toggles/LanguageToggle.vue';
import { createI18n, type Composer } from 'vue-i18n';

describe('LanguageToggle.vue', () => {
  let i18n: ReturnType<typeof createI18n>;

  beforeEach(() => {
    localStorage.clear();
    i18n = createI18n({
      legacy: false,
      locale: 'en',
      messages: {
        en: { hello: 'Hello' },
        es: { hello: 'Hola' },
      },
    });
  });

  it('renders properly', () => {
    const wrapper = mount(LanguageToggle, {
      global: { plugins: [i18n] },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('loads the stored language on mount', async () => {
    localStorage.setItem('lang', 'es');
    const wrapper = mount(LanguageToggle, {
      global: { plugins: [i18n] },
    });

    await wrapper.vm.$nextTick();

    const locale = (i18n.global as unknown as Composer).locale.value;
    expect(locale).toBe('es');
    expect(localStorage.getItem('lang')).toBe('es');
  });

  it('toggles language from ES to EN', async () => {
    localStorage.setItem('lang', 'es');
    const wrapper = mount(LanguageToggle, {
      global: { plugins: [i18n] },
    });

    await wrapper.vm.$nextTick();

    const button = wrapper.find('button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    const locale = (i18n.global as unknown as Composer).locale.value;
    expect(locale).toBe('en');
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('toggles language from EN to ES', async () => {
    localStorage.setItem('lang', 'en');
    const wrapper = mount(LanguageToggle, {
      global: { plugins: [i18n] },
    });

    await wrapper.vm.$nextTick();

    const button = wrapper.find('button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    const locale = (i18n.global as unknown as Composer).locale.value;
    expect(locale).toBe('es');
    expect(localStorage.getItem('lang')).toBe('es');
  });
});

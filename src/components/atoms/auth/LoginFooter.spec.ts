import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import LoginFooter from '@/components/atoms/auth/LoginFooter.vue';

const messages = {
  en: {
    login: {
      testCreds: 'Use test credentials: user@test.com / 123456',
    },
  },
};

describe('LoginFooter.vue', () => {
  const mountWithI18n = () => {
    const i18n = createI18n({
      locale: 'en',
      messages,
    });

    return shallowMount(LoginFooter, {
      global: {
        plugins: [i18n],
      },
    });
  };

  it('renderiza correctamente el texto traducido', () => {
    const wrapper = mountWithI18n();
    expect(wrapper.text()).toContain('Use test credentials');
  });

  it('tiene las clases de estilo esperadas', () => {
    const wrapper = mountWithI18n();
    const footer = wrapper.find('footer');

    expect(footer.classes()).toContain('pt-6');
    expect(footer.classes()).toContain('text-text-secondary');
    expect(footer.classes()).toContain('transition-colors');
  });

  it('usa la etiqueta <footer> con un <p> interno', () => {
    const wrapper = mountWithI18n();
    expect(wrapper.find('footer').exists()).toBe(true);
    expect(wrapper.find('p').exists()).toBe(true);
  });
});

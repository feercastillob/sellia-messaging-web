import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import LoginFooter from '@/components/atoms/auth/LoginFooter.vue';

const messages = {
  en: {
    login: {
      testCreds: 'Use test credentials: {user} / {pass}',
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

  it('renders the translated text correctly', () => {
    const wrapper = mountWithI18n();
    expect(wrapper.text()).toContain('Use test credentials');
  });

  it('applies the expected style classes', () => {
    const wrapper = mountWithI18n();
    const footer = wrapper.find('footer');

    expect(footer.classes()).toContain('py-6');
    expect(footer.classes()).toContain('text-on-surface-variant');
    expect(footer.classes()).toContain('transition-colors');
  });

  it('uses a <footer> tag containing a <p> element', () => {
    const wrapper = mountWithI18n();
    expect(wrapper.find('footer').exists()).toBe(true);
    expect(wrapper.find('p').exists()).toBe(true);
  });
});

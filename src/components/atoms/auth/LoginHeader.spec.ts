import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import LoginHeader from '@/components/atoms/auth/LoginHeader.vue';
import { createI18n } from 'vue-i18n';

describe('LoginHeader', () => {
  const messages = {
    en: {
      login: {
        title: 'Welcome Back',
        subtitle: 'Please sign in to continue',
      },
    },
  };

  const i18n = createI18n({
    locale: 'en',
    messages,
  });

  const mountComponent = () => {
    return shallowMount(LoginHeader, {
      global: {
        plugins: [i18n],
      },
    });
  };

  it('renders the translated title correctly', () => {
    const wrapper = mountComponent();
    const title = wrapper.find('h1');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Welcome Back');
  });

  it('renders the translated subtitle correctly', () => {
    const wrapper = mountComponent();
    const subtitle = wrapper.find('p');
    expect(subtitle.exists()).toBe(true);
    expect(subtitle.text()).toBe('Please sign in to continue');
  });

  it('applies proper Tailwind and CSS classes', () => {
    const wrapper = mountComponent();
    const header = wrapper.find('header');

    expect(header.classes()).toContain('pb-4');
    expect(header.classes()).toContain('text-center');
    expect(header.classes()).toContain('transition-colors');
  });
});

import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppButtonLogout from '@/components/atoms/buttons/AppButtonLogout.vue';

describe('AppButtonLogout.vue', () => {
  it('renders button with correct text', () => {
    const wrapper = shallowMount(AppButtonLogout);
    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Salir');
  });

  it('applies base classes and inline styles correctly', () => {
    const wrapper = shallowMount(AppButtonLogout);
    const button = wrapper.find('button');

    expect(button.classes()).toContain('px-4');
    expect(button.classes()).toContain('py-2');
    expect(button.classes()).toContain('rounded-md');
    expect(button.attributes('style')).toContain('background-color: var(--color-error)');
  });

  it('emits "logout" event when clicked', async () => {
    const wrapper = shallowMount(AppButtonLogout);
    const button = wrapper.find('button');

    await button.trigger('click');
    expect(wrapper.emitted('logout')).toBeTruthy();
  });

  it('has hover and focus transition classes', () => {
    const wrapper = shallowMount(AppButtonLogout);
    const button = wrapper.find('button');

    const classList = button.classes().join(' ');
    expect(classList).toMatch(/hover:scale/);
    expect(classList).toMatch(/focus:ring-2/);
  });
});

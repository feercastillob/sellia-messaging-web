import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppButtonLogout from '@/components/atoms/buttons/AppButtonLogout.vue';

describe('AppButtonLogout.vue', () => {
  const mountButton = () => shallowMount(AppButtonLogout);

  it('renders the button with correct text', () => {
    const wrapper = mountButton();
    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Salir');
  });

  it('emits a "logout" event when clicked', async () => {
    const wrapper = mountButton();
    const button = wrapper.find('button');

    await button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('logout');
    expect(wrapper.emitted('logout')!.length).toBe(1);
  });

  it('applies base classes and transition styles correctly', () => {
    const wrapper = mountButton();
    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);

    const classes = button.classes();

    const expectedClasses = [
      'bg-error',
      'text-on-error',
      'hover:bg-error',
      'focus:ring-error',
      'transform',
      'rounded-md',
      'px-4',
      'py-2',
      'text-sm',
      'font-medium',
      'shadow-sm',
      'transition-all',
      'duration-200',
      'hover:scale-[1.03]',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:outline-none',
    ];

    expectedClasses.forEach((cls) => {
      expect(classes).toContain(cls);
    });
  });
});

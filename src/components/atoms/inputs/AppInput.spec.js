import { describe, it, expect } from 'vitest';
import { shallowMount, mount } from '@vue/test-utils';
import AppInput from '@/components/atoms/inputs/AppInput.vue';
import { Eye, EyeOff } from 'lucide-vue-next';

describe('AppInput.vue', () => {
  it('renders label and input correctly', () => {
    const wrapper = shallowMount(AppInput, {
      props: { label: 'Email', modelValue: '' },
    });

    const label = wrapper.find('label');
    const input = wrapper.find('input');

    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Email');
    expect(input.exists()).toBe(true);
    expect(input.attributes('type')).toBe('text');
  });

  it('binds modelValue and emits updates', async () => {
    const wrapper = mount(AppInput, {
      props: { label: 'Name', modelValue: '' },
    });

    const input = wrapper.find('input');
    await input.setValue('Fergie');

    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toBeTruthy();
    expect(emitted?.[0]).toEqual(['Fergie']);
  });

  it('applies correct styles for error, success, and disabled states', async () => {
    const wrapper = shallowMount(AppInput, {
      props: { label: 'User', state: 'error', modelValue: '' },
    });

    expect(
      wrapper
        .find('input')
        .classes()
        .some((c) => c.includes('border-error')),
    ).toBe(true);

    await wrapper.setProps({ state: 'success' });
    expect(
      wrapper
        .find('input')
        .classes()
        .some((c) => c.includes('border-success')),
    ).toBe(true);

    await wrapper.setProps({ state: 'disabled' });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('shows and hides password when toggling', async () => {
    const wrapper = mount(AppInput, {
      props: { label: 'Password', type: 'password', modelValue: '' },
    });

    const button = wrapper.find('button');
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('password');
    expect(wrapper.findComponent(Eye).exists()).toBe(true);
    await button.trigger('click');
    expect(wrapper.findComponent(EyeOff).exists()).toBe(true);
    expect(input.attributes('type')).toBe('text');
  });

  it('renders message and applies color based on state', async () => {
    const wrapper = shallowMount(AppInput, {
      props: { label: 'Email', message: 'Campo requerido', state: 'error' },
    });

    const msg = wrapper.find('p');
    expect(msg.exists()).toBe(true);
    expect(msg.text()).toBe('Campo requerido');
    expect(msg.classes()).toContain('text-error');

    await wrapper.setProps({ state: 'success', message: 'Todo correcto' });
    expect(wrapper.find('p').classes()).toContain('text-success');
  });

  it('sets proper aria attributes for accessibility', () => {
    const wrapper = shallowMount(AppInput, {
      props: { label: 'Username', message: 'Obligatorio', state: 'error' },
    });

    const input = wrapper.find('input');
    expect(input.attributes('aria-invalid')).toBe('true');
    expect(input.attributes('aria-describedby')).toContain('input-username-message');
  });
});

import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppButton from '@/components/atoms/buttons/AppButton.vue';

describe('AppButton', () => {
  const mountComponent = (props = {}, slots = { default: 'Click Me' }) => {
    return shallowMount(AppButton, {
      props,
      slots,
    });
  };

  it('renders slot content correctly', () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain('Click Me');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mountComponent();
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mountComponent({ disabled: true });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
    expect(wrapper.classes()).toContain('cursor-not-allowed');
  });

  it('does not emit click when loading', async () => {
    const wrapper = mountComponent({ loading: true });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
    expect(wrapper.classes()).toContain('opacity-60');
  });

  it('sets the correct button type', () => {
    const wrapper = mountComponent({ type: 'submit' });
    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('applies primary variant by default', () => {
    const wrapper = mountComponent();
    const classes = wrapper.classes().join(' ');
    expect(classes).toMatch(/bg-primary/);
    expect(classes).toMatch(/text-white|text-secondary/);
  });

  it('applies secondary variant correctly', () => {
    const wrapper = mountComponent({ variant: 'secondary' });
    const classes = wrapper.classes().join(' ');
    expect(classes).toMatch(/border-border/);
    expect(classes).toMatch(/text-text-secondary/);
  });

  it('applies danger variant correctly', () => {
    const wrapper = mountComponent({ variant: 'danger' });
    const classes = wrapper.classes().join(' ');
    expect(classes).toMatch(/bg-error/);
    expect(classes).toMatch(/text-white/);
  });

  it('applies naked variant correctly', () => {
    const wrapper = mountComponent({ variant: 'naked' });
    const classes = wrapper.classes().join(' ');
    expect(classes).toMatch(/bg-transparent/);
    expect(classes).toMatch(/text-primary/);
  });

  it('applies size classes correctly', () => {
    const sm = mountComponent({ size: 'sm' });
    const lg = mountComponent({ size: 'lg' });
    expect(sm.classes()).toContain('py-1.5');
    expect(lg.classes()).toContain('py-3');
  });
});

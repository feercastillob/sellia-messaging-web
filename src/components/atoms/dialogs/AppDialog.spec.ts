import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppDialog from '@/components/atoms/dialogs/AppDialog.vue';

describe('AppDialog.vue', () => {
  const defaultProps = {
    title: 'Test Title',
    message: 'This is a test message',
  };

  it('renders the modal with provided title and message', () => {
    const wrapper = shallowMount(AppDialog, { props: defaultProps });

    expect(wrapper.text()).toContain(defaultProps.title);
    expect(wrapper.text()).toContain(defaultProps.message);
  });

  it('contains a button labeled "Aceptar"', () => {
    const wrapper = shallowMount(AppDialog, { props: defaultProps });
    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Aceptar');
  });

  it('emits "close" event when the button is clicked', async () => {
    const wrapper = shallowMount(AppDialog, { props: defaultProps });
    const button = wrapper.find('button');

    await button.trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('applies base layout and style classes correctly', () => {
    const wrapper = shallowMount(AppDialog, { props: defaultProps });
    const container = wrapper.find('div');

    expect(container.classes()).toContain('fixed');
    expect(container.classes()).toContain('inset-0');
    expect(container.classes()).toContain('flex');
    expect(container.classes()).toContain('items-center');
    expect(container.classes()).toContain('justify-center');
  });

  it('includes animation class "animate-pop"', () => {
    const wrapper = shallowMount(AppDialog, { props: defaultProps });
    const modalBox = wrapper.find('.animate-pop');

    expect(modalBox.exists()).toBe(true);
  });
});

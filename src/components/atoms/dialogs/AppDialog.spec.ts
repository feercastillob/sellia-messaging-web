import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AppDialog from '@/components/atoms/dialogs/AppDialog.vue';

const AppButtonStub = {
  template: '<button @click="$emit(\'click\')"><slot /></button>',
};

describe('AppDialog.vue', () => {
  const defaultProps = {
    title: 'Test Title',
    message: 'This is a test message',
  };

  const mountDialog = (props = defaultProps) =>
    shallowMount(AppDialog, {
      props,
      global: {
        stubs: {
          AppButton: AppButtonStub,
        },
      },
    });

  it('renders the title and message correctly', () => {
    const wrapper = mountDialog();

    expect(wrapper.text()).toContain(defaultProps.title);
    expect(wrapper.text()).toContain(defaultProps.message);
  });

  it('contains a button labeled "Aceptar"', () => {
    const wrapper = mountDialog();
    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Aceptar');
  });

  it('emits the "close" event when the button is clicked', async () => {
    const wrapper = mountDialog();
    const appButton = wrapper.findComponent(AppButtonStub);

    await appButton.vm.$emit('click');

    expect(wrapper.emitted()).toHaveProperty('close');
    expect(wrapper.emitted('close')!.length).toBe(1);
  });

  it('applies the base layout classes correctly', () => {
    const wrapper = mountDialog();
    const container = wrapper.find('div');

    const expectedClasses = ['fixed', 'inset-0', 'flex', 'items-center', 'justify-center'];
    expectedClasses.forEach((cls) => {
      expect(container.classes()).toContain(cls);
    });
  });

  it('includes the animation class "animate-pop"', () => {
    const wrapper = mountDialog();
    const modalBox = wrapper.find('.animate-pop');

    expect(modalBox.exists()).toBe(true);
  });

  it('applies the correct color classes for the current theme', () => {
    const wrapper = mountDialog();
    const modalBox = wrapper.find('.animate-pop');

    expect(modalBox.classes()).toContain('bg-surface');
    expect(modalBox.classes()).toContain('text-on-surface');
  });
});

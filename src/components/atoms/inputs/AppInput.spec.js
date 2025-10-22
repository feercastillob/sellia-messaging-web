import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import InputField from '@/components/atoms/InputField.vue';

describe('InputField', () => {
  const mountComponent = (props = {}) => {
    return shallowMount(InputField, {
      props: {
        label: 'Test Field',
        ...props,
      },
    });
  };

  it('renders correctly with label and initial value', () => {
    const wrapper = mountComponent({ modelValue: 'initial', type: 'password' });

    // Verifica que la etiqueta se renderice
    expect(wrapper.find('label').text()).toBe('Test Field');
    // Verifica el tipo y el valor del input
    expect(wrapper.find('input').attributes('type')).toBe('password');
    expect(wrapper.find('input').element.value).toBe('initial');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mountComponent();
    const input = wrapper.find('input');

    // Simula la entrada del usuario
    await input.setValue('new value');

    // Verifica que el evento haya sido emitido con el valor correcto
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value']);
  });

  it('displays the error state classes and message', () => {
    const wrapper = mountComponent({ state: 'error', message: 'Invalid input.' });
    const input = wrapper.find('input');
    const message = wrapper.find('p');

    // Verifica las clases de estado de error (tailwind)
    expect(input.classes()).toContain('border-error');
    // Verifica el mensaje de error
    expect(message.text()).toBe('Invalid input.');
    expect(message.classes()).toContain('text-error');
    // Verifica la accesibilidad
    expect(input.attributes('aria-invalid')).toBe('true');
  });

  it('displays the disabled state classes and sets disabled attribute', () => {
    const wrapper = mountComponent({ disabled: true });
    const input = wrapper.find('input');

    // Verifica el atributo disabled
    expect(input.attributes('disabled')).toBe('');
    // Verifica las clases de estado disabled
    expect(input.classes()).toContain('cursor-not-allowed');
  });

  it('displays the success state classes', () => {
    const wrapper = mountComponent({ state: 'success', message: 'Looks good!' });
    const input = wrapper.find('input');
    const message = wrapper.find('p');

    // Verifica las clases de estado de éxito (tailwind)
    expect(input.classes()).toContain('border-success');
    expect(message.classes()).toContain('text-success');
  });

  it('ensures label and input are linked via ID for accessibility', () => {
    const wrapper = mountComponent({ label: 'User Name' });
    const inputId = wrapper.vm.inputId;

    // Verifica que la etiqueta tenga el atributo 'for' correcto
    expect(wrapper.find('label').attributes('for')).toBe(inputId);
    // Verifica que el input tenga el 'id' correcto
    expect(wrapper.find('input').attributes('id')).toBe(inputId);
  });
});

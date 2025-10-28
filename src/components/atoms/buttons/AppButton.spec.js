import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ButtonPrimary from '@/components/atoms/ButtonPrimary.vue';
import IconSpinner from '@/components/atoms/icons/IconSpinner.vue';

describe('ButtonPrimary', () => {
  const mountComponent = (props = {}) => {
    return shallowMount(ButtonPrimary, {
      props: {
        ...props,
      },
      slots: {
        default: 'Click Me',
      },
    });
  };

  it('renders button slot content correctly', () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain('Click Me');
  });

  it('applies primary variant classes by default', () => {
    const wrapper = mountComponent();
    // Verifica clases de color para la variante primaria
    expect(wrapper.classes()).toContain('bg-primary-light');
    expect(wrapper.classes()).toContain('text-white');
  });

  it('applies secondary variant classes when specified', () => {
    const wrapper = mountComponent({ variant: 'secondary' });
    // Verifica clases de color para la variante secundaria
    expect(wrapper.classes()).toContain('bg-gray-200');
    expect(wrapper.classes()).toContain('text-gray-800');
  });

  it('applies danger variant classes when specified', () => {
    const wrapper = mountComponent({ variant: 'danger' });
    // Verifica clases de color para la variante danger
    expect(wrapper.classes()).toContain('bg-error');
  });

  it('sets the native button type correctly', () => {
    const wrapper = mountComponent({ type: 'submit' });
    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('disables the button when disabled prop is true', () => {
    const wrapper = mountComponent({ disabled: true });
    // Verifica el atributo disabled y clases de estado
    expect(wrapper.attributes('disabled')).toBe('');
    expect(wrapper.classes()).toContain('cursor-not-allowed');
    expect(wrapper.classes()).toContain('opacity-60');
  });

  it('displays loading state and prevents click when loading is true', async () => {
    const wrapper = mountComponent({ loading: true });

    // Verifica el texto de carga y la presencia del spinner
    expect(wrapper.text()).toContain('Cargando...');
    expect(wrapper.findComponent(IconSpinner).exists()).toBe(true);

    // Verifica que el atributo aria-busy esté configurado
    expect(wrapper.attributes('aria-busy')).toBe('true');

    // Intenta emitir un click
    await wrapper.trigger('click');

    // Verifica que el evento 'click' NO fue emitido
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('emits click event when not disabled or loading', async () => {
    const wrapper = mountComponent();

    // Simula el click
    await wrapper.trigger('click');

    // Verifica que el evento 'click' haya sido emitido
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('applies size lg classes when specified', () => {
    const wrapper = mountComponent({ size: 'lg' });
    // Verifica las clases de padding y tamaño de fuente para 'lg'
    expect(wrapper.classes()).toContain('py-3');
    expect(wrapper.classes()).toContain('text-lg');
  });
});

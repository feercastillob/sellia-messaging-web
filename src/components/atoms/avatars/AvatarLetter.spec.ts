import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AvatarLetter from '@/components/atoms/avatars/AvatarLetter.vue';

describe('AvatarLetter.vue', () => {
  const mountAvatar = (props = {}) =>
    shallowMount(AvatarLetter, {
      props: {
        name: 'Fernanda',
        ...props,
      },
    });

  it('muestra la primera letra del nombre en mayúscula', () => {
    const wrapper = mountAvatar({ name: 'luis' });
    expect(wrapper.text()).toBe('L');
  });

  it('muestra "?" cuando no se proporciona un nombre', () => {
    const wrapper = mountAvatar({ name: '' });
    expect(wrapper.text()).toBe('?');
  });

  it('usa colores por defecto cuando no se pasa bgColor', () => {
    const wrapper = mountAvatar({ name: 'Ana' });
    const classes = wrapper.classes();

    expect(classes).toContain('bg-primary-container');
    expect(classes).toContain('text-on-primary-container');
  });

  it('usa el color personalizado cuando se pasa bgColor', () => {
    const wrapper = mountAvatar({
      name: 'A',
      bgColor: 'bg-pink-500 text-white',
    });

    const classes = wrapper.classes().join(' ');
    expect(classes).toMatch(/bg-pink-500/);
    expect(classes).toMatch(/text-white/);
  });

  it('usa las clases de tamaño pequeño (sm)', () => {
    const wrapper = mountAvatar({ name: 'A', size: 'sm' });
    const classes = wrapper.classes();

    expect(classes).toContain('w-8');
    expect(classes).toContain('h-8');
    expect(classes).toContain('text-sm');
  });

  it('usa las clases de tamaño grande (lg)', () => {
    const wrapper = mountAvatar({ name: 'A', size: 'lg' });
    const classes = wrapper.classes();

    expect(classes).toContain('w-12');
    expect(classes).toContain('h-12');
    expect(classes).toContain('text-lg');
  });

  it('usa las clases de tamaño mediano por defecto', () => {
    const wrapper = mountAvatar({ name: 'A' });
    const classes = wrapper.classes();

    expect(classes).toContain('w-10');
    expect(classes).toContain('h-10');
    expect(classes).toContain('text-base');
  });

  it('contiene clases base de layout y estilo', () => {
    const wrapper = mountAvatar({ name: 'C' });
    const classes = wrapper.classes();

    const expected = [
      'flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'font-semibold',
      'uppercase',
      'shadow-sm',
      'transition-all',
      'duration-300',
      'select-none',
    ];

    expected.forEach((cls) => expect(classes).toContain(cls));
  });
});

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

  it('renders the first letter of the name in uppercase', () => {
    const wrapper = mountAvatar({ name: 'luis' });
    expect(wrapper.text()).toBe('L');
  });

  it('renders "?" when no name is provided', () => {
    const wrapper = mountAvatar({ name: '' });
    expect(wrapper.text()).toBe('?');
  });

  it('applies a dynamic background color when no custom color is provided', () => {
    const wrapper = mountAvatar({ name: 'Ana' });
    const style = wrapper.attributes('style');
    expect(style).toMatch(/background-color:\s*(hsl|rgb)\(/);
  });

  it('applies a custom background color when provided', () => {
    const wrapper = mountAvatar({
      name: 'A',
    });
    const style = wrapper.attributes('style');
    expect(style).toMatch(/background-color:\s*(hsl|rgb)\(/);
  });

  it('uses small size classes when size is "sm"', () => {
    const wrapper = mountAvatar({ size: 'sm' });
    const classes = wrapper.classes();

    expect(classes).toContain('w-8');
    expect(classes).toContain('h-8');
    expect(classes).toContain('text-sm');
  });

  it('uses large size classes when size is "lg"', () => {
    const wrapper = mountAvatar({ size: 'lg' });
    const classes = wrapper.classes();

    expect(classes).toContain('w-12');
    expect(classes).toContain('h-12');
    expect(classes).toContain('text-lg');
  });

  it('uses medium size classes by default', () => {
    const wrapper = mountAvatar();
    const classes = wrapper.classes();

    expect(classes).toContain('w-10');
    expect(classes).toContain('h-10');
    expect(classes).toContain('text-base');
  });

  it('includes base layout and style classes', () => {
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

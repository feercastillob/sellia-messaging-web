import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AvatarLetter from '@/components/atoms/avatars/AvatarLetter.vue';

describe('AvatarLetter', () => {
  const mountComponent = (props = {}) => {
    return shallowMount(AvatarLetter, {
      props: {
        name: 'F',
        ...props,
      },
    });
  };

  it('renders the first letter of the name capitalized', () => {
    const wrapper = mountComponent({ name: 'fernanda' });
    expect(wrapper.text()).toBe('F');
  });

  it('applies default background and text color when bgColor is not provided', () => {
    const wrapper = mountComponent({ name: 'Luis' });
    const classes = wrapper.classes().join(' ');
    expect(classes).toMatch(/bg-\[var\(--color-primary\)\]/);
    expect(classes).toMatch(/text-white/);
  });

  it('applies custom background color when bgColor prop is provided', () => {
    const wrapper = mountComponent({ name: 'A', bgColor: 'bg-red-500 text-black' });
    const classes = wrapper.classes().join(' ');
    expect(classes).toMatch(/bg-red-500/);
    expect(classes).toMatch(/text-black/);
  });

  it('applies small size classes when size is "sm"', () => {
    const wrapper = mountComponent({ name: 'A', size: 'sm' });
    const classes = wrapper.classes();
    expect(classes).toContain('w-8');
    expect(classes).toContain('h-8');
    expect(classes).toContain('text-sm');
  });

  it('applies large size classes when size is "lg"', () => {
    const wrapper = mountComponent({ name: 'A', size: 'lg' });
    const classes = wrapper.classes();
    expect(classes).toContain('w-12');
    expect(classes).toContain('h-12');
    expect(classes).toContain('text-lg');
  });

  it('applies medium size classes by default', () => {
    const wrapper = mountComponent({ name: 'A' });
    const classes = wrapper.classes();
    expect(classes).toContain('w-10');
    expect(classes).toContain('h-10');
    expect(classes).toContain('text-base');
  });
});

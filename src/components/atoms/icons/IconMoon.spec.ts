import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import IconMoon from '@/components/atoms/icons/IconMoon.vue';

describe('IconMoon.vue', () => {
  it('renders an SVG element correctly', () => {
    const wrapper = shallowMount(IconMoon);
    const svg = wrapper.find('svg');

    expect(svg.exists()).toBe(true);
    expect(svg.attributes('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svg.attributes('viewBox')).toBe('0 0 24 24');
  });

  it('has correct size classes applied', () => {
    const wrapper = shallowMount(IconMoon);
    const svg = wrapper.find('svg');

    expect(svg.classes()).toContain('w-6');
    expect(svg.classes()).toContain('h-6');
  });

  it('uses currentColor for fill', () => {
    const wrapper = shallowMount(IconMoon);
    const svg = wrapper.find('svg');

    expect(svg.attributes('fill')).toBe('currentColor');
  });

  it('contains a <path> element with correct shape', () => {
    const wrapper = shallowMount(IconMoon);
    const path = wrapper.find('path');

    expect(path.exists()).toBe(true);
    expect(path.attributes('d')).toBe('M21 12.79A9 9 0 0111.21 3 7 7 0 0012 17a7 7 0 009-4.21z');
  });
});

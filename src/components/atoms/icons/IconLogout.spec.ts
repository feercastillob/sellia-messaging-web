import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import IconLogout from '@/components/atoms/icons/IconLogout.vue';

describe('IconLogout.vue', () => {
  it('renders an SVG element correctly', () => {
    const wrapper = shallowMount(IconLogout);
    const svg = wrapper.find('svg');

    expect(svg.exists()).toBe(true);
    expect(svg.attributes('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svg.attributes('viewBox')).toBe('0 0 24 24');
  });

  it('contains a <path> element with correct attributes', () => {
    const wrapper = shallowMount(IconLogout);
    const path = wrapper.find('path');

    expect(path.exists()).toBe(true);
    expect(path.attributes('stroke-linecap')).toBe('round');
    expect(path.attributes('stroke-linejoin')).toBe('round');
    expect(path.attributes('stroke-width')).toBe('2');
  });

  it('applies stroke color using currentColor', () => {
    const wrapper = shallowMount(IconLogout);
    const svg = wrapper.find('svg');

    expect(svg.attributes('stroke')).toBe('currentColor');
  });
});

import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import IconSun from '@/components/atoms/icons/IconSun.vue';

describe('IconSun.vue', () => {
  it('renders the SVG element correctly', () => {
    const wrapper = shallowMount(IconSun);
    const svg = wrapper.find('svg');

    expect(svg.exists()).toBe(true);
    expect(svg.attributes('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svg.attributes('fill')).toBe('none');
    expect(svg.attributes('viewBox')).toBe('0 0 24 24');
    expect(svg.attributes('stroke')).toBe('currentColor');
  });

  it('applies the correct size classes', () => {
    const wrapper = shallowMount(IconSun);
    const svg = wrapper.find('svg');

    expect(svg.classes()).toContain('w-6');
    expect(svg.classes()).toContain('h-6');
  });

  it('renders a path element with expected attributes', () => {
    const wrapper = shallowMount(IconSun);
    const path = wrapper.find('path');

    expect(path.exists()).toBe(true);
    expect(path.attributes('stroke-linecap')).toBe('round');
    expect(path.attributes('stroke-linejoin')).toBe('round');
    expect(path.attributes('stroke-width')).toBe('2');
    expect(path.attributes('d')).toBe(
      'M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m12.728 0L15.95 6.05M6.05 17.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z'
    );
  });
});

import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import IconSpinner from '@/components/atoms/icons/IconSpinner.vue';

describe('IconSpinner.vue', () => {
  const mountComponent = (props = {}) => shallowMount(IconSpinner, { props });

  it('renders an SVG element with proper attributes', () => {
    const wrapper = mountComponent();
    const svg = wrapper.find('svg');

    expect(svg.exists()).toBe(true);
    expect(svg.attributes('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svg.attributes('viewBox')).toBe('0 0 24 24');
    expect(svg.attributes('role')).toBe('status');
    expect(svg.attributes('aria-label')).toBe('loading');
  });

  it('applies animation and default size classes', () => {
    const wrapper = mountComponent();
    const svg = wrapper.find('svg');
    const classes = svg.classes();

    expect(classes).toContain('animate-spin');
    expect(classes).toContain('w-5');
    expect(classes).toContain('h-5');
  });

  it('renders a circle element with correct attributes', () => {
    const wrapper = mountComponent();
    const circle = wrapper.find('circle');

    expect(circle.exists()).toBe(true);
    expect(circle.attributes('cx')).toBe('12');
    expect(circle.attributes('cy')).toBe('12');
    expect(circle.attributes('r')).toBe('10');
    expect(circle.attributes('stroke')).toBe('currentColor');
    expect(circle.attributes('stroke-width')).toBe('4');
  });

  it('renders a path element with the expected shape', () => {
    const wrapper = mountComponent();
    const path = wrapper.find('path');

    expect(path.exists()).toBe(true);
    expect(path.attributes('fill')).toBe('currentColor');
    expect(path.attributes('d')).toBe('M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z');
  });

  it('applies small size classes when size="sm"', () => {
    const wrapper = mountComponent({ size: 'sm' });
    const svg = wrapper.find('svg');

    expect(svg.classes()).toContain('w-4');
    expect(svg.classes()).toContain('h-4');
  });

  it('applies large size classes when size="lg"', () => {
    const wrapper = mountComponent({ size: 'lg' });
    const svg = wrapper.find('svg');

    expect(svg.classes()).toContain('w-8');
    expect(svg.classes()).toContain('h-8');
  });
});

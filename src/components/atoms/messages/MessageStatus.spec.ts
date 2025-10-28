import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MessageStatus from '@/components/atoms/messages/MessageStatus.vue';

describe('MessageStatus.vue', () => {
  const baseDate = new Date('2025-01-01T10:30:00Z').toISOString();

  it('renders formatted time correctly', () => {
    const wrapper = mount(MessageStatus, {
      props: { date: baseDate },
    });

    const timeText = wrapper.find('span').text();
    expect(timeText).toMatch(/\d{1,2}:\d{2}/);
  });

  it('shows single check for sent status', () => {
    const wrapper = mount(MessageStatus, {
      props: { date: baseDate, status: 'sent' },
    });
    expect(wrapper.text()).toContain('✔');
    expect(wrapper.text().match(/✔/g)?.length).toBe(1);
  });

  it('shows double check for delivered status', () => {
    const wrapper = mount(MessageStatus, {
      props: { date: baseDate, status: 'delivered' },
    });
    const checks = wrapper.text().match(/✔/g);
    expect(checks).toHaveLength(2);
  });

  it('shows blue double check for read status', () => {
    const wrapper = mount(MessageStatus, {
      props: { date: baseDate, status: 'read' },
    });
    const span = wrapper.find('.text-primary');
    expect(span.exists()).toBe(true);
    expect(span.text()).toBe('✔✔');
  });

  it('shows error icon for error status', () => {
    const wrapper = mount(MessageStatus, {
      props: { date: baseDate, status: 'error' },
    });
    const span = wrapper.find('.text-error');
    expect(span.exists()).toBe(true);
    expect(span.text()).toBe('⚠');
  });

  it('renders nothing extra if no status provided', () => {
    const wrapper = mount(MessageStatus, {
      props: { date: baseDate },
    });
    expect(wrapper.find('.text-primary').exists()).toBe(false);
    expect(wrapper.find('.text-error').exists()).toBe(false);
  });
});

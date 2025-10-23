import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import AppLogo from '@/components/atoms/branding/AppLogo.vue';

vi.mock('@/assets/images/png/logo_color_sellia.png', () => ({
  default: 'logo_color_sellia.png',
}));
vi.mock('@/assets/images/png/logo_white_sellia.png', () => ({
  default: 'logo_white_sellia.png',
}));

describe('AppLogo.vue', () => {
  let wrapper: VueWrapper<InstanceType<typeof AppLogo>>;
  let observeMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let observerCallback: MutationCallback | undefined;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();

    class MockMutationObserver implements MutationObserver {
      constructor(callback: MutationCallback) {
        observerCallback = callback;
      }
      observe = observeMock;
      disconnect = disconnectMock;
      takeRecords(): MutationRecord[] {
        return [];
      }
    }

    vi.stubGlobal('MutationObserver', MockMutationObserver);
    wrapper = shallowMount(AppLogo);
  });

  afterEach(() => {
    wrapper.unmount();
    vi.unstubAllGlobals();
    document.documentElement.classList.remove('dark');
    observerCallback = undefined;
  });

  it('renders the logo image correctly', () => {
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('alt')).toBe('Sellia Logo');
    expect(img.attributes('draggable')).toBe('false');
  });

  it('uses the color logo by default (light mode)', () => {
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('logo_color_sellia.png');
  });

  it('switches to white logo in dark mode', async () => {
    document.documentElement.classList.add('dark');

    observerCallback?.([], {} as MutationObserver);

    await wrapper.vm.$nextTick();
    const img = wrapper.find('img');

    expect(img.attributes('src')).toBe('logo_white_sellia.png');
  });

  it('calls MutationObserver.observe when mounted', () => {
    expect(observeMock).toHaveBeenCalled();
  });

  it('calls MutationObserver.disconnect when unmounted', () => {
    wrapper.unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });
});

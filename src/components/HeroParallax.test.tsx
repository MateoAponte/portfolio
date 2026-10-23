import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { HeroParallax } from './HeroParallax';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

const mockMotion = (enabled: boolean) => {
  vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: enabled, media: '', onchange: null, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn() });
};

it('keeps the original static artwork when motion is disabled', () => {
  mockMotion(false);
  const { container } = render(<HeroParallax />);
  expect(container.querySelectorAll('img')).toHaveLength(1);
  expect(container.querySelector('img')).toHaveAttribute('src', '/images/hero-workspace.png');
});

it('waits for every layer and bounds travel to prevent exposed edges', () => {
  mockMotion(true);
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ top: -500, bottom: 300, height: 800, width: 1200, left: 0, right: 1200, x: 0, y: -500, toJSON() {} });
  const { container } = render(<HeroParallax />);
  const host = container.firstElementChild as HTMLElement;
  const images = container.querySelectorAll('img');
  expect(images).toHaveLength(4);
  fireEvent.load(images[1]);
  fireEvent.load(images[2]);
  expect(host.style.getPropertyValue('--hero-travel')).toBe('');
  fireEvent.load(images[3]);
  expect(host.style.getPropertyValue('--hero-travel')).toBe('160px');
});

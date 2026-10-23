import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectDetail from './ProjectDetail';

vi.mock('@/components/layout/Header', () => ({ Header: () => null }));
vi.mock('@/components/layout/Footer', () => ({ Footer: () => null }));
vi.mock('@/components/ArchitectureGallery', () => ({ ArchitectureGallery: () => null }));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it('updates the index for short final sections before their titles reach the header', () => {
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
  vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(800);
  const scroll = vi.spyOn(window, 'scrollY', 'get').mockReturnValue(600);
  vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2000);
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    const top = this.id === 'tech-stack' ? 600 : this.id === 'challenges' ? 450 : this.id === 'impact' ? 200 : -300;
    return { top, bottom: top + 300, left: 0, right: 1000, width: 1000, height: 300, x: 0, y: top, toJSON() {} };
  });

  render(<MemoryRouter initialEntries={['/project/ecogiro']}><Routes><Route path="/project/:projectId" element={<ProjectDetail />} /></Routes></MemoryRouter>);

  expect(screen.getByRole('link', { name: 'Impact' })).toHaveAttribute('aria-current', 'location');
  scroll.mockReturnValue(1200);
  fireEvent.scroll(window);
  expect(screen.getByRole('link', { name: 'Tech Stack & Patterns' })).toHaveAttribute('aria-current', 'location');
  expect(screen.getByRole('link', { name: 'Impact' })).not.toHaveAttribute('aria-current');
  scroll.mockReturnValue(600);
  fireEvent.scroll(window);
  expect(screen.getByRole('link', { name: 'Impact' })).toHaveAttribute('aria-current', 'location');
});

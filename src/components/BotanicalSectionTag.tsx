import { SectionTag, type LeafName, type LineName } from '@/components/SectionTagOrnaments';

const ornaments: Record<string, { leaf: LeafName; line: LineName }> = {
  Home: { leaf: 'classic', line: 'waveTriple' },
  Portfolio: { leaf: 'pair', line: 'contour' },
  Skills: { leaf: 'fern', line: 'waveSingle' },
  Approach: { leaf: 'lance', line: 'vine' },
  'My Value': { leaf: 'round', line: 'fade' },
  Contact: { leaf: 'ginkgo', line: 'waveTriple' },
  'Case Study': { leaf: 'pair', line: 'contour' },
  Platform: { leaf: 'pair', line: 'contour' },
  'The Problem': { leaf: 'lance', line: 'waveSingle' },
  Solution: { leaf: 'round', line: 'waveTriple' },
  Process: { leaf: 'fern', line: 'vine' },
  'My Role': { leaf: 'pair', line: 'fade' },
  'Key Tech Decisions': { leaf: 'ginkgo', line: 'contour' },
  Architecture: { leaf: 'fern', line: 'waveSingle' },
  Impact: { leaf: 'round', line: 'fade' },
  'Challenges & Learnings': { leaf: 'lance', line: 'vine' },
  'Tech Stack & Patterns': { leaf: 'classic', line: 'waveTriple' },
};

export const BotanicalSectionTag = ({ label, className = '' }: { label: string; className?: string }) => (
  <SectionTag label={label} {...ornaments[label]} className={'text-[#b9cba3] ' + className} />
);

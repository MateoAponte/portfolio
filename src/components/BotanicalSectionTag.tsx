import { SectionTag, type LeafName, type LineName } from '@/components/SectionTagOrnaments';

const ornaments: Record<string, { leaf: LeafName; line: LineName }> = {
  Home: { leaf: 'classic', line: 'waveTriple' },
  Portfolio: { leaf: 'pair', line: 'contour' },
  Skills: { leaf: 'fern', line: 'waveSingle' },
  Approach: { leaf: 'lance', line: 'vine' },
  'My Value': { leaf: 'round', line: 'fade' },
  Contact: { leaf: 'ginkgo', line: 'waveTriple' },
};

export const BotanicalSectionTag = ({ label, className = '' }: { label: string; className?: string }) => (
  <SectionTag label={label} {...ornaments[label]} className={'text-[#b9cba3] ' + className} />
);

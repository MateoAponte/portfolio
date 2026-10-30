import { useId, type ReactNode } from 'react';

/**
 * Colección de decoraciones botánicas (mismo lenguaje visual).
 * - Todas usan `currentColor`: el color se define con `text-*`.
 * - Todas son decorativas (`pointer-events-none`, `aria-hidden`).
 * - `flip` espeja la pieza para reutilizarla en otra esquina o lado.
 *
 * Ejemplos:
 *   <BranchHero   className="right-0 top-0 h-full text-amber-300/70" />
 *   <ContourWaves className="inset-x-0 bottom-0 w-full text-amber-300/50" />
 *   <Sprig        className="left-6 top-6 h-40 text-amber-300/60" />
 *   <LeafDivider  className="relative mx-auto w-full max-w-xl text-amber-300/60" />
 *   <LeafScatter  className="right-10 top-1/3 w-56 text-amber-300/40" />
 *   <CornerRipples flip="x" className="right-0 top-0 w-72 text-amber-300/50" />
 */

type Flip = 'x' | 'y' | 'xy';
interface DecorProps {
  className?: string;
  flip?: Flip;
}

const FLIP: Record<Flip, string> = {
  x: '-scale-x-100',
  y: '-scale-y-100',
  xy: '-scale-100',
};

/* ---------- piezas compartidas ---------- */

const useUid = () => useId().replace(/:/g, '');

const Base = ({
  viewBox,
  className = '',
  flip,
  children,
}: {
  viewBox: string;
  className?: string;
  flip?: Flip;
  children: ReactNode;
}) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox={viewBox}
    fill="none"
    className={`pointer-events-none absolute select-none ${flip ? FLIP[flip] : ''} ${className}`}
  >
    {children}
  </svg>
);

/** Degradados y la forma de hoja reutilizable (base en 0,0 · punta en 100,0). */
const SharedDefs = ({ u }: { u: string }) => (
  <defs>
    <linearGradient id={`${u}-leaf`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="currentColor" stopOpacity="0.02" />
      <stop offset="1" stopColor="currentColor" stopOpacity="0.2" />
    </linearGradient>
    <radialGradient id={`${u}-glow`} cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stopColor="currentColor" stopOpacity="0.16" />
      <stop offset="1" stopColor="currentColor" stopOpacity="0" />
    </radialGradient>
    <filter id={`${u}-soft`} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.2" />
    </filter>
    <g id={`${u}-lf`} strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M0 0C24-24 70-26 100 0C70 24 24 22 0 0Z"
        fill={`url(#${u}-leaf)`}
        stroke="currentColor"
        strokeWidth="1.1"
        strokeOpacity="0.9"
        vectorEffect="non-scaling-stroke"
      />
      <path d="M0 0Q50-4 100 0" stroke="currentColor" strokeWidth="1" strokeOpacity="0.85" vectorEffect="non-scaling-stroke" />
      <path
        d="M18 -1L36 -12M18 0L36 12M38 -2L58 -16M38 -1L58 14M60 -2L78 -12M60 -1L78 10"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeOpacity="0.5"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </defs>
);

const Leaf = ({ u, x, y, r, s }: { u: string; x: number; y: number; r: number; s: number }) => (
  <use href={`#${u}-lf`} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />
);

const Dots = ({ dots }: { dots: ReadonlyArray<readonly [number, number, number]> }) => (
  <g fill="currentColor">
    {dots.map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y} r={r} opacity={0.35 + (i % 3) * 0.2} />
    ))}
  </g>
);

const Sparkle = ({ x, y, s = 5, o = 0.5 }: { x: number; y: number; s?: number; o?: number }) => (
  <path
    d={`M${x} ${y - s}v${s * 2}M${x - s} ${y}h${s * 2}`}
    stroke="currentColor"
    strokeWidth="0.8"
    strokeLinecap="round"
    opacity={o}
  />
);

/* ---------- 1 · Rama grande (hero / lateral) ---------- */

const BRANCH_LEAVES: ReadonlyArray<readonly [number, number, number, number]> = [
  [162, 426, -5, 0.7],
  [194, 393, -100, 0.85],
  [238, 334, -7, 1.0],
  [250, 322, -118, 0.62],
  [272, 273, -108, 0.8],
  [272, 273, -18, 0.7],
  [302, 209, -66, 0.6],
];

export const BranchHero = ({ className, flip }: DecorProps) => {
  const u = useUid();
  return (
    <Base viewBox="0 0 420 500" className={className} flip={flip}>
      <SharedDefs u={u} />
      <defs>
        <linearGradient id={`${u}-fy`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="500">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.3" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="0.7" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id={`${u}-stem`} gradientUnits="userSpaceOnUse" x1="137" y1="447" x2="302" y2="209">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      <circle cx="250" cy="320" r="190" fill={`url(#${u}-glow)`} />

      <g stroke={`url(#${u}-fy)`} strokeLinecap="round" strokeLinejoin="round">
        <path strokeWidth="0.8" opacity="0.5" d="M-54 436C12 352-6 290 56 238S176 196 188 124 246 52 224-34" />
        <path strokeWidth="1" d="M-30 460C35 374 14 304 79 253S197 211 206 135 267 65 248-30" />
        <path strokeWidth="1.2" d="M-18 483C63 383 43 317 104 270S224 228 230 147 294 66 273-25" />
        <path strokeWidth="1" d="M6 510C92 407 68 337 129 287S251 242 254 158 320 70 297-20" />
        <path strokeWidth="1.2" d="M33 523C116 424 97 350 155 303S276 262 279 174 345 83 321-20" />
        <path strokeWidth="0.9" opacity="0.75" d="M60 538C142 441 122 371 180 321S300 281 305 190 372 100 348-18" />
        <path strokeWidth="0.7" opacity="0.45" d="M88 552C168 459 148 391 205 339S322 300 330 206 398 118 374-16" />
      </g>

      <g strokeLinecap="round">
        <path d="M137 447C224 378 264 295 302 209" stroke="currentColor" strokeOpacity="0.35" strokeWidth="4" filter={`url(#${u}-soft)`} />
        <path d="M137 447C224 378 264 295 302 209" stroke={`url(#${u}-stem)`} strokeWidth="1.8" />
        {BRANCH_LEAVES.map(([x, y, r, s], i) => (
          <Leaf key={i} u={u} x={x} y={y} r={r} s={s} />
        ))}
      </g>

      <Dots dots={[[120, 392, 2.6], [104, 372, 1.8], [318, 252, 2.2], [336, 170, 1.6], [90, 120, 1.4], [352, 96, 1.8]]} />
      <Sparkle x={352} y={40} />
      <Sparkle x={70} y={74} s={4} o={0.35} />
    </Base>
  );
};

/* ---------- 2 · Ondas de contorno (fondo de sección / pie de página) ---------- */

export const ContourWaves = ({ className, flip }: DecorProps) => {
  const u = useUid();
  return (
    <Base viewBox="0 0 600 220" className={className} flip={flip}>
      <defs>
        <linearGradient id={`${u}-fx`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.25" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="0.75" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${u}-fx)`} strokeLinecap="round">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const y = 70 + i * 18;
          return (
            <path
              key={i}
              strokeWidth={i % 2 ? 0.8 : 1.2}
              opacity={1 - i * 0.09}
              d={`M-20 ${y + 36}C110 ${y - 34} 210 ${y + 62} 330 ${y + 12}S520 ${y - 48} 620 ${y - 6}`}
            />
          );
        })}
      </g>
    </Base>
  );
};

/* ---------- 3 · Ramita pequeña (esquinas de tarjetas, acentos) ---------- */

const SPRIG_LEAVES: ReadonlyArray<readonly [number, number, number, number]> = [
  [82, 204, -30, 0.6],
  [97, 164, -119, 0.6],
  [114, 119, -21, 0.55],
  [130, 66, -123, 0.45],
  [140, 20, -78, 0.4],
];

export const Sprig = ({ className, flip }: DecorProps) => {
  const u = useUid();
  return (
    <Base viewBox="0 0 200 260" className={className} flip={flip}>
      <SharedDefs u={u} />
      <circle cx="110" cy="140" r="100" fill={`url(#${u}-glow)`} />
      <path d="M70 250C80 190 120 130 140 20" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
      {SPRIG_LEAVES.map(([x, y, r, s], i) => (
        <Leaf key={i} u={u} x={x} y={y} r={r} s={s} />
      ))}
      <Dots dots={[[60, 214, 1.8], [150, 100, 1.5]]} />
    </Base>
  );
};

/* ---------- 4 · Divisor horizontal con hojas ---------- */

export const LeafDivider = ({ className, flip }: DecorProps) => {
  const u = useUid();
  return (
    <Base viewBox="0 0 600 60" className={className} flip={flip}>
      <SharedDefs u={u} />
      <defs>
        <linearGradient id={`${u}-fx`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.35" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="0.65" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 30H600" stroke={`url(#${u}-fx)`} strokeWidth="1" />
      {/* hojas hacia la izquierda */}
      <Leaf u={u} x={288} y={30} r={152} s={0.5} />
      <Leaf u={u} x={288} y={30} r={-152} s={0.5} />
      <Leaf u={u} x={252} y={30} r={158} s={0.34} />
      <Leaf u={u} x={252} y={30} r={-158} s={0.34} />
      {/* hojas hacia la derecha */}
      <Leaf u={u} x={312} y={30} r={28} s={0.5} />
      <Leaf u={u} x={312} y={30} r={-28} s={0.5} />
      <Leaf u={u} x={348} y={30} r={22} s={0.34} />
      <Leaf u={u} x={348} y={30} r={-22} s={0.34} />
      <circle cx="300" cy="30" r="2.6" fill="currentColor" opacity="0.8" />
    </Base>
  );
};

/* ---------- 5 · Hojas sueltas (detalle flotante) ---------- */

export const LeafScatter = ({ className, flip }: DecorProps) => {
  const u = useUid();
  return (
    <Base viewBox="0 0 300 300" className={className} flip={flip}>
      <SharedDefs u={u} />
      <circle cx="150" cy="150" r="130" fill={`url(#${u}-glow)`} />
      <g stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.8" strokeLinecap="round">
        <path d="M30 230C70 200 100 210 130 170" />
        <path d="M170 120C200 90 240 100 270 60" />
      </g>
      <Leaf u={u} x={60} y={70} r={-24} s={0.9} />
      <Leaf u={u} x={210} y={230} r={-148} s={0.75} />
      <Leaf u={u} x={130} y={170} r={38} s={0.55} />
      <Leaf u={u} x={250} y={110} r={-70} s={0.45} />
      <Leaf u={u} x={90} y={260} r={-40} s={0.4} />
      <Dots dots={[[190, 60, 2], [40, 160, 1.6], [270, 200, 1.8], [150, 40, 1.4]]} />
      <Sparkle x={230} y={170} />
      <Sparkle x={110} y={120} s={4} o={0.35} />
    </Base>
  );
};

/* ---------- 6 · Ondas de esquina (enmarcar secciones/tarjetas) ---------- */

export const CornerRipples = ({ className, flip }: DecorProps) => {
  const u = useUid();
  return (
    <Base viewBox="0 0 300 300" className={className} flip={flip}>
      <SharedDefs u={u} />
      <defs>
        <linearGradient id={`${u}-fd`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="300" y2="300">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.7" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${u}-fd)`} strokeLinecap="round">
        {[80, 120, 160, 200, 240, 280].map((r, i) => (
          <path
            key={r}
            strokeWidth={i % 2 ? 0.8 : 1.2}
            d={`M-10 ${r}C${r * 0.3} ${r * 0.95} ${r * 0.75} ${r * 0.35} ${r} -10`}
          />
        ))}
      </g>
      <Leaf u={u} x={26} y={30} r={40} s={0.7} />
      <Leaf u={u} x={26} y={30} r={80} s={0.55} />
      <Leaf u={u} x={26} y={30} r={4} s={0.5} />
      <Dots dots={[[96, 96, 1.8], [130, 60, 1.4]]} />
    </Base>
  );
};
// Compatibility for existing imports.
export const BotanicalContours = BranchHero;

/** One leaf for the sparse animated page atmosphere. */
export const FloatingLeaf = () => {
  const u = useUid();
  return (
    <Base viewBox="0 0 120 70" className="inset-0 h-full w-full">
      <SharedDefs u={u} />
      <Leaf u={u} x={10} y={42} r={-12} s={1} />
    </Base>
  );
};

import { useId, type ReactNode } from 'react';

/**
 * Ornamentos para tags de sección: 7 hojas (icono) + 8 líneas (adorno).
 * - Usan `currentColor`: el color se define con `text-*`.
 * - Son inline (no absolute): se dimensionan con alto, p. ej. `h-6 w-auto`.
 * - Decorativos: `aria-hidden`.
 *
 * Uso rápido:
 *   <SectionTag label="Portfolio" leaf="classic" line="waveTriple" className="text-emerald-200" />
 *   <SectionTag label="Servicios" leaf="ginkgo" line="vine" linePosition="before" />
 */

interface IconProps {
  className?: string;
}

const NS = { vectorEffect: 'non-scaling-stroke' as const };
const useUid = () => useId().replace(/:/g, '');

const Svg = ({ viewBox, className = '', children }: { viewBox: string; className?: string; children: ReactNode }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    overflow="visible"
    className={`shrink-0 select-none ${className}`}
  >
    {children}
  </svg>
);

/* ---------------- Hojas (viewBox 48×28) ---------------- */

// Formas locales: base (0,0) → punta (100,0)
const SHAPES = {
  almond: 'M0 0C24-24 70-26 100 0C70 24 24 22 0 0Z',
  lance: 'M0 0C30-13 70-15 100 0C70 15 30 13 0 0Z',
  round: 'M0 0C8-30 64-36 100 0C64 36 8 30 0 0Z',
} as const;

const VEINS = {
  almond: 'M16 -1L34 -11M16 0L34 11M38 -2L58 -14M38 -1L58 12M60 -2L78 -10M60 -1L78 8',
  lance: 'M16 -1L32 -6M16 0L32 6M38 -1L56 -8M38 0L56 7M60 -1L78 -6M60 0L78 5',
  round: 'M14 -1L30 -14M14 0L30 14M38 -2L56 -20M38 -1L56 18M62 -2L78 -14M62 -1L78 12',
} as const;

const LeafG = ({
  shape = 'almond',
  t,
  veins = true,
}: {
  shape?: keyof typeof SHAPES;
  t: string;
  veins?: boolean;
}) => (
  <g transform={t}>
    <path d={SHAPES[shape]} fill="currentColor" fillOpacity="0.08" {...NS} />
    <path d="M-12 5Q-5 2 0 0M0 0Q50-4 100 0" {...NS} />
    {veins && <path d={VEINS[shape]} strokeOpacity="0.55" strokeWidth="0.7" {...NS} />}
  </g>
);

const Mini = ({ x, y, r, s }: { x: number; y: number; r: number; s: number }) => (
  <path d={SHAPES.almond} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} fill="currentColor" fillOpacity="0.12" {...NS} />
);

/** 1 · Clásica: hoja inclinada con nervadura y venas (la de tu tag) */
export const LeafClassic = ({ className }: IconProps) => (
  <Svg viewBox="0 0 48 28" className={className}>
    <LeafG t="translate(4 23) rotate(-25) scale(.44)" />
  </Svg>
);

/** 2 · Lanceolada: hoja alargada y esbelta */
export const LeafLance = ({ className }: IconProps) => (
  <Svg viewBox="0 0 48 28" className={className}>
    <LeafG shape="lance" t="translate(3 23) rotate(-20) scale(.46)" />
  </Svg>
);

/** 3 · Redonda: hoja ancha tipo eucalipto */
export const LeafRound = ({ className }: IconProps) => (
  <Svg viewBox="0 0 48 28" className={className}>
    <LeafG shape="round" t="translate(5 22) rotate(-28) scale(.4)" />
  </Svg>
);

/** 4 · Par: dos hojas brotando del mismo punto */
export const LeafPair = ({ className }: IconProps) => (
  <Svg viewBox="0 0 48 28" className={className}>
    <LeafG t="translate(8 25) rotate(-60) scale(.26)" veins={false} />
    <LeafG t="translate(8 25) rotate(-22) scale(.4)" />
  </Svg>
);

/** 5 · Ramita: tallo curvo con hojas alternas */
export const LeafSprig = ({ className }: IconProps) => (
  <Svg viewBox="0 0 48 28" className={className}>
    <path d="M3 23Q20 21 36 11" strokeWidth="1.2" />
    {(
      [
        [11.4, 21.5, 32, 0.16],
        [19.75, 19, -70, 0.18],
        [19.75, 19, 22, 0.16],
        [27.9, 15.5, -75, 0.16],
        [27.9, 15.5, 18, 0.14],
        [36, 11, -38, 0.16],
      ] as const
    ).map(([x, y, r, s], i) => (
      <Mini key={i} x={x} y={y} r={r} s={s} />
    ))}
  </Svg>
);

/** 6 · Helecho: tallo con foliolos pareados */
export const LeafFern = ({ className }: IconProps) => (
  <Svg viewBox="0 0 48 28" className={className}>
    <path d="M3 24Q24 22 45 6" strokeWidth="1.2" />
    {(
      [
        [11.4, 22.6, -13, 0.15],
        [19.8, 20.2, -21, 0.15],
        [28.2, 16.6, -28, 0.13],
        [36.6, 11.8, -34, 0.11],
      ] as const
    ).flatMap(([x, y, a, s], i) => [
      <Mini key={`u${i}`} x={x} y={y} r={a - 48} s={s} />,
      <Mini key={`d${i}`} x={x} y={y} r={a + 48} s={s} />,
    ])}
    <Mini x={45} y={6} r={-40} s={0.11} />
  </Svg>
);

/** 7 · Ginkgo: hoja en abanico */
export const LeafGinkgo = ({ className }: IconProps) => (
  <Svg viewBox="0 0 48 28" className={className}>
    <path d="M24 22C13 21 4 13 4 5C10 8 15 5 24 9C33 5 38 8 44 5C44 13 35 21 24 22Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M24 22V28" strokeWidth="1.2" />
    <path d="M24 22L9 8M24 22L16 7M24 22L24 10M24 22L32 7M24 22L39 8" strokeOpacity="0.55" strokeWidth="0.7" />
  </Svg>
);

/* ---------------- Líneas (viewBox 96×24) ---------------- */

const LVB = '0 0 96 24';

const FadeX = ({ id, stops }: { id: string; stops: ReadonlyArray<readonly [number, number]> }) => (
  <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="96" y2="0">
    {stops.map(([o, a], i) => (
      <stop key={i} offset={o} stopColor="currentColor" stopOpacity={a} />
    ))}
  </linearGradient>
);

/** 1 · Triple onda (como tu tag) */
export const LineWaveTriple = ({ className }: IconProps) => {
  const u = useUid();
  return (
    <Svg viewBox={LVB} className={className}>
      <defs>
        <FadeX id={`${u}-g`} stops={[[0, 0.1], [0.5, 1], [1, 0.1]]} />
      </defs>
      <g stroke={`url(#${u}-g)`}>
        {[6, 12, 18].map((y) => (
          <path key={y} d={`M0 ${y}C16 ${y - 8} 32 ${y + 8} 48 ${y}S80 ${y - 8} 96 ${y}`} />
        ))}
      </g>
    </Svg>
  );
};

/** 2 · Onda simple */
export const LineWaveSingle = ({ className }: IconProps) => {
  const u = useUid();
  return (
    <Svg viewBox={LVB} className={className}>
      <defs>
        <FadeX id={`${u}-g`} stops={[[0, 0], [0.3, 1], [0.7, 1], [1, 0]]} />
      </defs>
      <path d="M0 12Q12 0 24 12T48 12T72 12T96 12" stroke={`url(#${u}-g)`} strokeWidth="1.2" />
    </Svg>
  );
};

/** 3 · Contornos: tres curvas que ascienden */
export const LineContour = ({ className }: IconProps) => {
  const u = useUid();
  return (
    <Svg viewBox={LVB} className={className}>
      <defs>
        <FadeX id={`${u}-g`} stops={[[0, 0], [0.4, 1], [1, 0.2]]} />
      </defs>
      <g stroke={`url(#${u}-g)`}>
        {[24, 19, 14].map((a, i) => (
          <path key={a} strokeWidth={i === 1 ? 1.2 : 0.8} d={`M0 ${a}C22 ${a} 30 ${a - 12} 52 ${a - 10}S78 ${a - 4} 96 ${a - 14}`} />
        ))}
      </g>
    </Svg>
  );
};

/** 4 · Línea que se desvanece y termina en punto */
export const LineDot = ({ className }: IconProps) => {
  const u = useUid();
  return (
    <Svg viewBox={LVB} className={className}>
      <defs>
        <FadeX id={`${u}-g`} stops={[[0, 0], [0.85, 1]]} />
      </defs>
      <path d="M0 12H80" stroke={`url(#${u}-g)`} />
      <circle cx="87" cy="12" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="94" cy="12" r="1" fill="currentColor" stroke="none" opacity="0.5" />
    </Svg>
  );
};

/** 5 · Doble línea con rombo */
export const LineDiamond = ({ className }: IconProps) => {
  const u = useUid();
  return (
    <Svg viewBox={LVB} className={className}>
      <defs>
        <FadeX id={`${u}-g`} stops={[[0, 0], [0.8, 1]]} />
      </defs>
      <g stroke={`url(#${u}-g)`}>
        <path d="M0 9H78" />
        <path d="M0 15H78" />
      </g>
      <path d="M84 12L89 7L94 12L89 17Z" fill="currentColor" fillOpacity="0.15" />
    </Svg>
  );
};

/** 6 · Onda punteada */
export const LineDotted = ({ className }: IconProps) => (
  <Svg viewBox={LVB} className={className}>
    <g fill="currentColor" stroke="none">
      {Array.from({ length: 12 }, (_, i) => (
        <circle
          key={i}
          cx={4 + i * 7.6}
          cy={12 + 5 * Math.sin(i * 0.85)}
          r={1.5}
          opacity={0.25 + 0.75 * (1 - Math.abs(i - 5.5) / 6)}
        />
      ))}
    </g>
  </Svg>
);

/** 7 · Enredadera: línea ondulada con hojitas */
export const LineVine = ({ className }: IconProps) => {
  const u = useUid();
  return (
    <Svg viewBox={LVB} className={className}>
      <defs>
        <FadeX id={`${u}-g`} stops={[[0, 0], [0.3, 1], [1, 0.3]]} />
      </defs>
      <path d="M0 14Q24 6 48 12T96 10" stroke={`url(#${u}-g)`} strokeWidth="1.1" />
      {(
        [
          [12, 10.9, -55, 0.13],
          [24, 9.5, 50, 0.11],
          [36, 9.9, -55, 0.13],
          [60, 14.1, 50, 0.11],
          [72, 14.5, -55, 0.13],
          [84, 13.1, 50, 0.11],
        ] as const
      ).map(([x, y, r, s], i) => (
        <Mini key={i} x={x} y={y} r={r} s={s} />
      ))}
    </Svg>
  );
};

/** 8 · Línea simple con desvanecido en ambos extremos y punto central */
export const LineFade = ({ className }: IconProps) => {
  const u = useUid();
  return (
    <Svg viewBox={LVB} className={className}>
      <defs>
        <FadeX id={`${u}-g`} stops={[[0, 0], [0.3, 0.9], [0.7, 0.9], [1, 0]]} />
      </defs>
      <path d="M0 12H96" stroke={`url(#${u}-g)`} />
      <circle cx="48" cy="12" r="2" fill="currentColor" stroke="none" />
    </Svg>
  );
};

/* ---------------- Registros y tag listo para usar ---------------- */

const LEAVES = {
  classic: LeafClassic,
  lance: LeafLance,
  round: LeafRound,
  pair: LeafPair,
  sprig: LeafSprig,
  fern: LeafFern,
  ginkgo: LeafGinkgo,
} as const;

const LINES = {
  waveTriple: LineWaveTriple,
  waveSingle: LineWaveSingle,
  contour: LineContour,
  dot: LineDot,
  diamond: LineDiamond,
  dotted: LineDotted,
  vine: LineVine,
  fade: LineFade,
} as const;

export type LeafName = keyof typeof LEAVES;
export type LineName = keyof typeof LINES;

export const SectionTag = ({
  label,
  leaf = 'classic',
  line = 'waveTriple',
  linePosition = 'after',
  className = '',
}: {
  label: string;
  leaf?: LeafName;
  line?: LineName | 'none';
  linePosition?: 'before' | 'after';
  className?: string;
}) => {
  const Leaf = LEAVES[leaf];
  const Line = line === 'none' ? null : LINES[line];
  const ln = Line && <Line className="h-6 w-8 sm:h-8 sm:w-28 opacity-70" />;
  return (
    <span className={`inline-flex max-w-full items-center gap-2 sm:gap-3 ${className}`}>
      {linePosition === 'before' && ln}
      <Leaf className="h-7 w-auto sm:h-8" />
      <span className="inline-flex min-h-8 items-center whitespace-nowrap rounded-[4px] border border-[#52664c] bg-[#203128] px-3 py-1 text-[1.125rem] font-semibold leading-tight text-[#d3dfc5]">{label}</span>
      {linePosition === 'after' && ln}
    </span>
  );
};


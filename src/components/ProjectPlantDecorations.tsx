import { useLayoutEffect, useRef, type SVGProps } from 'react';

// Schedule details by where they join the main stem, finishing within one second.
const AnimatedDecoration = (props: SVGProps<SVGSVGElement>) => {
  const ref = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const shapes = [...svg.querySelectorAll<SVGGeometryElement>('path, circle')];
    const stem = shapes[0];
    const rootMatrix = svg.getCTM();
    if (!stem || !rootMatrix) return;
    const inverse = rootMatrix.inverse();
    const length = stem.getTotalLength();
    const samples = Array.from({ length: 101 }, (_, index) => stem.getPointAtLength(length * index / 100));
    shapes.forEach((shape, index) => {
      const matrix = shape.getCTM();
      if (!matrix) return;
      const local = shape.getPointAtLength(0);
      const anchor = new DOMPoint(local.x, local.y).matrixTransform(inverse.multiply(matrix));
      let nearest = 0;
      let distance = Infinity;
      samples.forEach((point, sample) => {
        const next = (anchor.x - point.x) ** 2 + (anchor.y - point.y) ** 2;
        if (next < distance) { distance = next; nearest = sample; }
      });
      shape.setAttribute('pathLength', '1');
      shape.style.setProperty('--draw-delay', index === 0 ? '0ms' : Math.round(nearest * 8) + 'ms');
      shape.style.setProperty('--draw-duration', index === 0 ? '800ms' : '200ms');
    });
  }, []);
  return <svg {...props} ref={ref} focusable="false" />;
};

/**
 * Decoraciones botánicas — line art con currentColor.
 * Misma API que las originales: <X className="..." />
 *
 * Rediseño:
 *  - Hojas con forma de almendra (puntas afiladas) y nervadura central.
 *  - Pecíolos (rabitos) cortos que conectan hoja y tallo.
 *  - Tres pesos de línea: tallo > hoja > nervadura, para dar jerarquía.
 *  - Hojas alternas y de distinto tamaño (más grandes en la base, más chicas hacia la punta).
 *  - Detalles: zarcillos en la enredadera, brotes/capullos en la rama y la ramita.
 */

const STEM = 1.2;
const OFFSHOOT = 1.05;
const LEAF = 1;
const VEIN = 0.7;

const n = (v: number) => Number(v.toFixed(2));

type LeafProps = {
  /** punto de anclaje sobre el tallo */
  x: number;
  y: number;
  /** grados; 0 = derecha, negativo = hacia arriba (sentido SVG) */
  angle: number;
  size?: number;
  /** largo del pecíolo */
  stem?: number;
};

const Leaf = ({ x, y, angle, size = 1, stem = 0 }: LeafProps) => {
  const L = 26 * size;
  const W = 7 * size;

  const outline = `M0 0
    C${n(L * 0.28)} ${n(-W * 1.3)} ${n(L * 0.72)} ${n(-W * 1.1)} ${n(L)} 0
    C${n(L * 0.72)} ${n(W * 1.1)} ${n(L * 0.28)} ${n(W * 1.3)} 0 0Z`;

  return (
    <g
      transform={`translate(${x} ${y}) rotate(${angle})`}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {stem > 0 && <path d={`M0 0H${stem}`} strokeWidth={OFFSHOOT} />}
      <g transform={`translate(${stem} 0)`}>
        <path d={outline} strokeWidth={LEAF} />
        <path
          d={`M${n(L * 0.08)} 0H${n(L * 0.78)}`}
          strokeWidth={VEIN}
          opacity={0.7}
        />
      </g>
    </g>
  );
};

const Bud = ({ x, y, r = 1.8 }: { x: number; y: number; r?: number }) => (
  <circle cx={x} cy={y} r={r} stroke="currentColor" strokeWidth={LEAF} />
);

/* ------------------------------------------------------------------ */
/* TOP LEFT — planta con varias ramificaciones                         */
/* ------------------------------------------------------------------ */
export const BranchDecoration = ({
  className = "",
}: {
  className?: string;
}) => (
  <AnimatedDecoration
    viewBox="0 0 180 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Tallo principal */}
    <path
      d="M8 8
         C24 24 32 43 46 60
         C61 79 78 91 99 105
         C119 118 139 129 160 134"
      stroke="currentColor"
      strokeWidth={STEM}
      strokeLinecap="round"
    />

    {/* Ramal superior */}
    <path
      d="M43 57 C37 42 37 27 43 14"
      stroke="currentColor"
      strokeWidth={OFFSHOOT}
      strokeLinecap="round"
    />
    <Leaf x={43} y={14} angle={-65} />
    <Leaf x={38} y={40} angle={-150} size={0.8} stem={3} />
    <Leaf x={37} y={29} angle={-25} size={0.7} stem={3} />

    {/* Ramal izquierdo */}
    <path
      d="M63 78 C48 76 35 70 25 60"
      stroke="currentColor"
      strokeWidth={OFFSHOOT}
      strokeLinecap="round"
    />
    <Leaf x={25} y={60} angle={-135} />
    <Leaf x={47} y={74} angle={140} size={0.75} stem={3} />
    <Leaf x={40} y={71} angle={-150} size={0.65} stem={3} />

    {/* Ramal medio */}
    <path
      d="M86 97 C83 82 86 68 94 57"
      stroke="currentColor"
      strokeWidth={OFFSHOOT}
      strokeLinecap="round"
    />
    <Leaf x={94} y={57} angle={-54} />
    <Leaf x={84} y={84} angle={-130} size={0.8} stem={3} />
    <Leaf x={87} y={71} angle={-15} size={0.7} stem={3} />

    {/* Ramal inferior */}
    <path
      d="M111 112 C104 116 99 120 97 126"
      stroke="currentColor"
      strokeWidth={OFFSHOOT}
      strokeLinecap="round"
    />
    <Leaf x={97} y={126} angle={108} size={0.8} />
    <Leaf x={104} y={116} angle={30} size={0.6} stem={3} />

    {/* Ramal final */}
    <path
      d="M137 127 C142 118 148 112 158 108"
      stroke="currentColor"
      strokeWidth={OFFSHOOT}
      strokeLinecap="round"
    />
    <Leaf x={158} y={108} angle={-22} size={0.7} />
    <Leaf x={144} y={116} angle={-100} size={0.55} stem={3} />

    {/* Hoja terminal del tallo principal */}
    <Leaf x={160} y={134} angle={15} size={0.6} />
  </AnimatedDecoration>
);

/* ------------------------------------------------------------------ */
/* TOP CENTER — enredadera en curva                                    */
/* ------------------------------------------------------------------ */
export const VineDecoration = ({
  className = "",
}: {
  className?: string;
}) => (
  <AnimatedDecoration
    viewBox="0 0 300 145"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Enredadera principal */}
    <path
      d="M18 4
         C35 25 55 31 79 34
         C105 37 119 51 128 75
         C137 101 151 124 174 126
         C199 128 210 102 216 78
         C222 52 239 34 282 5"
      stroke="currentColor"
      strokeWidth={STEM}
      strokeLinecap="round"
    />

    {/* Hojas (alternas a ambos lados de la curva) */}
    <Leaf x={46} y={26} angle={-60} size={0.8} stem={6} />
    <Leaf x={62} y={31} angle={78} size={0.7} stem={5} />
    <Leaf x={110} y={47} angle={-125} size={0.75} stem={6} />
    <Leaf x={122} y={62} angle={15} size={0.7} stem={5} />
    <Leaf x={146} y={110} angle={150} size={0.7} stem={5} />
    <Leaf x={193} y={121} angle={60} size={0.7} stem={5} />
    <Leaf x={213} y={88} angle={-20} size={0.8} stem={6} />
    <Leaf x={235} y={43} angle={20} size={0.7} stem={5} />
    <Leaf x={259} y={21} angle={-125} size={0.7} stem={5} />

    {/* Zarcillos */}
    <path
      d="M93 37 C94 48 86 54 81 50 C77 46 82 41 86 44"
      stroke="currentColor"
      strokeWidth={VEIN + 0.15}
      strokeLinecap="round"
    />
    <path
      d="M219 67 C208 66 200 58 204 51 C207 46 213 49 211 54"
      stroke="currentColor"
      strokeWidth={VEIN + 0.15}
      strokeLinecap="round"
    />
  </AnimatedDecoration>
);

/* ------------------------------------------------------------------ */
/* BOTTOM RIGHT — una sola ramita                                      */
/* ------------------------------------------------------------------ */
export const TwigDecoration = ({
  className = "",
}: {
  className?: string;
}) => (
  <AnimatedDecoration
    viewBox="0 0 130 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Tallo */}
    <path
      d="M122 145
         C108 128 97 111 88 92
         C77 69 68 50 54 28"
      stroke="currentColor"
      strokeWidth={STEM}
      strokeLinecap="round"
    />

    {/* Hojas alternas, más pequeñas hacia la punta */}
    <Leaf x={103} y={119} angle={-55} size={0.8} stem={5} />
    <Leaf x={94} y={103} angle={-170} size={0.7} stem={5} />
    <Leaf x={80} y={75} angle={-55} size={0.75} stem={5} />
    <Leaf x={72} y={60} angle={-172} size={0.75} stem={5} />
    <Leaf x={64} y={44} angle={-60} size={0.65} stem={5} />

    {/* Hoja terminal */}
    <Leaf x={54} y={28} angle={-120} size={0.75} />

    {/* Brote con capullo */}
    <path
      d="M110 130 C116 128 120 124 121 118"
      stroke="currentColor"
      strokeWidth={OFFSHOOT}
      strokeLinecap="round"
    />
    <Bud x={121} y={115.5} />
  </AnimatedDecoration>
);
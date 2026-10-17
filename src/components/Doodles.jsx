// Small hand-drawn SVG decorations used across the murals. All decorative (aria-hidden).
const INK = '#171717'

const base = (size) => ({ width: size, height: size, viewBox: '0 0 100 100', 'aria-hidden': true, focusable: false })

export function Star({ color = '#FFD447', size = 44, className = '', style }) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path
        d="M50 6 61 38l35 1-28 21 10 34-28-20-28 20 10-34L4 39l35-1z"
        fill={color}
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Burst({ color = '#FFD447', size = 90, className = '', style }) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path
        d="M50 2 58 26 80 10 76 36 98 34 82 52 100 66 76 68 82 92 60 80 50 98 40 80 18 92 24 68 0 66 18 52 2 34 24 36 20 10 42 26z"
        fill={color}
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Arrow({ color = '#FFD447', size = 120, className = '', style, flip = false }) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 140 84"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined, ...style }}
    >
      <path
        d="M6 66C34 14 84 10 124 44"
        fill="none"
        stroke={INK}
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path d="M96 22l32 24-40 8" fill="none" stroke={INK} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 66C34 14 84 10 124 44" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" />
      <path d="M96 22l32 24-40 8" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Squiggle({ color = '#19D3E6', width = 140, className = '', style }) {
  return (
    <svg
      width={width}
      height={width * 0.18}
      viewBox="0 0 140 25"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <path
        d="M3 14c10-14 18 14 28 0s18 14 28 0 18 14 28 0 18 14 28 0 14 8 22 0"
        fill="none"
        stroke={INK}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M3 14c10-14 18 14 28 0s18 14 28 0 18 14 28 0 18 14 28 0 14 8 22 0"
        fill="none"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Crown({ color = '#FF4FA3', size = 44, className = '', style }) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path
        d="M10 78 6 30l22 20 22-34 22 34 22-20-4 48z"
        fill={color}
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Spray-paint blob with drips.
export function Splat({ color = '#FF6B35', size = 260, className = '', style, opacity = 1 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ opacity, ...style }}
    >
      <path
        d="M104 14c26-4 36 16 56 24s34 24 22 48-4 36-26 48-26 8-34 28-26 14-38-4-4-28-22-40-36-14-34-38 20-26 28-44 20-18 48-22z"
        fill={color}
      />
      <rect x="62" y="150" width="9" height="40" rx="4.5" fill={color} />
      <rect x="112" y="156" width="8" height="30" rx="4" fill={color} />
      <rect x="140" y="132" width="7" height="46" rx="3.5" fill={color} />
      <circle cx="30" cy="40" r="6" fill={color} />
      <circle cx="176" cy="26" r="5" fill={color} />
      <circle cx="186" cy="110" r="4" fill={color} />
    </svg>
  )
}

// Hand-drawn cross used to strike out the plans that did not work out.
export function Cross({ color = '#FF4FA3', size = 64, className = '', style }) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M16 18 84 84M84 14 18 86" stroke={INK} strokeWidth="20" strokeLinecap="round" />
      <path d="M16 18 84 84M84 14 18 86" stroke={color} strokeWidth="11" strokeLinecap="round" />
    </svg>
  )
}

export function Tick({ color = '#19D3E6', size = 64, className = '', style }) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M14 54 38 78 88 20" fill="none" stroke={INK} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 54 38 78 88 20" fill="none" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// A deterministic city skyline (no randomness → no hydration/flicker surprises).
const BUILDINGS = [
  [0, 90, 120], [90, 70, 170], [150, 110, 100], [250, 60, 210], [300, 100, 140],
  [390, 80, 180], [460, 70, 110], [520, 110, 200], [620, 70, 130], [680, 90, 160],
  [760, 60, 100], [810, 100, 190], [900, 80, 120], [970, 90, 150],
]

export function Skyline({ color = '#171717', windows = '#FFD447', className = '', style, litEvery = 3 }) {
  return (
    <svg
      viewBox="0 0 1060 260"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      {BUILDINGS.map(([x, w, h], i) => (
        <g key={i}>
          <rect x={x} y={260 - h} width={w} height={h} fill={color} />
          {Array.from({ length: Math.floor(h / 22) }).map((_, r) =>
            Array.from({ length: Math.floor((w - 12) / 18) }).map((__, c) =>
              (r * 7 + c * 3 + i) % litEvery === 0 ? (
                <rect key={`${r}-${c}`} x={x + 8 + c * 18} y={260 - h + 10 + r * 22} width="9" height="11" fill={windows} opacity="0.9" />
              ) : null,
            ),
          )}
        </g>
      ))}
    </svg>
  )
}

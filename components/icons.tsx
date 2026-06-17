/** Shared inline SVG icons — kept identical to the original markup. */

type ArrowSize = 16 | 14 | 12;

const ARROWS: Record<ArrowSize, { viewBox: string; d: string; sw: number }> = {
  16: { viewBox: "0 0 16 16", d: "M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5", sw: 1.5 },
  14: { viewBox: "0 0 14 14", d: "M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11", sw: 1.5 },
  12: { viewBox: "0 0 12 12", d: "M2 6H10M10 6L7 3M10 6L7 9", sw: 1.3 },
};

export function ArrowRight({ size = 14 }: { size?: ArrowSize }) {
  const a = ARROWS[size];
  return (
    <svg
      width={size}
      height={size}
      viewBox={a.viewBox}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={a.d}
        stroke="currentColor"
        strokeWidth={a.sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none">
      <path d="M6 1v5.5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function PrivateIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1" />
      <path d="M2 10c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flex: "none" }}>
      <path
        d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

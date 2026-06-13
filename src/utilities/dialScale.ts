// Single source of truth for how a frequency (Hz) maps to a position on the
// dial. Positions are in "deg-units" where the dial has TURN deg-units per full
// turn and each unit is rendered as `unit * 1.5` CSS degrees.
//
// The note labels (Notes) are placed with `calcAngle`, and the frequency labels
// (Frs) are derived by inverting the exact same bands via `labelForNotch`, so
// the two can never drift out of alignment. To re-tune the dial, only edit the
// `bands` array below.
//
// `max` is the WIDTH of the band in Hz, `k` is the deg-units per Hz (slope).
// A larger `k` spreads that frequency range out across more of the dial.
// Frequencies above the last band fall back to FALLBACK_K.
const bands: { max: number; k: number }[] = [
  { max: 1.5, k: 250 }, // 0-1.5 Hz: 0.02 Hz label step
  { max: 3.5, k: 100 }, // 1.5-5 Hz: 0.05 Hz label step
  { max: 3, k: 50 }, // 5-8 Hz: 0.1 Hz label step
  { max: 4, k: 25 }, // 8-12 Hz: 0.2 Hz label step
  { max: 12, k: 12.5 }, // 12-24 Hz
  { max: 24, k: 10 }, // 24-48 Hz
  { max: 12, k: 5 }, // 48-60 Hz
  { max: 60, k: 2.5 }, // 60-120 Hz
  { max: 80, k: 2 }, // 120-200 Hz
  { max: 520, k: 1 }, // 200-720 Hz
];

const FALLBACK_K = 0.5;
const TURN = 240;

// Frequency (Hz) -> cumulative dial position (deg-units). Monotonic increasing.
const calcAngle = (fr: number) => {
  let remaining = fr;
  return bands.reduce((result, { max, k }, i) => {
    if (remaining <= 0) return result;

    let next = result + (remaining > max ? max : remaining) * k;
    remaining -= max;

    if (i + 1 === bands.length && remaining > 0) next += remaining * FALLBACK_K;
    return next;
  }, 0);
};

// Inverse of `calcAngle`: dial position (deg-units) -> frequency (Hz).
// Can return a negative value for positions that map below 0 Hz.
export const calcFreq = (units: number) => {
  let fr = 0;
  let remaining = units;
  let resolved: number | null = null;

  bands.forEach(({ max, k }) => {
    if (resolved !== null) return;

    const seg = max * k;
    if (remaining > seg) {
      remaining -= seg;
      fr += max;
    } else {
      resolved = fr + remaining / k;
    }
  });

  return resolved ?? fr + remaining / FALLBACK_K;
};

// Given a fixed notch at position `deg` (0..TURN) and the current reading `fr`,
// return the frequency that notch should be labelled with: the value whose dial
// position lands on this notch (modulo a full turn), nearest to the reading.
export const labelForNotch = (deg: number, fr: number) => {
  const a = calcAngle(fr);
  const m = deg + TURN * Math.round((a - deg) / TURN);
  return calcFreq(m);
};

export default calcAngle;

import React from "react";

const W = 12;
const D = Math.PI / 180;
const CF = 48;
const STRIDE = 26;
const HIP = [5.5, 21.2];
const SH = [5.5, 10.4];

const ARDI = {
  hair: "#6a2a5c",
  skin: "#f3b83f",
  skinDark: "#d9a53e",
  shirt: "#3f6fd1",
  shirtDark: "#2f55a8",
  pants: "#1e2a6b",
  pantsDark: "#16205a",
  shoe: "#f4f4f4",
  shoeDark: "#c9d3e0",
  long: false,
};
const GADIS = {
  hair: "#4a2a6e",
  skin: "#f3b83f",
  skinDark: "#d9a53e",
  shirt: "#e8618c",
  shirtDark: "#c24a70",
  pants: "#3a3f7a",
  pantsDark: "#2c3062",
  shoe: "#f4f4f4",
  shoeDark: "#c9d3e0",
  long: true,
};

const legAngles = (p) => {
  const q = ((p % 1) + 1) % 1;
  const f = 28 * Math.cos(2 * Math.PI * q);
  const sw = q >= 0.5 ? (q - 0.5) * 2 : 0;
  const k = 6 + 50 * Math.sin(Math.PI * sw);
  return [f, k];
};

const Leg = ({ f, k, color, shoe }) => (
  <g transform={`translate(${HIP[0]}, ${HIP[1]}) rotate(${-f})`}>
    <rect x="-2.1" y="-2.1" width="4.2" height="11.2" rx="2.1" fill={color} />
    <g transform={`translate(0, 7) rotate(${k})`}>
      <rect x="-1.9" y="-1.9" width="3.8" height="9.2" rx="1.9" fill={color} />
      <g transform={`translate(0, 6) rotate(${f - k})`}>
        <rect x="-1.8" y="-0.4" width="6" height="2.2" rx="1" fill={shoe} />
      </g>
    </g>
  </g>
);

const Arm = ({ up, lo, color, hand }) => (
  <g transform={`translate(${SH[0]}, ${SH[1]}) rotate(${-up})`}>
    <rect x="-1.3" y="-1.3" width="2.6" height="7.6" rx="1.3" fill={color} />
    <g transform={`translate(0, 5) rotate(${-lo})`}>
      <rect x="-1.2" y="-1.2" width="2.4" height="7.4" rx="1.2" fill={color} />
      <circle cx="0" cy="5.4" r="1.5" fill={hand} />
    </g>
  </g>
);

const Person = ({ x, y, flip, c, frame, walk, shift, talking, hold }) => {
  const p = walk ? (((frame % CF) / CF) + (shift || 0)) % 1 : 0;
  const open = talking && Math.floor(frame / 4) % 2 === 0;
  const [fA, kA] = walk ? legAngles(p) : [4, 0];
  const [fB, kB] = walk ? legAngles(p + 0.5) : [-4, 0];
  const fs = 28 * Math.cos(2 * Math.PI * (p % 0.5));
  const bob = walk ? 14.8 * (1 - Math.cos(fs * D)) : open ? -0.5 : 0;
  const cN = Math.cos(2 * Math.PI * (p + 0.5));
  const cF = Math.cos(2 * Math.PI * p);
  const armN = hold ? [25, 50] : walk ? [20 * cN, 14 + 0.5 * Math.max(0, 20 * cN)] : [3, 10];
  const armF = walk ? [20 * cF, 14 + 0.5 * Math.max(0, 20 * cF)] : [-3, 10];
  const lean = walk ? 4 : 0;
  return (
    <g
      transform={`translate(${flip ? x + W : x}, ${y}) scale(${flip ? -1 : 1}, 1)`}
      opacity={1}
      shapeRendering="geometricPrecision"
    >
      <ellipse cx="6" cy="36.2" rx="7" ry="0.8" fill="#000000" opacity="0.25" />
      <g transform={`translate(0, ${bob})`}>
        <Leg f={fB} k={kB} color={c.pantsDark} shoe={c.shoeDark} />
        <Leg f={fA} k={kA} color={c.pants} shoe={c.shoe} />
        <g transform={`rotate(${lean} ${HIP[0]} ${HIP[1]})`}>
          <Arm up={armF[0]} lo={armF[1]} color={c.shirtDark} hand={c.skinDark} />
          {c.long && <rect x="1" y="3.2" width="3.8" height="12" rx="1.8" fill={c.hair} />}
          <rect x="2.2" y="9" width="7.4" height="12.4" rx="1.8" fill={c.shirt} />
          <rect x="1.6" y="10" width="3" height="8.6" rx="1.2" fill={c.shirtDark} />
          <rect x="4.8" y="7.4" width="2.6" height="2" fill={c.skin} />
          <circle cx="6" cy="4.2" r="4.2" fill={c.hair} />
          <circle cx="6.9" cy="4.9" r="3.7" fill={c.skin} />
          <ellipse cx="8.2" cy="1.9" rx="2.3" ry="1.1" fill={c.hair} />
          <circle cx="5.2" cy="5" r="0.8" fill={c.skinDark} />
          <circle cx="8.5" cy="4.4" r="0.55" fill="#1a1c2c" />
          <circle cx="10.5" cy="5.4" r="0.65" fill={c.skin} />
          <rect x="7.6" y="7.2" width="1.9" height={open ? 1.4 : 0.6} rx="0.3" fill="#b13e53" />
          {hold && (
            <g>
              <rect x="11" y="12.2" width="3.6" height="5" rx="0.6" fill="#f4f4f4" />
              <rect x="11" y="13.8" width="3.6" height="1.6" fill="#d63a4a" />
              <rect x={frame % 16 < 8 ? 12 : 13} y="9.2" width="0.7" height="1.8" rx="0.3" fill="#f4f4f4" opacity="0.8" />
            </g>
          )}
          <Arm up={armN[0]} lo={armN[1]} color={c.shirt} hand={c.skin} />
        </g>
      </g>
    </g>
  );
};

export const Cast = ({ frame, duration, male, action, prop }) => {
  const y = 67;
  const walk = action === "jalan";
  const hold = prop === "gelas";
  if (walk) {
    const dx = ((frame - duration) * STRIDE) / CF;
    return (
      <g>
        <Person x={22 + dx} y={y} c={GADIS} frame={frame} walk shift={0.5} talking={!male} hold={hold && !male} />
        <Person x={44 + dx} y={y} c={ARDI} frame={frame} walk shift={0} talking={male} hold={hold && male} />
      </g>
    );
  }
  return (
    <g>
      <Person x={20} y={y} c={ARDI} frame={frame} talking={male} hold={hold && male} />
      <Person x={40} y={y} flip c={GADIS} frame={frame} talking={!male} hold={hold && !male} />
    </g>
  );
};

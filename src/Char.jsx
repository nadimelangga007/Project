import React from "react";
import { Face } from "./Face";

const W = 12;
export const S = 0.85;
const D = Math.PI / 180;
export const CF = 48;
export const STRIDE = 26;
const HIP = [5.5, 21.2];
const SH = [5.5, 10.4];
const SKIN = "#f3b83f";
const SKIN_D = "#d9a53e";

const BAJU = {
  biru: ["#3f6fd1", "#2f55a8"],
  merah: ["#d63a4a", "#a82a38"],
  hijau: ["#38b764", "#257a45"],
  kuning: ["#ffcd75", "#d9a441"],
  ungu: ["#8a4fd1", "#6a3aa8"],
  pink: ["#e8618c", "#c24a70"],
  oranye: ["#ef7d57", "#c9552b"],
  hitam: ["#3a3f52", "#262a3a"],
  putih: ["#f4f4f4", "#c9d3e0"],
  abu: ["#8a93a8", "#6d7a90"],
};
const CELANA = {
  biru: ["#1e2a6b", "#16205a"],
  hitam: ["#2a2d3e", "#1c1f2c"],
  cokelat: ["#7a4e3a", "#5d3a2c"],
  abu: ["#6d7a90", "#566078"],
  hijau: ["#2f6b45", "#235236"],
};
const RAMBUT = {
  hitam: "#2a2030",
  cokelat: "#6b3a2a",
  pirang: "#e0b050",
  merah: "#b13e2a",
  ungu: "#5a2a5c",
  abu: "#b8bcc8",
  biru: "#3a4a9a",
};
const GAYA = ["pendek", "panjang", "kuncir", "botak"];

export const DEFAULT_KARAKTER = [
  { nama: "Ardi", gender: "cowok", baju: "biru", celana: "biru", rambut: "ungu", gaya_rambut: "pendek", aksesori: "tidak" },
  { nama: "Gadis", gender: "cewek", baju: "pink", celana: "biru", rambut: "ungu", gaya_rambut: "panjang", aksesori: "tidak" },
];

const buildChar = (k) => {
  const baju = BAJU[k.baju] || BAJU.biru;
  const cel = CELANA[k.celana] || CELANA.biru;
  const gaya = GAYA.includes(k.gaya_rambut) ? k.gaya_rambut : k.gender === "cewek" ? "panjang" : "pendek";
  return {
    hair: gaya === "botak" ? SKIN : RAMBUT[k.rambut] || RAMBUT.hitam,
    hairStyle: gaya,
    skin: SKIN,
    skinDark: SKIN_D,
    shirt: baju[0],
    shirtDark: baju[1],
    pants: cel[0],
    pantsDark: cel[1],
    shoe: "#f4f4f4",
    shoeDark: "#c9d3e0",
    acc: k.aksesori || "tidak",
    cap: baju[0],
  };
};

const HOLD = {
  gelas: [25, 50],
  pedang: [15, 35],
  payung: [90, 90],
  buku: [20, 60],
  bunga: [15, 35],
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

const PropArt = ({ prop, frame }) => {
  if (prop === "gelas") {
    return (
      <g>
        <rect x="11" y="12.2" width="3.6" height="5" rx="0.6" fill="#f4f4f4" />
        <rect x="11" y="13.8" width="3.6" height="1.6" fill="#d63a4a" />
        <rect x={frame % 16 < 8 ? 12 : 13} y="9.2" width="0.7" height="1.8" rx="0.3" fill="#f4f4f4" opacity="0.8" />
      </g>
    );
  }
  if (prop === "pedang") {
    return (
      <g transform="translate(10.9, 18.7) rotate(-20)">
        <rect x="-0.6" y="-17" width="1.2" height="16" fill="#dfe6ee" />
        <rect x="-0.6" y="-17" width="0.5" height="16" fill="#ffffff" />
        <polygon points="-0.6,-17 0.6,-17 0,-19.2" fill="#dfe6ee" />
        <rect x="-2.4" y="-1.2" width="4.8" height="1.2" fill="#c9a24a" />
        <rect x="-0.7" y="0" width="1.4" height="3" fill="#6b3a2a" />
        <rect x="-0.9" y="3" width="1.8" height="1" fill="#c9a24a" />
      </g>
    );
  }
  if (prop === "payung") {
    return (
      <g transform="translate(10.5, 5)">
        <rect x="-0.3" y="-12" width="0.6" height="14" fill="#6b4a3a" />
        <path d="M-9 -9 Q0 -20 9 -9 Z" fill="#d63a4a" />
        <path d="M-3 -9 Q-1 -16 0 -17 Q1 -16 3 -9 Z" fill="#f4f4f4" />
      </g>
    );
  }
  if (prop === "buku") {
    return (
      <g>
        <rect x="11.2" y="12.2" width="5" height="6.4" fill="#41a6f6" />
        <rect x="11.2" y="12.2" width="0.9" height="6.4" fill="#2f7fc4" />
        <rect x="12.6" y="13.6" width="2.6" height="0.8" fill="#f4f4f4" />
      </g>
    );
  }
  if (prop === "bunga") {
    return (
      <g transform="translate(10.9, 18.7) rotate(-10)">
        <rect x="-0.3" y="-10" width="0.6" height="10" fill="#2f9e57" />
        <rect x="0.3" y="-5" width="2" height="1" fill="#2f9e57" />
        <circle cx="0" cy="-11" r="1.8" fill="#e8618c" />
        <circle cx="0" cy="-11" r="0.7" fill="#ffcd75" />
      </g>
    );
  }
  return null;
};

const Person = ({ x, y, flip, c, frame, wf, walk, shift, talking, expr, prop }) => {
  const p = walk ? (((wf % CF) / CF) + (shift || 0)) % 1 : 0;
  const open = talking && Math.floor(frame / 4) % 2 === 0;
  const [fA, kA] = walk ? legAngles(p) : [4, 0];
  const [fB, kB] = walk ? legAngles(p + 0.5) : [-4, 0];
  const fs = 28 * Math.cos(2 * Math.PI * (p % 0.5));
  const bob = walk ? 14.8 * (1 - Math.cos(fs * D)) : open ? -0.5 : 0;
  const cN = Math.cos(2 * Math.PI * (p + 0.5));
  const cF = Math.cos(2 * Math.PI * p);
  const held = HOLD[prop];
  const armN = held ? held : walk ? [20 * cN, 14 + 0.5 * Math.max(0, 20 * cN)] : [3, 10];
  const armF = walk ? [20 * cF, 14 + 0.5 * Math.max(0, 20 * cF)] : [-3, 10];
  const lean = walk ? 4 : 0;
  const topi = c.acc === "topi" || c.acc === "keduanya";
  const kaca = c.acc === "kacamata" || c.acc === "keduanya";
  return (
    <g
      transform={`translate(${flip ? x + W * S : x}, ${y}) scale(${flip ? -S : S}, ${S})`}
      opacity={1}
      shapeRendering="geometricPrecision"
    >
      <ellipse cx="6" cy="36.2" rx="7" ry="0.8" fill="#000000" opacity="0.25" />
      <g transform={`translate(0, ${bob})`}>
        <Leg f={fB} k={kB} color={c.pantsDark} shoe={c.shoeDark} />
        <Leg f={fA} k={kA} color={c.pants} shoe={c.shoe} />
        <g transform={`rotate(${lean} ${HIP[0]} ${HIP[1]})`}>
          <Arm up={armF[0]} lo={armF[1]} color={c.shirtDark} hand={c.skinDark} />
          {prop === "tas" && (
            <g>
              <rect x="-1.2" y="10.5" width="4.6" height="9" rx="1.4" fill="#d63a4a" />
              <rect x="-1.2" y="13.5" width="4.6" height="1" fill="#a82a38" />
            </g>
          )}
          {c.hairStyle === "panjang" && <rect x="1" y="3.2" width="3.8" height="12" rx="1.8" fill={c.hair} />}
          {c.hairStyle === "kuncir" && (
            <g>
              <rect x="-0.8" y="3.6" width="2.6" height="6.5" rx="1.3" fill={c.hair} />
              <rect x="0.6" y="3.2" width="1.6" height="1.3" fill="#d63a4a" />
            </g>
          )}
          <rect x="2.2" y="9" width="7.4" height="12.4" rx="1.8" fill={c.shirt} />
          <rect x="1.6" y="10" width="3" height="8.6" rx="1.2" fill={c.shirtDark} />
          {prop === "tas" && <rect x="3.4" y="9.5" width="1.3" height="8" fill="#a82a38" />}
          <rect x="4.8" y="7.4" width="2.6" height="2" fill={c.skin} />
          <circle cx="6" cy="4.2" r="4.2" fill={c.hair} />
          <circle cx="6.9" cy="4.9" r="3.7" fill={c.skin} />
          {c.hairStyle !== "botak" && <ellipse cx="8.2" cy="1.9" rx="2.3" ry="1.1" fill={c.hair} />}
          <circle cx="5.2" cy="5" r="0.8" fill={c.skinDark} />
          <circle cx="10.5" cy="5.4" r="0.65" fill={c.skin} />
          <Face expr={expr} open={open} />
          {topi && (
            <g>
              <ellipse cx="5.8" cy="1.6" rx="4.6" ry="2.4" fill={c.cap} />
              <rect x="8.6" y="2.7" width="4.2" height="1" rx="0.4" fill={c.cap} />
            </g>
          )}
          {kaca && (
            <g>
              <rect x="7.2" y="3.3" width="3.2" height="2.4" rx="1" fill="#bfe6ff" fillOpacity="0.45" stroke="#1a1c2c" strokeWidth="0.45" />
              <rect x="4.6" y="4.1" width="2.7" height="0.5" fill="#1a1c2c" />
            </g>
          )}
          <PropArt prop={prop} frame={frame} />
          <Arm up={armN[0]} lo={armN[1]} color={c.shirt} hand={c.skin} />
        </g>
      </g>
    </g>
  );
};

export const Cast = ({ frame, karakter, bicara, ekspresi, reaksi, action, prop, pembawa, walkStart }) => {
  const list = (karakter && karakter.length ? karakter : DEFAULT_KARAKTER).slice(0, 3);
  const chars = list.map(buildChar);
  const n = chars.length;
  const y = 103 - 36 * S;
  const walk = action === "jalan";
  const sp = Math.min(Math.max(Number.isInteger(bicara) ? bicara : 0, 0), n - 1);
  const pbRaw = typeof pembawa === "number" ? pembawa : pembawa === "gadis" ? 1 : 0;
  const pb = Math.min(Math.max(pbRaw, 0), n - 1);
  const has = prop && prop !== "tidak";
  const ex = (i) => (i === sp ? ekspresi : reaksi) || "netral";
  const pr = (i) => (has && i === pb ? prop : "tidak");
  if (walk) {
    const wf = (walkStart || 0) + frame;
    const xs = n === 1 ? [28] : n === 2 ? [40, 18] : [46, 28, 10];
    const sh = [0, 0.5, 0.25];
    return (
      <g>
        {chars.map((c, i) => (
          <Person key={i} x={xs[i]} y={y} c={c} frame={frame} wf={wf} walk shift={sh[i]} talking={i === sp} expr={ex(i)} prop={pr(i)} />
        ))}
      </g>
    );
  }
  const xs = n === 1 ? [30] : n === 2 ? [22, 39] : [13, 31, 49];
  const flips = n === 1 ? [false] : n === 2 ? [false, true] : [false, sp === 0, true];
  return (
    <g>
      {chars.map((c, i) => (
        <Person key={i} x={xs[i]} y={y} flip={flips[i]} c={c} frame={frame} wf={0} talking={i === sp} expr={ex(i)} prop={pr(i)} />
      ))}
    </g>
  );
};

import React, { useContext } from "react";
import { SceneCtx } from "./Weather";
import { S, CF, DEFAULT_KARAKTER, Cast } from "./Char";

const D = Math.PI / 180;
const HIP = [6, 21.5];
const SH = [6, 12];

const PAL = {
  pagi: ["#fff6dc", "#2a2a3a"],
  siang: ["#ffffff", "#2a2a3a"],
  senja: ["#ffe2c8", "#3a2a3a"],
  malam: ["#1d2244", "#e8eef4"],
};

const palBase = (variant, time) => {
  if (variant === "papan") {
    return {
      bg: time === "malam" ? "#1b2b24" : "#2f4a3a",
      ink: "#f2f2e8",
      a1: "#ffe28a",
      a2: "#9fd8ff",
      a3: "#ff9fb8",
      leaf: "none",
      board: "none",
      chalk: "#f2f2e8",
      dark: true,
    };
  }
  const [bg, ink] = PAL[time] || PAL.siang;
  return { bg, ink, a1: "#f2b43a", a2: "#41a6f6", a3: "#e8618c", leaf: "#a8e6b0", board: "#3f6b52", chalk: "#f4f4f4", dark: time === "malam" };
};

const KOMIK = { pagi: "#ffe08a", siang: "#7ec8ff", senja: "#ff9f6e", malam: "#2a2f6e" };

const pal = (variant, time) => {
  if (variant === "komik") {
    return { bg: KOMIK[time] || KOMIK.siang, fill: "#fff6e0", wall: "#ffe3b0", ink: "#111111", moon: "#fff7c2", a1: "#ffd23f", a2: "#3ea6ff", a3: "#ff4f7b", leaf: "#6fd36f", board: "#2f6b52", chalk: "#ffffff", dark: time === "malam", sw: 1.1, clean: true, halftone: true };
  }
  const b = palBase(variant, time);
  return { ...b, fill: b.bg };
};

const Wob = ({ frame }) => (
  <defs>
    <filter id="wob" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed={(Math.floor(frame / 4) % 6) + 1} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="0.9" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
);

const STARS = [[8, 46], [20, 62], [34, 50], [46, 70], [62, 58], [14, 80], [66, 84]];
const CLOUDS = [[6, 54], [34, 66], [52, 56]];

const Sky = ({ P, time, frame, cuaca }) => {
  const gray = cuaca && cuaca !== "cerah";
  const day = time === "pagi" || time === "siang";
  const sy = time === "pagi" ? 64 : 46;
  const drift = Math.floor(frame / 24);
  return (
    <g>
      {time === "malam" &&
        STARS.map(([x, y], i) =>
          (frame + i * 7) % 30 < 24 ? (
            <path key={i} stroke={P.moon || P.ink} d={`M${x - 1} ${y} L${x + 1} ${y} M${x} ${y - 1} L${x} ${y + 1}`} />
          ) : null
        )}
      {time === "malam" && !gray && (
        <g>
          <circle cx="56" cy="48" r="4.5" fill={P.moon || P.ink} stroke="none" />
          <circle cx="58" cy="46.5" r="4" fill={P.bg} stroke="none" />
        </g>
      )}
      {time === "senja" && !gray && <path d="M40 102 A6 6 0 0 1 52 102 Z" fill={P.a1} />}
      {day && !gray && (
        <g>
          <circle cx="56" cy={sy} r="4" fill={P.a1} />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            return (
              <path
                key={i}
                d={`M${56 + Math.cos(a) * 6} ${sy + Math.sin(a) * 6} L${56 + Math.cos(a) * 8} ${sy + Math.sin(a) * 8}`}
              />
            );
          })}
        </g>
      )}
      {(day || gray) &&
        CLOUDS.map(([cx, cy], i) => {
          const x = cx + drift;
          return (
            <g key={i} fill={gray ? "#9aa5b8" : P.bg}>
              <circle cx={x + 3} cy={cy} r="2.6" />
              <circle cx={x + 7} cy={cy - 1.6} r="3.4" />
              <circle cx={x + 11.5} cy={cy} r="2.6" />
            </g>
          );
        })}
    </g>
  );
};

const WinBox = ({ P, x, y, w, h }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={P.a2} fillOpacity="0.25" />
    <path d={`M${x + w / 2} ${y} L${x + w / 2} ${y + h} M${x} ${y + h / 2} L${x + w} ${y + h / 2}`} />
  </g>
);

const Kota = ({ P }) => (
  <g>
    {[[3, 56, 14, 46], [19, 42, 16, 60], [37, 64, 12, 38], [51, 48, 17, 54]].map(([x, y, w, h], i) => (
      <g key={i}>
        <rect x={x} y={y} width={w} height={h} fill={P.fill} />
        {Array.from({ length: Math.floor(h / 9) }).map((_, r) => (
          <g key={r}>
            {Array.from({ length: Math.floor(w / 5) }).map((_, c) => (
              <rect key={c} x={x + 2 + c * 4.5} y={y + 3 + r * 8} width="2" height="3" />
            ))}
          </g>
        ))}
      </g>
    ))}
  </g>
);

const Jalan = ({ P }) => (
  <g>
    <path d="M0 98 Q14 82 30 96 T60 94 T72 98" />
    <path d="M0 124 L72 124" />
    {Array.from({ length: 6 }).map((_, i) => (
      <path key={i} d={`M${i * 13 + 2} 113 L${i * 13 + 8} 113`} />
    ))}
    <rect x="50" y="62" width="14" height="9" fill={P.a2} />
    <path d="M57 71 L57 102" />
  </g>
);

const Taman = ({ P }) => (
  <g>
    <path d="M10 102 L10 74" strokeWidth="1.6" />
    <circle cx="10" cy="66" r="10" fill={P.leaf} />
    <path d="M44 94 L64 94 M44 89 L64 89 M46 94 L46 102 M62 94 L62 102" />
    {[[22, 106], [34, 110], [48, 108], [62, 112]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="0.9" fill={P.a3} />
    ))}
  </g>
);

const Desa = ({ P }) => (
  <g>
    <path d="M0 98 Q16 76 34 94 T72 90" />
    <rect x="40" y="78" width="16" height="14" fill={P.fill} />
    <path d="M38 78 L48 68 L58 78 Z" fill={P.a3} />
    <rect x="46" y="84" width="4" height="8" />
    <path d="M0 108 Q18 105 36 108 T72 108 M0 114 Q18 111 36 114 T72 114" />
    <path d="M12 102 Q14 88 10 78" strokeWidth="1.4" />
    <path d="M10 78 Q16 74 20 79 M10 78 Q6 73 1 77 M10 78 Q13 71 8 68" />
  </g>
);

const Pantai = ({ P, frame }) => {
  const d = Math.floor(frame / 8) % 6;
  return (
    <g>
      {[82, 88, 94].map((y, i) => (
        <path key={y} d={`M${-6 + ((d + i * 2) % 6)} ${y} q3 -2 6 0${" t6 0".repeat(13)}`} />
      ))}
      <path d="M0 98 L72 98" />
      <path d="M10 102 Q12 86 8 72" strokeWidth="1.4" />
      <path d="M8 72 Q14 68 18 73 M8 72 Q3 67 -2 71 M8 72 Q11 65 6 62" />
      <path d="M56 86 L56 102" />
      <path d="M48 86 Q56 76 64 86 Z" fill={P.a3} />
    </g>
  );
};

const Hutan = ({ P }) => (
  <g>
    {[6, 22, 38, 54, 68].map((x, i) => {
      const y = 50 + (i % 3) * 8;
      return (
        <g key={x}>
          <path d={`M${x} ${y + 26} L${x} 102`} strokeWidth="1.4" />
          <path d={`M${x} ${y} L${x - 7} ${y + 14} L${x + 7} ${y + 14} Z`} fill={P.leaf} />
          <path d={`M${x} ${y + 8} L${x - 9} ${y + 26} L${x + 9} ${y + 26} Z`} fill={P.leaf} />
        </g>
      );
    })}
  </g>
);

const Gunung = ({ P }) => (
  <g>
    <path d="M-4 102 L18 52 L40 102" fill={P.fill} />
    <path d="M12.5 64 L18 52 L23.5 64 L21 61.5 L18 65 L15 61.5 Z" fill={P.a2} />
    <path d="M26 102 L50 42 L74 102" fill={P.fill} />
    <path d="M44 56 L50 42 L56 56 L53 53 L50 57 L47 53 Z" fill={P.a2} />
  </g>
);

const Rumah = ({ P }) => (
  <g>
    <WinBox P={P} x={42} y={40} w={22} h={26} />
    <rect x="5" y="84" width="26" height="14" rx="3" fill={P.a3} fillOpacity="0.5" />
    <rect x="7" y="76" width="22" height="10" rx="3" fill={P.fill} />
    <path d="M8 98 L8 102 M28 98 L28 102" />
    <rect x="58" y="90" width="8" height="12" fill={P.fill} />
    <path d="M62 90 Q58 80 55 78 M62 90 Q64 78 68 76" />
  </g>
);

const Kamar = ({ P }) => (
  <g>
    <rect x="3" y="88" width="32" height="12" rx="2" fill={P.a2} fillOpacity="0.5" />
    <rect x="3" y="78" width="4" height="24" fill={P.fill} />
    <rect x="9" y="83" width="10" height="5" rx="2" fill={P.fill} />
    <path d="M62 102 L62 82" />
    <path d="M56 82 L68 82 L66 74 L58 74 Z" fill={P.a1} fillOpacity="0.7" />
    <WinBox P={P} x={44} y={42} w={14} h={18} />
  </g>
);

const Kelas = ({ P }) => (
  <g>
    <rect x="6" y="46" width="34" height="22" fill={P.board} />
    <path d="M10 52 L26 52 M10 58 L30 58 M10 63 L20 63" stroke={P.chalk} />
    <path d="M48 90 L68 90 M50 90 L50 102 M66 90 L66 102" />
    <rect x="52" y="85" width="7" height="5" fill={P.a2} fillOpacity="0.6" />
    <WinBox P={P} x={50} y={44} w={14} h={18} />
  </g>
);

const Kafe = ({ P }) => (
  <g>
    <rect x="40" y="88" width="30" height="14" fill={P.a1} fillOpacity="0.5" />
    <path d="M40 88 L70 88" />
    <rect x="46" y="80" width="5" height="8" fill={P.fill} />
    <path d="M51 82 Q54 83 52 86" />
    <rect x="6" y="46" width="22" height="14" fill={P.board} />
    <path d="M9 51 L24 51 M9 55 L20 55" stroke={P.chalk} />
    {[36, 56].map((x) => (
      <g key={x}>
        <path d={`M${x} 40 L${x} 46`} />
        <path d={`M${x - 4} 52 Q${x} 44 ${x + 4} 52 Z`} fill={P.a1} />
      </g>
    ))}
  </g>
);

const BODY = { kota: Kota, jalan: Jalan, taman: Taman, desa: Desa, pantai: Pantai, hutan: Hutan, gunung: Gunung, rumah: Rumah, kamar: Kamar, kelas: Kelas, kafe: Kafe };
const INDOOR = ["rumah", "kamar", "kelas", "kafe"];

export const StickBg = ({ place, time, variant, frame }) => {
  const P = pal(variant, time);
  const { cuaca } = useContext(SceneCtx);
  const Body = BODY[place] || Kota;
  return (
    <g>
      <Wob frame={frame} />
      <rect x="0" y="0" width="72" height="128" fill={INDOOR.includes(place) && P.wall ? P.wall : P.bg} />
      <g filter={P.clean ? undefined : "url(#wob)"} fill="none" stroke={P.ink} strokeWidth={P.sw || 0.7} strokeLinecap="round" strokeLinejoin="round">
        {!INDOOR.includes(place) && <Sky P={P} time={time} frame={frame} cuaca={cuaca} />}
        <path d="M0 102 L72 102" />
        <Body P={P} frame={frame} />
        {P.halftone && (
          <g>
            <defs>
              <pattern id="dots" width="2.2" height="2.2" patternUnits="userSpaceOnUse">
                <circle cx="1.1" cy="1.1" r="0.45" fill="#000000" stroke="none" />
              </pattern>
            </defs>
            <rect x="0" y="86" width="72" height="42" fill="url(#dots)" opacity="0.22" stroke="none" />
          </g>
        )}
      </g>
    </g>
  );
};

const BAJU = { biru: "#3f6fd1", merah: "#d63a4a", hijau: "#38b764", kuning: "#e9b84a", ungu: "#8a4fd1", pink: "#e8618c", oranye: "#ef7d57", hitam: "#3a3f52", putih: "#d8dde8", abu: "#8a93a8" };
const CELANA = { biru: "#1e2a6b", hitam: "#2a2d3e", cokelat: "#7a4e3a", abu: "#6d7a90", hijau: "#2f6b45" };
const RAMBUT = { hitam: "#2a2030", cokelat: "#6b3a2a", pirang: "#e0b050", merah: "#b13e2a", ungu: "#5a2a5c", abu: "#b8bcc8", biru: "#3a4a9a" };
const GAYA = ["pendek", "panjang", "kuncir", "botak"];
const HOLD = { gelas: [25, 50], pedang: [15, 35], payung: [90, 90], buku: [20, 60], bunga: [15, 35] };
const FA = (p) => {
  const q = ((p % 1) + 1) % 1;
  const sw = q >= 0.5 ? (q - 0.5) * 2 : 0;
  return [28 * Math.cos(2 * Math.PI * q), 6 + 50 * Math.sin(Math.PI * sw)];
};

const lite = (hex, t) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (s) => Math.round(((n >> s) & 255) * (1 - t) + 255 * t);
  return "#" + ((1 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).slice(1);
};

const joint = (a, deg, len) => [a[0] + Math.sin(deg * D) * len, a[1] + Math.cos(deg * D) * len];

const Seg = ({ a, b, color, ink, w }) => {
  const d = `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`;
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={ink} strokeWidth={(w || 1.3) + 1.1} />
      <path d={d} stroke={color} strokeWidth={w || 1.3} />
    </g>
  );
};

const SLeg = ({ f, k, color, ink }) => {
  const kn = joint(HIP, f, 7.3);
  const an = joint(kn, f - k, 7.2);
  return (
    <g>
      <Seg a={HIP} b={kn} color={color} ink={ink} />
      <Seg a={kn} b={an} color={color} ink={ink} />
      <path d={`M${an[0] - 0.4} ${an[1] + 0.2} L${an[0] + 2.6} ${an[1] + 0.2}`} stroke={ink} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </g>
  );
};

const armPts = (up, lo) => {
  const el = joint(SH, up, 5.2);
  return [el, joint(el, up + lo, 5)];
};

const StickFace = ({ expr, open, ink }) => {
  const RED = "#c0394f";
  const eye =
    expr === "senang" ? (
      <path d="M7.6 4.9 Q8.4 3.6 9.2 4.9" fill="none" stroke={ink} strokeWidth="0.6" strokeLinecap="round" />
    ) : expr === "kaget" ? (
      <g>
        <circle cx="8.5" cy="4.6" r="1.1" fill="#ffffff" stroke={ink} strokeWidth="0.35" />
        <circle cx="8.7" cy="4.6" r="0.45" fill={ink} />
      </g>
    ) : (
      <circle cx="8.4" cy="4.6" r="0.55" fill={ink} />
    );
  const brow =
    expr === "marah" ? "M7.3 3.1 L10 4" : expr === "sedih" ? "M7.3 3.9 L9.8 3" : expr === "kaget" ? "M7.4 2.7 L9.6 2.5" : null;
  let mouth;
  if (expr === "senang") {
    mouth = open ? <path d="M7.4 7 Q8.6 9.6 9.9 6.9 Z" fill={RED} /> : <path d="M7.5 7.1 Q8.6 8.5 9.8 7" fill="none" stroke={RED} strokeWidth="0.55" strokeLinecap="round" />;
  } else if (expr === "sedih") {
    mouth = open ? <ellipse cx="8.7" cy="7.8" rx="0.9" ry="0.8" fill={RED} /> : <path d="M7.6 8.2 Q8.7 7.2 9.8 8.1" fill="none" stroke={RED} strokeWidth="0.55" strokeLinecap="round" />;
  } else if (expr === "kaget") {
    mouth = <ellipse cx="8.7" cy="7.8" rx="0.7" ry="1" fill={RED} />;
  } else if (expr === "marah") {
    mouth = open ? <path d="M7.5 7.3 L9.7 7.3 L9.5 8.8 L7.7 8.8 Z" fill={RED} /> : <path d="M7.6 7.7 L9.7 7.9" stroke={RED} strokeWidth="0.55" strokeLinecap="round" />;
  } else {
    mouth = open ? <ellipse cx="8.6" cy="7.7" rx="0.9" ry="0.8" fill={RED} /> : <path d="M7.6 7.6 L9.5 7.6" stroke={RED} strokeWidth="0.55" strokeLinecap="round" />;
  }
  return (
    <g>
      {expr === "senang" && <circle cx="7.9" cy="6.3" r="0.9" fill="#ff8fb0" opacity="0.6" />}
      {expr === "marah" && <circle cx="7.6" cy="6.2" r="1.3" fill="#d63a4a" opacity="0.35" />}
      {brow && <path d={brow} stroke={ink} strokeWidth="0.55" strokeLinecap="round" fill="none" />}
      {eye}
      {expr === "sedih" && <ellipse cx="8.9" cy="6.3" rx="0.35" ry="0.6" fill="#73c6f9" />}
      {mouth}
    </g>
  );
};

const SProp = ({ prop, hd, P, frame }) => {
  const ink = P.ink;
  const [x, y] = hd;
  if (prop === "gelas") {
    return (
      <g stroke={ink} strokeWidth="0.6" fill="none">
        <rect x={x - 1.2} y={y - 4.2} width="3.4" height="4.4" rx="0.5" fill={P.bg} />
        <path d={`M${x + 2.2} ${y - 3} q1.4 0.4 0 2.2`} />
        <path d={`M${x + (frame % 16 < 8 ? 0 : 1)} ${y - 5} q-0.8 -1 0 -2`} opacity="0.7" />
      </g>
    );
  }
  if (prop === "pedang") {
    return (
      <g fill="none" strokeLinecap="round">
        <path d={`M${x} ${y} L${x + 4.5} ${y - 15}`} stroke={ink} strokeWidth="1.7" />
        <path d={`M${x} ${y} L${x + 4.5} ${y - 15}`} stroke="#dfe6ee" strokeWidth="0.8" />
        <path d={`M${x - 1.6} ${y - 1.2} L${x + 1.8} ${y - 2.4}`} stroke="#c9a24a" strokeWidth="1" />
      </g>
    );
  }
  if (prop === "payung") {
    return (
      <g stroke={ink} strokeWidth="0.6">
        <path d={`M${x} ${y} L${x} ${y - 11}`} fill="none" />
        <path d={`M${x - 9} ${y - 11} Q${x} ${y - 22} ${x + 9} ${y - 11} Z`} fill="#d63a4a" />
      </g>
    );
  }
  if (prop === "buku") {
    return <rect x={x - 0.5} y={y - 3.2} width="5" height="6.4" fill={P.a2} stroke={ink} strokeWidth="0.6" />;
  }
  if (prop === "bunga") {
    return (
      <g stroke={ink} strokeWidth="0.6">
        <path d={`M${x} ${y} L${x} ${y - 8}`} fill="none" />
        <circle cx={x} cy={y - 9.5} r="1.7" fill={P.a3} />
        <circle cx={x} cy={y - 9.5} r="0.6" fill={P.a1} />
      </g>
    );
  }
  return null;
};

const SPerson = ({ x, y, flip, c, P, frame, wf, walk, shift, talking, expr, prop }) => {
  const ink = P.ink;
  const p = walk ? (((wf % CF) / CF) + (shift || 0)) % 1 : 0;
  const open = talking && Math.floor(frame / 4) % 2 === 0;
  const [fA, kA] = walk ? FA(p) : [3, 0];
  const [fB, kB] = walk ? FA(p + 0.5) : [-3, 0];
  const fs = 28 * Math.cos(2 * Math.PI * (p % 0.5));
  const bob = walk ? 14.5 * (1 - Math.cos(fs * D)) : open ? -0.5 : 0;
  const cN = Math.cos(2 * Math.PI * (p + 0.5));
  const cF = Math.cos(2 * Math.PI * p);
  const aN = HOLD[prop] || (walk ? [20 * cN, 14 + 0.5 * Math.max(0, 20 * cN)] : [3, 10]);
  const aF = walk ? [20 * cF, 14 + 0.5 * Math.max(0, 20 * cF)] : [-3, 10];
  const [elN, hdN] = armPts(aN[0], aN[1]);
  const [elF, hdF] = armPts(aF[0], aF[1]);
  const lean = walk ? 4 : 0;
  const hc = P.dark ? lite(c.hair, 0.5) : c.hair;
  const topi = c.acc === "topi" || c.acc === "keduanya";
  const kaca = c.acc === "kacamata" || c.acc === "keduanya";
  return (
    <g transform={`translate(${flip ? x + 12 * S : x}, ${y}) scale(${flip ? -S : S}, ${S})`}>
      <g transform={`translate(0, ${bob})`}>
        <SLeg f={fB} k={kB} color={c.pants} ink={ink} />
        <SLeg f={fA} k={kA} color={c.pants} ink={ink} />
        <g transform={`rotate(${lean} ${HIP[0]} ${HIP[1]})`}>
          <Seg a={SH} b={elF} color={c.shirt} ink={ink} />
          <Seg a={elF} b={hdF} color={c.shirt} ink={ink} />
          {prop === "tas" && <rect x="-2.4" y="12.5" width="4.6" height="8" rx="1.2" fill="#d63a4a" stroke={ink} strokeWidth="0.6" />}
          <Seg a={SH} b={HIP} color={c.shirt} ink={ink} w={1.7} />
          <path d="M6.2 9.8 L6 12" stroke={ink} strokeWidth="0.9" strokeLinecap="round" />
          <g fill="none" stroke={hc} strokeLinecap="round" strokeWidth="1.5" opacity="0">
            <path d="M0 0" />
          </g>
          <circle cx="6.3" cy="5.2" r="4.6" fill={P.bg} stroke={ink} strokeWidth="0.9" />
          <g fill="none" stroke={hc} strokeLinecap="round" strokeWidth="1.5">
            {c.hairStyle !== "botak" && <path d="M2.4 4.4 Q3.4 -0.2 7.6 0.3 Q10.6 0.8 10.9 3.8" />}
            {c.hairStyle === "panjang" && <path d="M2.2 4.6 Q0.4 11 2.4 15.5" />}
            {c.hairStyle === "kuncir" && (
              <g>
                <circle cx="1.3" cy="3.4" r="1.3" fill={hc} />
                <path d="M1 4.6 Q-1 8.5 0.4 12" />
              </g>
            )}
          </g>
          <StickFace expr={expr} open={open} ink={ink} />
          {topi && (
            <g>
              <path d="M1.8 3.2 Q6.2 -3.4 10.8 3.2 Z" fill={c.cap} stroke={ink} strokeWidth="0.7" />
              <path d="M10.4 3.2 L13.6 3.9" stroke={ink} strokeWidth="1" strokeLinecap="round" />
            </g>
          )}
          {kaca && (
            <g fill="none" stroke={ink} strokeWidth="0.55">
              <circle cx="8.5" cy="4.7" r="1.7" />
              <path d="M6.8 4.6 L4.8 4.3" />
            </g>
          )}
          <SProp prop={prop} hd={hdN} P={P} frame={frame} />
          <Seg a={SH} b={elN} color={c.shirt} ink={ink} />
          <Seg a={elN} b={hdN} color={c.shirt} ink={ink} />
        </g>
      </g>
    </g>
  );
};

const buildS = (k) => ({
  shirt: BAJU[k.baju] || BAJU.biru,
  pants: CELANA[k.celana] || CELANA.biru,
  hair: RAMBUT[k.rambut] || RAMBUT.hitam,
  hairStyle: GAYA.includes(k.gaya_rambut) ? k.gaya_rambut : k.gender === "cewek" ? "panjang" : "pendek",
  acc: k.aksesori || "tidak",
  cap: BAJU[k.baju] || BAJU.biru,
});

export const StickCast = ({ frame, time, variant, karakter, bicara, ekspresi, reaksi, action, prop, pembawa, walkStart }) => {
  const P = pal(variant, time);
  const list = (karakter && karakter.length ? karakter : DEFAULT_KARAKTER).slice(0, 3);
  const chars = list.map(buildS);
  const n = chars.length;
  const y = 103 - 36 * S;
  const walk = action === "jalan";
  const sp = Math.min(Math.max(Number.isInteger(bicara) ? bicara : 0, 0), n - 1);
  const pbRaw = typeof pembawa === "number" ? pembawa : pembawa === "gadis" ? 1 : 0;
  const pb = Math.min(Math.max(pbRaw, 0), n - 1);
  const has = prop && prop !== "tidak";
  const ex = (i) => (i === sp ? ekspresi : reaksi) || "netral";
  const pr = (i) => (has && i === pb ? prop : "tidak");
  const wf = (walkStart || 0) + frame;
  const xs = walk ? (n === 1 ? [28] : n === 2 ? [40, 18] : [46, 28, 10]) : n === 1 ? [30] : n === 2 ? [22, 39] : [13, 31, 49];
  const flips = walk ? [false, false, false] : n === 1 ? [false] : n === 2 ? [false, true] : [false, sp === 0, true];
  const sh = [0, 0.5, 0.25];
  return (
    <g>
      {variant === "papan" && <rect x="1.2" y="1.2" width="69.6" height="125.6" fill="none" stroke="#8a5a3a" strokeWidth="2.4" />}
      <g filter="url(#wob)">
        {chars.map((c, i) => (
          <SPerson key={i} x={xs[i]} y={y} flip={flips[i]} c={c} P={P} frame={frame} wf={wf} walk={walk} shift={sh[i]} talking={i === sp} expr={ex(i)} prop={pr(i)} />
        ))}
      </g>
    </g>
  );
};


export const speakerX = (n, sp, walk) => {
  const xs = walk ? (n === 1 ? [28] : n === 2 ? [40, 18] : [46, 28, 10]) : n === 1 ? [30] : n === 2 ? [22, 39] : [13, 31, 49];
  return (xs[Math.min(Math.max(sp, 0), xs.length - 1)] || 30) + 5.5;
};

const SFX = {
  kaget: ["HAH?!", "#ffd23f"],
  marah: ["GRR!!", "#ff4f4f"],
  senang: ["YEAY!", "#ff8fb0"],
  sedih: ["HUHU...", "#73c6f9"],
};

const Burst = ({ cx, cy, scale, fill }) => {
  const pts = Array.from({ length: 24 })
    .map((_, i) => {
      const a = (i * Math.PI) / 12;
      const r = i % 2 === 0 ? 10 : 6.5;
      return `${cx + Math.cos(a) * r * scale},${cy + Math.sin(a) * r * scale * 0.8}`;
    })
    .join(" ");
  return <polygon points={pts} fill={fill} stroke="#111111" strokeWidth="0.9" strokeLinejoin="round" />;
};

export const KomikCast = ({ frame, time, place, font, ...rest }) => {
  const n = Math.min(rest.karakter && rest.karakter.length ? rest.karakter.length : 2, 3);
  const sp = Number.isInteger(rest.bicara) ? rest.bicara : 0;
  const sfx = SFX[rest.ekspresi];
  const cx = Math.max(14, Math.min(58, speakerX(n, sp, rest.action === "jalan") + (sp < n / 2 ? 15 : -15)));
  const sc = frame < 10 ? 0.3 + 0.08 * frame : 1.1 - Math.min(0.1, (frame - 10) / 100);
  return (
    <g>
      <Cast frame={frame} {...rest} ink="#111111" />
      {sfx && frame < 50 && (
        <g>
          <Burst cx={cx} cy={58} scale={sc} fill={sfx[1]} />
          <text x={cx} y={59.6} textAnchor="middle" fontFamily={font} fontSize={4.6 * sc} fill="#111111" transform={`rotate(-8 ${cx} 58)`}>
            {sfx[0]}
          </text>
        </g>
      )}
      {frame < 60 && (
        <g>
          <rect x="3" y="116" width="42" height="8.5" fill="#ffd23f" stroke="#111111" strokeWidth="0.8" />
          <text x="5" y="122" fontFamily={font} fontSize="4.4" fill="#111111">
            {(time + " - " + place).toUpperCase()}
          </text>
        </g>
      )}
      <rect x="0.9" y="0.9" width="70.2" height="126.2" fill="none" stroke="#111111" strokeWidth="1.8" />
    </g>
  );
};

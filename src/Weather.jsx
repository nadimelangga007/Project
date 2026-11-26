import React, { createContext } from "react";

export const SceneCtx = createContext({ cuaca: "cerah" });
export const CUACA = ["cerah", "mendung", "hujan", "salju", "kabut"];
export const MOODS = ["normal", "ceria", "sedih", "tegang", "seram"];

const mix = (a, b, t) => {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (s) => Math.round(((pa >> s) & 255) * (1 - t) + ((pb >> s) & 255) * t);
  return "#" + ((1 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).slice(1);
};

export const skyMix = (colors, cuaca, time) => {
  if (!cuaca || cuaca === "cerah") return colors;
  const night = time === "malam";
  const dusk = time === "senja";
  let target;
  let t;
  if (cuaca === "mendung") {
    target = night ? "#14161f" : dusk ? "#5a4a62" : "#8a95a5";
    t = 0.6;
  } else if (cuaca === "hujan") {
    target = night ? "#10121a" : dusk ? "#4a3e55" : "#6f7a8c";
    t = 0.75;
  } else {
    target = night ? "#3a4058" : dusk ? "#8a7a90" : "#d5dbe4";
    t = 0.55;
  }
  return colors.map((c) => mix(c, target, t));
};

const MOOD = {
  ceria: { c: "#ffd84a", o: 0.1, v: 0 },
  sedih: { c: "#3a4a8a", o: 0.28, v: 0.35 },
  tegang: { c: "#8a1e2e", o: 0.16, v: 0.5 },
  seram: { c: "#0a2a1a", o: 0.4, v: 0.75 },
};

export const Mood = ({ mood }) => {
  const m = MOOD[mood];
  if (!m) return null;
  return (
    <g>
      <rect x="0" y="0" width="72" height="128" fill={m.c} opacity={m.o} />
      {m.v > 0 && (
        <g>
          <defs>
            <radialGradient id="vig" cx="50%" cy="55%" r="75%">
              <stop offset="45%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="72" height="128" fill="url(#vig)" opacity={m.v} />
        </g>
      )}
    </g>
  );
};

const RAIN = Array.from({ length: 40 }).map((_, i) => [(i * 37) % 72, (i * 53) % 128, 3 + (i % 3)]);
const SNOW = Array.from({ length: 30 }).map((_, i) => [(i * 29) % 72, (i * 47) % 128, i % 3]);

export const Particles = ({ cuaca, frame }) => {
  if (cuaca === "hujan") {
    return (
      <g>
        {RAIN.map(([x, y0, sp], i) => (
          <rect
            key={i}
            x={(x + Math.floor(frame * 0.6)) % 72}
            y={((y0 + frame * (sp + 2)) % 140) - 8}
            width="1"
            height="4"
            fill="#bcd4f0"
            opacity="0.75"
          />
        ))}
      </g>
    );
  }
  if (cuaca === "salju") {
    return (
      <g>
        {SNOW.map(([x0, y0, k], i) => (
          <rect
            key={i}
            x={(x0 + Math.round(Math.sin((frame + i * 7) / 12) * 2) + 72) % 72}
            y={((y0 + frame * (0.5 + k * 0.25)) % 134) - 4}
            width={k === 2 ? 2 : 1}
            height={k === 2 ? 2 : 1}
            fill="#ffffff"
          />
        ))}
      </g>
    );
  }
  if (cuaca === "kabut") {
    return (
      <g>
        <rect x="0" y="60" width="72" height="14" fill="#e8eef4" opacity="0.15" />
        <rect x="0" y="78" width="72" height="18" fill="#e8eef4" opacity="0.2" />
        <rect x="0" y="98" width="72" height="30" fill="#e8eef4" opacity="0.25" />
      </g>
    );
  }
  return null;
};

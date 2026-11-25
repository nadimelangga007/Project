import React from "react";
import { interpolate } from "remotion";

const U = 3;

const ARDI = {
  hair: "#1a1c2c",
  skin: "#f2c39b",
  shirt: "#ffcd75",
  shirtDark: "#d9a441",
  pants: "#29366f",
  pantsDark: "#1f2a55",
  shoe: "#f4f4f4",
  shoeDark: "#c9d3e0",
  long: false,
};
const GADIS = {
  hair: "#5d275d",
  skin: "#f2c39b",
  shirt: "#41a6f6",
  shirtDark: "#2f7fc4",
  pants: "#333c57",
  pantsDark: "#262c42",
  shoe: "#f4f4f4",
  shoeDark: "#c9d3e0",
  long: true,
};

const Person = ({ x, y, flip, c, frame, walk, talking, holding }) => {
  const p = walk ? Math.floor(frame / 5) % 4 : 1;
  const off1 = [4, 0, -4, 0][p];
  const off2 = [-4, 0, 4, 0][p];
  const armN = [7, 5, 3, 5][p];
  const armF = [3, 5, 7, 5][p];
  const open = talking && Math.floor(frame / 4) % 2 === 0;
  const bob = walk ? (p % 2 === 1 ? -1 : 0) : open ? -1 : 0;
  const leg = (hip, off, color, shoe) => (
    <g>
      <rect x={hip + off / 2} y="20" width="3" height="6" fill={color} />
      <rect x={hip + off} y="26" width="3" height="6" fill={color} />
      <rect x={hip + off} y="32" width="5" height="2" fill={shoe} />
    </g>
  );
  return (
    <g
      transform={`translate(${flip ? x + 14 * U : x}, ${y}) scale(${flip ? -U : U}, ${U})`}
      opacity={talking ? 1 : 0.8}
    >
      <rect x="1" y="34" width="13" height="1" fill="#000000" opacity="0.25" />
      <g transform={`translate(0, ${bob})`}>
        <rect x={armF} y="11" width="3" height="8" fill={c.shirtDark} />
        {leg(4, off1, c.pantsDark, c.shoeDark)}
        {leg(6, off2, c.pants, c.shoe)}
        <rect x="4" y="10" width="6" height="10" fill={c.shirt} />
        {c.long ? (
          <rect x="1" y="2" width="4" height="12" fill={c.hair} />
        ) : (
          <rect x="3" y="2" width="2" height="5" fill={c.hair} />
        )}
        <rect x="4" y="2" width="7" height="8" fill={c.skin} />
        <rect x="11" y="5" width="1" height="2" fill={c.skin} />
        <rect x="3" y="0" width="8" height="3" fill={c.hair} />
        <rect x="8" y="5" width="1" height="2" fill="#1a1c2c" />
        <rect x="9" y="8" width="2" height={open ? 2 : 1} fill="#b13e53" />
        {holding ? (
          <g>
            <rect x="12" y="10" width="4" height="6" fill="#f4f4f4" />
            <rect x="12" y="12" width="4" height="2" fill="#b13e53" />
            {Math.floor(frame / 8) % 2 === 0 ? (
              <rect x="13" y="7" width="1" height="2" fill="#f4f4f4" />
            ) : (
              <rect x="14" y="7" width="1" height="2" fill="#f4f4f4" />
            )}
            <rect x="5" y="11" width="3" height="4" fill={c.shirt} />
            <rect x="7" y="14" width="5" height="3" fill={c.shirt} />
            <rect x="11" y="14" width="2" height="3" fill={c.skin} />
          </g>
        ) : (
          <g>
            <rect x={armN} y="11" width="3" height="8" fill={c.shirt} />
            <rect x={armN} y="19" width="3" height="2" fill={c.skin} />
          </g>
        )}
      </g>
    </g>
  );
};

export const Cast = ({ frame, duration, male, action, prop }) => {
  const y = 262 - 34 * U;
  const walk = action === "jalan";
  const holding = prop === "gelas";
  const travel = Math.round(interpolate(frame, [0, duration], [0, 50]) / U) * U;
  return walk ? (
    <g>
      <Person x={20 + travel} y={y} c={GADIS} frame={frame} walk talking={!male} holding={holding && !male} />
      <Person x={70 + travel} y={y} c={ARDI} frame={frame} walk talking={male} holding={holding && male} />
    </g>
  ) : (
    <g>
      <Person x={26} y={y} c={ARDI} frame={frame} talking={male} holding={holding && male} />
      <Person x={112} y={y} flip c={GADIS} frame={frame} talking={!male} holding={holding && !male} />
    </g>
  );
};

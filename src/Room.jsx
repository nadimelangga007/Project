import React from "react";

const SKY3 = {
  pagi: ["#9fdcf0", "#d4f0e4", "#ffe9a8"],
  siang: ["#2d9cf2", "#4aaef5", "#6bbff7"],
  senja: ["#5d275d", "#b13e53", "#ef7d57"],
  malam: ["#0b0c2a", "#141a46", "#1f2860"],
};
const FAR = [[0, 18, 6, 26], [8, 14, 7, 30], [17, 20, 6, 24], [25, 16, 7, 28]];
const NEAR = [[3, 24, 7, 20], [12, 22, 6, 22], [20, 26, 9, 18]];
const NAVY = [[10, 28, 5, 16]];
const LEAVES = [[62, 86, -1, 9], [62, 86, 1, 9], [61, 86, -2, 6], [63, 86, 2, 6], [62, 86, 0, 7]];
const STARS = [[4, 3], [12, 7], [22, 4], [28, 11]];

const Grid = ({ b, color }) => {
  const [x, y, w, h] = b;
  const out = [];
  for (let r = y + 2; r < y + h - 1; r += 3) {
    for (let c = x + 1; c < x + w - 1; c += 2) {
      out.push(<rect key={c + "-" + r} x={c} y={r} width="1" height="1" fill={color} />);
    }
  }
  return <g>{out}</g>;
};

const Block = ({ list, fill, dots }) => (
  <g>
    {list.map((b, i) => (
      <g key={i}>
        <rect x={b[0]} y={b[1]} width={b[2]} height={b[3]} fill={fill} />
        <Grid b={b} color={dots} />
      </g>
    ))}
  </g>
);

const Leaf = ({ l }) => {
  const [x0, y0, dx, n] = l;
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i}>
          <rect x={x0 + dx * i - 1} y={y0 - 2 * (i + 1)} width={Math.abs(dx) >= 2 ? 5 : 4} height="2" fill="#1f6b34" />
          <rect x={x0 + dx * i} y={y0 - 2 * (i + 1)} width={Math.abs(dx) >= 2 ? 3 : 2} height="2" fill="#43b04a" />
        </g>
      ))}
    </g>
  );
};

export const Room = ({ time }) => {
  const sky = SKY3[time] || SKY3.siang;
  const lit = time === "malam" || time === "senja";
  const day = time === "pagi" || time === "siang";
  const dots = lit ? "#ffcd75" : "#8aa0c4";
  return (
    <g>
      <rect x="0" y="0" width="72" height="101" fill="#8fa5bf" />
      {Array.from({ length: 9 }).map((_, i) => (
        <g key={i}>
          <rect x={i * 8} y="0" width="1" height="101" fill="#6d849f" />
          {[8, 26, 44, 62, 80].map((dy) => (
            <rect key={dy} x={i * 8 + 4} y={dy} width="1" height="1" fill="#7a90ab" />
          ))}
        </g>
      ))}
      <rect x="5" y="36" width="36" height="48" fill="#e9eef5" />
      <svg x="7" y="38" width="32" height="44" viewBox="0 0 32 44">
        <rect x="0" y="0" width="32" height="15" fill={sky[0]} />
        <rect x="0" y="15" width="32" height="15" fill={sky[1]} />
        <rect x="0" y="30" width="32" height="14" fill={sky[2]} />
        {day && (
          <g>
            <rect x="3" y="4" width="6" height="2" fill="#ffffff" />
            <rect x="4" y="3" width="3" height="1" fill="#ffffff" />
            <rect x="20" y="9" width="6" height="2" fill="#ffffff" />
            <rect x="21" y="8" width="3" height="1" fill="#ffffff" />
          </g>
        )}
        {time === "malam" && (
          <g>
            {STARS.map(([sx, sy], i) => (
              <rect key={i} x={sx} y={sy} width="1" height="1" fill="#ffffff" />
            ))}
            <rect x="24" y="3" width="3" height="3" fill="#f4f4f4" />
          </g>
        )}
        <Block list={FAR} fill="#5b6b86" dots={dots} />
        <Block list={NEAR} fill="#6d7fa0" dots={dots} />
        <Block list={NAVY} fill="#27306e" dots={dots} />
      </svg>
      <rect x="22" y="36" width="2" height="48" fill="#e9eef5" />
      <rect x="5" y="59" width="36" height="2" fill="#e9eef5" />
      <rect x="3" y="84" width="40" height="3" fill="#f4f6fa" />
      <rect x="3" y="87" width="40" height="1" fill="#6d849f" />
      <rect x="0" y="98" width="72" height="3" fill="#5c7390" />
      {LEAVES.map((l, i) => (
        <Leaf key={i} l={l} />
      ))}
      <rect x="56" y="86" width="13" height="3" fill="#f48a52" />
      <rect x="57" y="89" width="11" height="12" fill="#f0743c" />
      <rect x="63" y="89" width="2" height="12" fill="#c9552b" />
      <rect x="0" y="101" width="72" height="27" fill="#2a3566" />
      <rect x="0" y="101" width="72" height="1" fill="#4a5a9e" />
      {[108, 116, 124].map((fy, ri) => (
        <g key={fy}>
          {[0, 1, 2, 3, 4, 5, 6].map((ci) => (
            <rect key={ci} x={ci * 12 + (ri % 2) * 6} y={fy} width="5" height="3" fill="#3a4a8c" />
          ))}
        </g>
      ))}
    </g>
  );
};

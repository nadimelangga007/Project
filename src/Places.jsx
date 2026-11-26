import React, { useContext } from "react";
import { SceneCtx, skyMix } from "./Weather";
import { Room } from "./Room";

const SKY3 = {
  pagi: ["#9fdcf0", "#d4f0e4", "#ffe9a8"],
  siang: ["#2d9cf2", "#4aaef5", "#6bbff7"],
  senja: ["#5d275d", "#b13e53", "#ef7d57"],
  malam: ["#0b0c2a", "#141a46", "#1f2860"],
};

const Win = ({ x, y, w, h, time }) => {
  const ctx = useContext(SceneCtx);
  const s = skyMix(SKY3[time] || SKY3.siang, ctx.cuaca, time);
  const half = (h - 4) / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#e9eef5" />
      <rect x={x + 2} y={y + 2} width={w - 4} height={half} fill={s[0]} />
      <rect x={x + 2} y={y + 2 + half} width={w - 4} height={half} fill={s[2]} />
      <rect x={x + w / 2 - 1} y={y} width="2" height={h} fill="#e9eef5" />
      <rect x={x} y={y + h / 2 - 1} width={w} height="2" fill="#e9eef5" />
      {time === "malam" && <rect x={x + w - 7} y={y + 4} width="3" height="3" fill="#f4f4f4" />}
    </g>
  );
};

const Floor = ({ base, edge, line }) => (
  <g>
    <rect x="0" y="101" width="72" height="27" fill={base} />
    <rect x="0" y="101" width="72" height="1" fill={edge} />
    {[108, 115, 122].map((fy) => (
      <rect key={fy} x="0" y={fy} width="72" height="1" fill={line} />
    ))}
    {Array.from({ length: 7 }).map((_, i) => (
      <rect key={i} x={i * 12 + 4} y="101" width="1" height="27" fill={line} />
    ))}
  </g>
);

const Kamar = ({ time }) => {
  const lamp = time === "malam" || time === "senja";
  return (
    <g>
      <rect x="0" y="0" width="72" height="101" fill="#b3a2cf" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={i * 8 + 3} y="0" width="2" height="101" fill="#a897c6" />
      ))}
      <rect x="0" y="98" width="72" height="3" fill="#8f7db0" />
      <Win x={46} y={44} w={22} h={26} time={time} />
      <rect x="43" y="42" width="6" height="30" fill="#e8618c" />
      <rect x="65" y="42" width="6" height="30" fill="#e8618c" />
      <rect x="42" y="41" width="30" height="2" fill="#6b4a3a" />
      <rect x="0" y="72" width="4" height="29" fill="#6b4a3a" />
      <rect x="4" y="97" width="34" height="4" fill="#6b4a3a" />
      <rect x="4" y="88" width="34" height="9" fill="#f4f4f4" />
      <rect x="14" y="85" width="24" height="12" fill="#41a6f6" />
      <rect x="14" y="85" width="24" height="2" fill="#73c6f9" />
      <rect x="5" y="84" width="10" height="5" rx="1.5" fill="#ffffff" />
      <rect x="56" y="90" width="14" height="11" fill="#8a5a3a" />
      <rect x="62" y="82" width="2" height="8" fill="#6b4a3a" />
      <rect x="59" y="75" width="8" height="8" fill={lamp ? "#ffcd75" : "#e8dcc0"} />
      <Floor base="#b5835a" edge="#8a5a3a" line="#a0714a" />
      <rect x="16" y="108" width="40" height="14" fill="#e8618c" />
      <rect x="18" y="110" width="36" height="10" fill="#ef8fb0" />
    </g>
  );
};

const Kelas = ({ time }) => (
  <g>
    <rect x="0" y="0" width="72" height="101" fill="#a7c4a0" />
    <rect x="0" y="72" width="72" height="29" fill="#7fa079" />
    <rect x="0" y="72" width="72" height="2" fill="#6b8a66" />
    <rect x="6" y="43" width="42" height="24" fill="#8a5a3a" />
    <rect x="8" y="45" width="38" height="20" fill="#2f4a3a" />
    <rect x="11" y="49" width="14" height="1" fill="#e8eef4" />
    <rect x="11" y="53" width="22" height="1" fill="#e8eef4" />
    <rect x="11" y="57" width="10" height="1" fill="#e8eef4" />
    <rect x="30" y="58" width="8" height="1" fill="#ffcd75" />
    <rect x="8" y="64" width="38" height="3" fill="#6b4a3a" />
    <Win x={54} y={44} w={14} h={20} time={time} />
    <rect x="52" y="86" width="19" height="3" fill="#c28a4f" />
    <rect x="54" y="89" width="2" height="12" fill="#6b4a3a" />
    <rect x="67" y="89" width="2" height="12" fill="#6b4a3a" />
    <rect x="56" y="83" width="6" height="3" fill="#41a6f6" />
    <Floor base="#c9a574" edge="#a8854f" line="#b8956a" />
  </g>
);

const Kafe = ({ time }) => {
  const lit = time === "malam" || time === "senja";
  return (
    <g>
      <rect x="0" y="0" width="72" height="101" fill="#7a4e3a" />
      <rect x="0" y="70" width="72" height="31" fill="#5d3a2c" />
      <rect x="0" y="70" width="72" height="2" fill="#8a5a44" />
      <rect x="5" y="44" width="24" height="18" fill="#c28a4f" />
      <rect x="7" y="46" width="20" height="14" fill="#2f3a4a" />
      {[49, 52, 55, 58].map((my, i) => (
        <g key={my}>
          <rect x="9" y={my} width={8 + (i % 2) * 3} height="1" fill="#e8eef4" />
          <rect x="21" y={my} width="4" height="1" fill="#ffcd75" />
        </g>
      ))}
      {[34, 52].map((lx) => (
        <g key={lx}>
          <rect x={lx + 3} y="40" width="1" height="4" fill="#3a3f5c" />
          <rect x={lx} y="44" width="7" height="3" fill={lit ? "#ffcd75" : "#c28a4f"} />
        </g>
      ))}
      <rect x="44" y="84" width="28" height="17" fill="#c28a4f" />
      <rect x="43" y="82" width="29" height="3" fill="#e0b070" />
      <rect x="44" y="90" width="28" height="1" fill="#a0693a" />
      <rect x="48" y="70" width="11" height="12" fill="#3a3f5c" />
      <rect x="50" y="72" width="7" height="4" fill="#5b6485" />
      <rect x="52" y="78" width="3" height="3" fill="#d63a4a" />
      <rect x="62" y="78" width="4" height="4" fill="#f4f4f4" />
      <rect x="62" y="79" width="4" height="1" fill="#d63a4a" />
      <rect x="0" y="101" width="72" height="27" fill="#3a3f5c" />
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 12 }).map((_, c) =>
          (r + c) % 2 === 0 ? (
            <rect key={r + "-" + c} x={c * 6} y={101 + r * 6} width="6" height="6" fill="#4a4f6e" />
          ) : null
        )
      )}
    </g>
  );
};

export const INTERIORS = ["rumah", "kamar", "kelas", "kafe"];

export const Interior = ({ place, time }) => {
  if (place === "kamar") return <Kamar time={time} />;
  if (place === "kelas") return <Kelas time={time} />;
  if (place === "kafe") return <Kafe time={time} />;
  return <Room time={time} />;
};

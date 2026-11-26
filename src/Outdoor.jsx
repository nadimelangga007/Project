import React from "react";

const SKY7 = {
  pagi: ["#9fdcf0", "#b9e8f2", "#d4f0e4", "#f0f2c8", "#ffe9a8", "#ffd98a", "#ffc971"],
  siang: ["#2f8fe0", "#41a6f6", "#5db6f8", "#73c6f9", "#8fd3fb", "#a8e0fc", "#c0ecfd"],
  senja: ["#2e1f3f", "#5d275d", "#8a3260", "#b13e53", "#d95f55", "#ef7d57", "#ffa05a"],
  malam: ["#0b0c1a", "#10122a", "#161a3a", "#1c2148", "#232958", "#2a3068", "#313878"],
};
const SUN = {
  pagi: [52, 62, "#fff2c2"],
  siang: [56, 46, "#fff7d6"],
  senja: [50, 70, "#ffcd75"],
  malam: [56, 46, "#f4f4f4"],
};
const STARS = [[6, 44], [18, 60], [30, 48], [44, 70], [60, 58], [10, 76], [66, 80], [36, 84]];
const CLOUDS = [[4, 50], [38, 62], [18, 74]];

const OutSky = ({ time, frame }) => {
  const [sx, sy, sc] = SUN[time];
  return (
    <g>
      {SKY7[time].map((c, i) => (
        <rect key={i} x="0" y={i * 15} width="72" height="15" fill={c} />
      ))}
      {time === "malam" &&
        STARS.map(([x, y], i) =>
          (frame + i * 9) % 36 < 28 ? (
            <rect key={i} x={x} y={y} width="1" height="1" fill="#ffffff" />
          ) : null
        )}
      <rect x={sx + 1} y={sy} width="5" height="7" fill={sc} />
      <rect x={sx} y={sy + 1} width="7" height="5" fill={sc} />
      {(time === "pagi" || time === "siang") &&
        CLOUDS.map(([cx, cy], i) => {
          const x = cx + Math.floor(frame / 14);
          return (
            <g key={i}>
              <rect x={x} y={cy} width="12" height="3" fill="#ffffff" />
              <rect x={x + 3} y={cy - 2} width="6" height="2" fill="#ffffff" />
            </g>
          );
        })}
    </g>
  );
};

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

const FAR = [[0, 40, 12, 61], [12, 52, 9, 49], [21, 36, 14, 65], [35, 48, 10, 53], [45, 30, 13, 71], [58, 44, 14, 57]];
const NEAR = [[2, 58, 13, 43], [17, 52, 10, 49], [30, 62, 12, 39], [46, 56, 11, 45], [60, 60, 12, 41]];

const Kota = ({ time }) => {
  const lit = time === "malam" || time === "senja";
  const dots = lit ? "#ffcd75" : "#8aa0c4";
  return (
    <g>
      <Block list={FAR} fill="#5b6b86" dots={dots} />
      <Block list={NEAR} fill="#6d7fa0" dots={dots} />
      <rect x="66" y="74" width="1" height="27" fill="#4a5568" />
      <rect x="62" y="74" width="5" height="1" fill="#4a5568" />
      <rect x="60" y="75" width="4" height="2" fill={lit ? "#ffcd75" : "#9aa5b8"} />
      <rect x="0" y="101" width="72" height="8" fill="#8a93a8" />
      <rect x="0" y="101" width="72" height="1" fill="#b8c0d0" />
      <rect x="0" y="109" width="72" height="19" fill="#3a4258" />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={i * 14 + 2} y="118" width="7" height="1" fill="#f4f4f4" />
      ))}
    </g>
  );
};

const Jalan = ({ time }) => {
  const lit = time === "malam" || time === "senja";
  return (
    <g>
      <rect x="0" y="86" width="34" height="15" fill="#5a8aa8" />
      <rect x="22" y="80" width="30" height="21" fill="#4a7898" />
      <rect x="44" y="88" width="28" height="13" fill="#5a8aa8" />
      {[[6, 84], [14, 86], [58, 82], [64, 85]].map(([tx, ty], i) => (
        <g key={i}>
          <rect x={tx} y={ty} width="4" height="4" fill="#2f7a3f" />
          <rect x={tx + 1} y={ty + 4} width="2" height={101 - (ty + 4)} fill="#5c3b24" />
        </g>
      ))}
      <rect x="54" y="60" width="14" height="9" fill="#e9eef5" />
      <rect x="55" y="61" width="12" height="7" fill="#2f8a4a" />
      <rect x="57" y="64" width="8" height="1" fill="#f4f4f4" />
      <rect x="60" y="69" width="2" height="32" fill="#6d7a90" />
      <rect x="0" y="98" width="72" height="2" fill="#aab4c4" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={i * 8 + 2} y="98" width="1" height="4" fill="#6d7a90" />
      ))}
      <rect x="6" y="66" width="1" height="35" fill="#4a5568" />
      <rect x="6" y="66" width="6" height="1" fill="#4a5568" />
      <rect x="10" y="67" width="4" height="2" fill={lit ? "#ffcd75" : "#9aa5b8"} />
      <rect x="0" y="101" width="72" height="27" fill="#3a4258" />
      <rect x="0" y="101" width="72" height="1" fill="#f4f4f4" />
      <rect x="0" y="126" width="72" height="1" fill="#f4f4f4" />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={i * 14 + 2} y="114" width="7" height="1" fill="#ffcd75" />
      ))}
    </g>
  );
};

const Taman = () => (
  <g>
    <rect x="0" y="82" width="40" height="19" fill="#4fb06a" />
    <rect x="24" y="78" width="48" height="23" fill="#3f9e5a" />
    <rect x="46" y="86" width="26" height="15" fill="#4fb06a" />
    {[[4, 62], [52, 56]].map(([tx, ty], i) => (
      <g key={i}>
        <rect x={tx + 6} y={ty + 14} width="4" height={101 - (ty + 14)} fill="#6b4a3a" />
        <rect x={tx + 3} y={ty} width="10" height="3" fill="#2f9e57" />
        <rect x={tx} y={ty + 3} width="16" height="8" fill="#2f9e57" />
        <rect x={tx + 3} y={ty + 11} width="10" height="3" fill="#1e6b3a" />
        <rect x={tx + 5} y={ty + 4} width="3" height="2" fill="#4fb06a" />
      </g>
    ))}
    <rect x="52" y="88" width="17" height="2" fill="#8a5a3a" />
    <rect x="52" y="92" width="17" height="2" fill="#8a5a3a" />
    <rect x="54" y="94" width="2" height="7" fill="#6b4a3a" />
    <rect x="65" y="94" width="2" height="7" fill="#6b4a3a" />
    <rect x="0" y="101" width="72" height="27" fill="#38b764" />
    <rect x="0" y="101" width="72" height="2" fill="#2f9e57" />
    <rect x="0" y="110" width="72" height="9" fill="#d9b48a" />
    <rect x="0" y="110" width="72" height="1" fill="#c29a6c" />
    {[[6, 106], [30, 122], [50, 105], [64, 124], [18, 124]].map(([fx, fy], i) => (
      <rect key={i} x={fx} y={fy} width="2" height="2" fill={["#ef7d57", "#f4f4f4", "#ffcd75"][i % 3]} />
    ))}
  </g>
);

export const OUTDOORS = ["kota", "jalan", "taman", "desa", "pantai", "hutan", "gunung"];

export const Outdoor = ({ place, time, frame }) => {
  const t = SKY7[time] ? time : "siang";
  return (
    <g>
      <OutSky time={t} frame={frame} />
      <PlaceBody place={place} time={t} frame={frame} />
    </g>
  );
};

const Mountain = ({ cx, top, h, hw, color, snow }) => {
  const rows = Math.floor(h / 2);
  const wd = (r) => Math.round(((r + 1) / rows) * hw * 2);
  return (
    <g>
      {Array.from({ length: rows }).map((_, r) => (
        <rect key={r} x={Math.round(cx - wd(r) / 2)} y={top + r * 2} width={wd(r)} height="2" fill={color} />
      ))}
      {snow &&
        Array.from({ length: 4 }).map((_, r) => (
          <rect key={"s" + r} x={Math.round(cx - wd(r) / 2)} y={top + r * 2} width={wd(r)} height="2" fill="#f4f6fa" />
        ))}
    </g>
  );
};

const Pine = ({ x, y }) => (
  <g>
    <rect x={x + 3} y={y + 14} width="2" height={101 - (y + 14)} fill="#5c3b24" />
    <rect x={x + 3} y={y} width="2" height="3" fill="#1e6b3a" />
    <rect x={x + 2} y={y + 3} width="4" height="3" fill="#1e6b3a" />
    <rect x={x + 1} y={y + 6} width="6" height="4" fill="#2f7a3f" />
    <rect x={x} y={y + 10} width="8" height="4" fill="#1e6b3a" />
  </g>
);

const Palm = ({ x, y }) => (
  <g>
    <rect x={x + 4} y={y + 4} width="2" height={101 - (y + 4)} fill="#8a5a3a" />
    <rect x={x} y={y + 2} width="14" height="2" fill="#2f9e57" />
    <rect x={x + 2} y={y} width="10" height="2" fill="#2f9e57" />
    <rect x={x - 2} y={y + 4} width="6" height="2" fill="#2f9e57" />
    <rect x={x + 8} y={y + 4} width="6" height="2" fill="#2f9e57" />
    <rect x={x + 4} y={y + 4} width="2" height="2" fill="#6b4a3a" />
  </g>
);

const Desa = () => (
  <g>
    <Mountain cx={20} top={50} h={51} hw={26} color="#6d84a8" />
    <Mountain cx={54} top={60} h={41} hw={22} color="#5a7298" />
    <rect x="0" y="88" width="72" height="13" fill="#8fcf5a" />
    <rect x="0" y="92" width="72" height="1" fill="#6fb040" />
    <rect x="0" y="96" width="72" height="1" fill="#6fb040" />
    <rect x="44" y="76" width="14" height="12" fill="#f2d9b6" />
    <rect x="46" y="68" width="10" height="2" fill="#c9552b" />
    <rect x="44" y="70" width="14" height="2" fill="#c9552b" />
    <rect x="42" y="72" width="18" height="2" fill="#c9552b" />
    <rect x="41" y="74" width="20" height="2" fill="#c9552b" />
    <rect x="49" y="80" width="4" height="8" fill="#6b4a3a" />
    <rect x="54" y="79" width="3" height="3" fill="#73c6f9" />
    <Palm x={6} y={60} />
    <rect x="0" y="101" width="72" height="27" fill="#c9a070" />
    <rect x="0" y="101" width="72" height="3" fill="#6fb040" />
    <rect x="0" y="114" width="72" height="1" fill="#b88a5a" />
    <rect x="0" y="122" width="72" height="1" fill="#b88a5a" />
  </g>
);

const Pantai = ({ frame }) => (
  <g>
    <rect x="0" y="70" width="72" height="22" fill="#2d7fd0" />
    <rect x="0" y="84" width="72" height="8" fill="#4aaef5" />
    {[74, 80, 86].map((wy, i) => (
      <g key={i}>
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <rect
            key={k}
            x={((k * 14 + Math.floor(frame / 6) + i * 5) % 84) - 6}
            y={wy}
            width="6"
            height="1"
            fill="#a8e0fc"
          />
        ))}
      </g>
    ))}
    <rect x="0" y="92" width="72" height="36" fill="#f0d9a0" />
    <rect x="0" y="92" width="72" height="4" fill="#d9c088" />
    <Palm x={4} y={62} />
    <rect x="60" y="80" width="1" height="22" fill="#6b4a3a" />
    <rect x="51" y="76" width="19" height="2" fill="#d63a4a" />
    <rect x="53" y="74" width="15" height="2" fill="#f4f4f4" />
    <rect x="55" y="72" width="11" height="2" fill="#d63a4a" />
    <rect x="57" y="70" width="7" height="2" fill="#f4f4f4" />
    <rect x="50" y="110" width="14" height="6" fill="#41a6f6" />
    <rect x="50" y="112" width="14" height="1" fill="#f4f4f4" />
  </g>
);

const Hutan = () => (
  <g>
    <rect x="0" y="40" width="72" height="61" fill="#2a5a3a" />
    {[4, 18, 32, 46, 60].map((x, i) => (
      <rect key={i} x={x} y={36 + (i % 2) * 8} width="4" height={65 - (i % 2) * 8} fill="#4a3426" />
    ))}
    <rect x="0" y="22" width="72" height="24" fill="#1e6b3a" />
    {[2, 12, 22, 32, 42, 52, 62].map((x, i) => (
      <rect key={i} x={x} y="46" width="8" height={3 + (i % 3)} fill="#1e6b3a" />
    ))}
    {[[6, 27, 10], [28, 30, 12], [50, 26, 10]].map(([x, y, w], i) => (
      <rect key={i} x={x} y={y} width={w} height="4" fill="#2f9e57" />
    ))}
    {[[0, 92, 12], [56, 90, 16]].map(([x, y, w], i) => (
      <g key={i}>
        <rect x={x} y={y} width={w} height="9" fill="#2f9e57" />
        <rect x={x + 2} y={y - 2} width={w - 4} height="2" fill="#2f9e57" />
      </g>
    ))}
    <rect x="0" y="101" width="72" height="27" fill="#2b6a3a" />
    <rect x="0" y="101" width="72" height="2" fill="#1e6b3a" />
    <rect x="0" y="108" width="72" height="10" fill="#8a6a4a" />
    <rect x="0" y="108" width="72" height="1" fill="#6b4a3a" />
    <rect x="44" y="98" width="4" height="3" fill="#d63a4a" />
    <rect x="45" y="101" width="2" height="2" fill="#f4f4f4" />
  </g>
);

const Gunung = () => (
  <g>
    <Mountain cx={20} top={50} h={51} hw={30} color="#7b8fb5" snow />
    <Mountain cx={54} top={42} h={59} hw={32} color="#6d82aa" snow />
    <Mountain cx={72} top={66} h={35} hw={18} color="#8a9cc0" />
    <rect x="0" y="88" width="72" height="13" fill="#4fb06a" />
    <Pine x={6} y={76} />
    <Pine x={60} y={72} />
    <Pine x={67} y={84} />
    <rect x="0" y="101" width="72" height="27" fill="#4fb06a" />
    <rect x="0" y="101" width="72" height="2" fill="#3f9e5a" />
    <rect x="0" y="110" width="72" height="8" fill="#b89a6a" />
    <rect x="56" y="100" width="8" height="4" fill="#8a93a8" />
    <rect x="62" y="98" width="6" height="6" fill="#8a93a8" />
  </g>
);

const PlaceBody = ({ place, time, frame }) => {
  if (place === "jalan") return <Jalan time={time} />;
  if (place === "taman") return <Taman />;
  if (place === "desa") return <Desa />;
  if (place === "pantai") return <Pantai frame={frame} />;
  if (place === "hutan") return <Hutan />;
  if (place === "gunung") return <Gunung />;
  return <Kota time={time} />;
};

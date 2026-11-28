import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/PressStart2P";
import { loadFont as loadHand } from "@remotion/google-fonts/PatrickHand";
import { Cast, S as CHAR_S, STRIDE, CF, DEFAULT_KARAKTER } from "./Char";
import { Interior, INTERIORS } from "./Places";
import { Outdoor, OUTDOORS } from "./Outdoor";
import { StickBg, StickCast } from "./Stick";
import { SceneCtx, Mood, Particles, CUACA, MOODS } from "./Weather";

const { fontFamily } = loadFont();
const handFont = loadHand().fontFamily;

const Pan = ({ sc, children }) => {
  const m = sc % 72;
  return (
    <g>
      <g transform={`translate(${-m}, 0)`}>{children}</g>
      <g transform={`translate(${72 - m}, 0)`}>{children}</g>
    </g>
  );
};

const SKIES = {
  pagi: ["#9fdcf0", "#b9e8f2", "#d4f0e4", "#f0f2c8", "#ffe9a8", "#ffd98a", "#ffc971"],
  siang: ["#2f8fe0", "#41a6f6", "#5db6f8", "#73c6f9", "#8fd3fb", "#a8e0fc", "#c0ecfd"],
  senja: ["#1a1c2c", "#2e1f3f", "#5d275d", "#8a3260", "#b13e53", "#d95f55", "#ef7d57"],
  malam: ["#0b0c1a", "#10122a", "#161a3a", "#1c2148", "#232958", "#2a3068", "#313878"],
};
const TINT = {
  pagi: ["#ffe9a8", 0.08],
  siang: ["#ffffff", 0],
  senja: ["#5d275d", 0.22],
  malam: ["#0b0c2a", 0.45],
};
const SUN = {
  pagi: [136, 118, "#fff2c2"],
  siang: [136, 22, "#fff7d6"],
  senja: [124, 140, "#ffcd75"],
  malam: [136, 22, "#f4f4f4"],
};
const BUILDINGS = [
  [0, 26, 70], [26, 20, 100], [46, 30, 60], [76, 18, 120],
  [94, 28, 80], [122, 20, 110], [142, 38, 66],
];
const STARS = [[12, 8], [40, 22], [70, 10], [100, 30], [130, 14], [160, 26], [25, 46], [150, 52], [85, 55]];
const CLOUDS = [[18, 50], [104, 76], [52, 108]];
const PLACES = [...INTERIORS, ...OUTDOORS];

const Sky = ({ time, frame }) => {
  const [sx, sy, sc] = SUN[time];
  return (
    <g>
      {SKIES[time].map((c, i) => (
        <rect key={i} x="0" y={i * 38} width="180" height="38" fill={c} />
      ))}
      {time === "malam" &&
        STARS.map(([x, y], i) =>
          (frame + i * 9) % 36 < 28 ? (
            <rect key={i} x={x} y={y} width="2" height="2" fill="#f4f4f4" />
          ) : null
        )}
      <rect x={sx + 2} y={sy} width="12" height="16" fill={sc} />
      <rect x={sx} y={sy + 2} width="16" height="12" fill={sc} />
      {(time === "pagi" || time === "siang") &&
        CLOUDS.map(([cx, cy], i) => {
          const x = cx + Math.floor(frame / 10);
          return (
            <g key={i}>
              <rect x={x} y={cy} width="30" height="8" fill="#ffffff" />
              <rect x={x + 6} y={cy - 6} width="18" height="6" fill="#ffffff" />
            </g>
          );
        })}
    </g>
  );
};

const City = ({ time }) => {
  const lit = time === "malam" || time === "senja";
  return (
    <g>
      {BUILDINGS.map(([bx, bw, bh], i) => (
        <g key={i}>
          <rect x={bx} y={262 - bh} width={bw} height={bh} fill="#5f6f94" />
          {Array.from({ length: Math.floor(bw / 8) }).map((_, c) =>
            Array.from({ length: Math.floor(bh / 12) }).map((_, r) =>
              (i + c * 3 + r * 5) % 3 !== 0 ? (
                <rect
                  key={c + "-" + r}
                  x={bx + 3 + c * 8}
                  y={262 - bh + 5 + r * 12}
                  width="3"
                  height="5"
                  fill={lit ? "#ffcd75" : "#c9defa"}
                />
              ) : null
            )
          )}
        </g>
      ))}
      <rect x="0" y="262" width="180" height="58" fill="#3a4258" />
      <rect x="0" y="262" width="180" height="3" fill="#566078" />
    </g>
  );
};

const Park = () => (
  <g>
    <rect x="0" y="200" width="70" height="62" fill="#3b8f4a" />
    <rect x="40" y="188" width="90" height="74" fill="#2f7a3f" />
    <rect x="110" y="205" width="70" height="57" fill="#3b8f4a" />
    {[[14, 140], [146, 132]].map(([tx, ty], i) => (
      <g key={i}>
        <rect x={tx + 8} y={ty + 40} width="8" height={262 - (ty + 40)} fill="#5c3b24" />
        <rect x={tx} y={ty + 10} width="24" height="32" fill="#1e6b3a" />
        <rect x={tx + 4} y={ty} width="16" height="12" fill="#1e6b3a" />
      </g>
    ))}
    <rect x="0" y="262" width="180" height="58" fill="#38b764" />
    <rect x="0" y="262" width="180" height="4" fill="#2f9e57" />
    {[[16, 280], [60, 300], [110, 285], [150, 305], [170, 275]].map(([fx, fy], i) => (
      <rect key={i} x={fx} y={fy} width="3" height="3" fill={["#ef7d57", "#f4f4f4", "#ffcd75"][i % 3]} />
    ))}
  </g>
);

const House = ({ time }) => {
  const sky = SKIES[time];
  const lamp = time === "malam" || time === "senja";
  return (
    <g>
      <rect x="0" y="0" width="180" height="262" fill="#f2d9b6" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={i * 16 + 8} y="0" width="2" height="230" fill="#e6c79c" />
      ))}
      <rect x="104" y="36" width="56" height="70" fill="#5c3b24" />
      <rect x="108" y="40" width="48" height="31" fill={sky[1]} />
      <rect x="108" y="71" width="48" height="31" fill={sky[4]} />
      <rect x="130" y="40" width="4" height="62" fill="#5c3b24" />
      <rect x="108" y="69" width="48" height="4" fill="#5c3b24" />
      <rect x="22" y="52" width="40" height="30" fill="#5c3b24" />
      <rect x="26" y="56" width="32" height="22" fill="#73eff7" />
      <rect x="26" y="68" width="32" height="10" fill="#38b764" />
      <rect x="0" y="230" width="180" height="90" fill="#b5835a" />
      <rect x="0" y="230" width="180" height="4" fill="#8a5a3a" />
      {[246, 262, 278, 294, 310].map((y) => (
        <rect key={y} x="0" y={y} width="180" height="2" fill="#a0714a" />
      ))}
      <rect x="20" y="256" width="140" height="34" fill="#b13e53" />
      <rect x="24" y="260" width="132" height="26" fill="#ef7d57" />
      <rect x="85" y="170" width="3" height="62" fill="#5c3b24" />
      <rect x="78" y="150" width="17" height="20" fill={lamp ? "#ffcd75" : "#e8dcc0"} />
    </g>
  );
};

const Scene = ({ text, audio, voice, duration, place, time, action, prop, cuaca, mood, walkStart, pembawa, karakter, bicara, ekspresi, reaksi, gaya }) => {
  const frame = useCurrentFrame();
  const chars = karakter && karakter.length ? karakter : DEFAULT_KARAKTER;
  const spIdx = Number.isInteger(bicara) ? Math.min(Math.max(bicara, 0), chars.length - 1) : voice.includes("Gadis") ? 1 : 0;
  const nama = String((chars[spIdx] && chars[spIdx].nama) || (spIdx === 1 ? "Gadis" : "Ardi")).toUpperCase();
  const male = spIdx === 0;
  const stk = gaya === "stick" || gaya === "papan";
  const t = SKIES[time] ? time : "senja";
  const p = PLACES.includes(place) ? place : "kota";
  const cu = CUACA.includes(cuaca) ? cuaca : "cerah";
  const mo = MOODS.includes(mood) ? mood : "normal";
  const count = Math.floor(
    interpolate(frame, [0, duration * 0.7], [0, text.length], {
      extrapolateRight: "clamp",
    })
  );
  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1c2c" }}>
      <Audio src={staticFile(audio)} />
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 72 128"
        shapeRendering="crispEdges"
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <SceneCtx.Provider value={{ cuaca: cu }}><Pan sc={action === "jalan" ? ((walkStart + frame) * CHAR_S * STRIDE) / CF : 0}>{stk ? <StickBg place={p} time={t} variant={gaya} frame={frame} /> : INTERIORS.includes(p) ? <Interior place={p} time={t} /> : <Outdoor place={p} time={t} frame={frame} />}</Pan></SceneCtx.Provider>
        
        {!stk && <rect x="0" y="0" width="72" height="128" fill={TINT[t][0]} opacity={TINT[t][1]} />}
        <Mood mood={mo} />
        {stk ? <StickCast frame={frame} time={t} variant={gaya} karakter={karakter} bicara={spIdx} ekspresi={ekspresi} reaksi={reaksi} action={action} prop={prop} pembawa={pembawa} walkStart={walkStart} /> : <Cast frame={frame} karakter={karakter} bicara={spIdx} ekspresi={ekspresi} reaksi={reaksi} action={action} prop={prop} pembawa={pembawa} walkStart={walkStart} />}
        {!INTERIORS.includes(p) && <Particles cuaca={cu} frame={frame} />}
        
      </svg>
      <div
        style={{
          position: "absolute",
          left: 36,
          right: 36,
          bottom: 90,
          background: "rgba(16, 18, 40, 0.88)",
          color: "#f4f4f4",
          border: "6px solid #ef7d57",
          boxShadow: "0 8px 0 #5d275d",
          padding: "22px 30px",
          fontFamily: stk ? handFont : fontFamily,
          fontSize: 32,
          lineHeight: 1.65,
        }}
      >
        <div style={{ fontSize: 26, marginBottom: 14, color: ["#73c6f9", "#ff8fb0", "#a8f070"][spIdx] }}>
          {nama}
        </div>
        <span>{text.slice(0, count)}</span>
        <span style={{ opacity: 0 }}>{text.slice(count)}</span>
      </div>
    </AbsoluteFill>
  );
};

export const Video = ({ story }) => {
  const { fps } = useVideoConfig();
  let start = 0;
  let walked = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1c2c" }}>
      {story.scenes.map((scene, i) => {
        const duration = Math.round(scene.seconds * fps);
        const from = start;
        start += duration;
        const wk = walked;
        if (scene.action === "jalan") walked += duration;
        return (
          <Sequence key={i} from={from} durationInFrames={duration}>
            <Scene
              text={scene.text}
              audio={scene.audio}
              voice={scene.voice || ""}
              duration={duration}
              place={scene.place}
              time={scene.time}
              action={scene.action}
              prop={scene.prop}
              cuaca={scene.cuaca}
              walkStart={wk}
              pembawa={scene.pembawa}
              karakter={story.karakter}
              gaya={story.gaya}
              bicara={scene.pembicara}
              ekspresi={scene.ekspresi}
              reaksi={scene.reaksi}
              mood={scene.mood}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

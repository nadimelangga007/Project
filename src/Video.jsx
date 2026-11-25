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

const Scene = ({ text, audio }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1c2c",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <Audio src={staticFile(audio)} />
      <div
        style={{
          opacity,
          color: "#f4f4f4",
          fontFamily: "monospace",
          fontSize: 96,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const Video = ({ story }) => {
  const { fps } = useVideoConfig();
  let start = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1c2c" }}>
      {story.scenes.map((scene, i) => {
        const duration = Math.round(scene.seconds * fps);
        const from = start;
        start += duration;
        return (
          <Sequence key={i} from={from} durationInFrames={duration}>
            <Scene text={scene.text} audio={scene.audio} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

import React from "react";
import { Composition } from "remotion";
import { Video } from "./Video";
import story from "../data/timeline.json";

export const Root = () => {
  const fps = story.fps;
    const total = story.scenes.reduce(
        (sum, s) => sum + Math.round(s.seconds * fps),
            0
              );
                return (
                    <Composition
                          id="Main"
                                component={Video}
                                      durationInFrames={total}
                                            fps={fps}
                                                  width={1080}
                                                        height={1920}
                                                              defaultProps={{ story }}
                                                                  />
                                                                    );
                                                                    };
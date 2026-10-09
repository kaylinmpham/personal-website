"use client";

import type { VideoHTMLAttributes } from "react";

/** Autoplaying muted video that loops from `start` seconds instead of 0. */
export default function LoopingVideo({
  start = 0,
  ...props
}: VideoHTMLAttributes<HTMLVideoElement> & { start?: number }) {
  return (
    <video
      {...props}
      src={start ? `${props.src}#t=${start}` : props.src}
      autoPlay
      muted
      playsInline
      loop={!start}
      onEnded={(event) => {
        event.currentTarget.currentTime = start;
        event.currentTarget.play();
      }}
    />
  );
}

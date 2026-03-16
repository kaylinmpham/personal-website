"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * FluidCursor — a laggy, spring-physics cursor follower.
 * Shows a small dot that smoothly chases the real pointer.
 * Hidden on touch devices via pointer media query.
 */
export default function FluidCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring — slower, more lag
  const springX = useSpring(mouseX, { stiffness: 100, damping: 22, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 22, mass: 0.5 });

  // Inner dot — snappier
  const dotX = useSpring(mouseX, { stiffness: 300, damping: 28, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 300, damping: 28, mass: 0.3 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{ left: springX, top: springY }}
        className="
          pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2
          w-8 h-8 rounded-full border border-terracotta/40
          hidden [@media(pointer:fine)]:block
        "
        aria-hidden="true"
      />
      {/* Inner dot */}
      <motion.div
        style={{ left: dotX, top: dotY }}
        className="
          pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2
          w-1.5 h-1.5 rounded-full bg-terracotta
          hidden [@media(pointer:fine)]:block
        "
        aria-hidden="true"
      />
    </>
  );
}

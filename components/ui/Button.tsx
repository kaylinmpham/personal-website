"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonVariant = "solid" | "outline" | "accent" | "highlight";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  noMotion?: boolean;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const base =
  "inline-flex items-center justify-center gap-2 font-sans text-xs font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-40 cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  solid: "border border-transparent bg-muted text-white hover:bg-accent/50",
  accent:
    "border border-transparent bg-accent text-white hover:bg-accent-hover",
  highlight:
    "border border-highlight-fg/75 text-highlight-fg bg-highlight hover:border-highlight-fg hover:text-highlight-fg",
  outline:
    "border border-subtle/75 text-subtle bg-transparent hover:border-ink hover:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2",
  md: "px-6 py-3",
  lg: "px-8 py-4 text-sm",
};

// ─── Spring config ────────────────────────────────────────────────────────────

const spring = { type: "spring", stiffness: 400, damping: 17 } as const;

// ─── Component ────────────────────────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      size = "md",
      asChild = false,
      noMotion = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(base, variants[variant], sizes[size], className);

    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    if (noMotion) {
      return (
        <button ref={ref} className={classes} {...props}>
          {children}
        </button>
      );
    }

    // Cast props: motion.button expects motion-compatible props
    const { onDrag, onDragEnd, onDragStart, onAnimationStart, ...buttonProps } =
      props as ButtonProps & Partial<HTMLMotionProps<"button">>;

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={spring}
        {...buttonProps}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };

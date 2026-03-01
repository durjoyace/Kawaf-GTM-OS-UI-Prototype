"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

const defaultViewport = { once: true, margin: "-40px" as const };

function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className,
  y = 24,
}: FadeInProps) {
  const mounted = useHasMounted();
  return (
    <motion.div
      initial={mounted ? { opacity: 0, y } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type StaggerChildrenProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  ...props
}: StaggerChildrenProps) {
  const mounted = useHasMounted();
  return (
    <motion.div
      initial={mounted ? "hidden" : false}
      whileInView="visible"
      viewport={defaultViewport}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type SlideInProps = {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
};

export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className,
}: SlideInProps) {
  const mounted = useHasMounted();
  const x = direction === "left" ? -40 : 40;
  return (
    <motion.div
      initial={mounted ? { opacity: 0, x } : false}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={defaultViewport}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

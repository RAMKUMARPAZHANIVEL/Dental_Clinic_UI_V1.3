"use client";
import { MotionConfig } from "framer-motion";

// Wraps the whole app so every Framer Motion element automatically
// respects the OS "reduce motion" preference without touching each component.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

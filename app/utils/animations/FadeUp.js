"use client";
import { motion } from "framer-motion";

// Fades content up when it enters the viewport.
// Reduced motion is handled globally by MotionProvider (MotionConfig reducedMotion="user").
export default function FadeUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

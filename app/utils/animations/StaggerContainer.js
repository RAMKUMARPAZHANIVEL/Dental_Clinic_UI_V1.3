"use client";
import { motion } from "framer-motion";
import { container } from "./variants";

// Staggers children in when the container enters the viewport.
// Reduced motion is handled globally by MotionProvider (MotionConfig reducedMotion="user").
export default function StaggerContainer({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

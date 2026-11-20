"use client";

export const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export const fadeRightToLeft = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0 },
};

export const fadeLeftToRight = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0 },
};

export const smoothTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

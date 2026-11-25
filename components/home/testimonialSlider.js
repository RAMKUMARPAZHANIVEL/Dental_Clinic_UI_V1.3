"use client";

import { useEffect, useRef, useState } from "react";

import { testimonials } from "../../app/utils/config";

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (paused) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
    return stopAutoSlide;
  }, [paused]);

  return (
    <div
      role="region"
      aria-label="Patient testimonials"
      className="relative max-w-full md:max-w-xl mx-auto overflow-hidden"
      onMouseEnter={() => { if (!paused) stopAutoSlide(); }}
      onMouseLeave={() => { if (!paused) startAutoSlide(); }}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {testimonials.map((t, i) => (
          <div key={i} className="min-w-full px-4" aria-hidden={i !== index}>
            <div className="bg-white rounded-2xl shadow-lg px-12 py-16 text-center">
              <p className="text-gray-700 mb-8">"{t.review}"</p>
              <p className="font-semibold text-lg [font-family:var(--font-heading)]">{t.name}</p>
              <p className="text-sm text-blue-600">{t.treatment}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <span
              className={`h-2 rounded-full transition-all ${
                index === i ? "bg-primary w-6" : "bg-gray-300 w-2"
              }`}
            />
          </button>
        ))}

        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Resume auto-play" : "Pause auto-play"}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-gray-600 transition ml-2"
        >
          {paused ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

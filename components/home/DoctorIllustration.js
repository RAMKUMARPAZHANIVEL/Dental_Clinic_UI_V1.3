'use client';
import { useState, useEffect } from 'react';

export default function DoctorIllustration() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setShow(mq.matches);
    const handler = (e) => setShow(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!show) return null;

  return (
    <img
      src="/images/doctor_profile.svg"
      alt="Illustration of a dentist holding dental instruments"
      className="w-80"
      width={320}
      height={408}
    />
  );
}

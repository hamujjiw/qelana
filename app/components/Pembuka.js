'use client';

import { useState, useEffect, useCallback } from 'react';

const KUNCI = 'qelana-pembuka';
const DURASI = 2450;

export default function Pembuka() {
  const [tahap, setTahap] = useState('cek');

  useEffect(() => {
    let lewati = false;
    try {
      if (sessionStorage.getItem(KUNCI) === '1') lewati = true;
    } catch (e) {
      lewati = false;
    }
    const kurangGerak =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (lewati || kurangGerak) {
      setTahap('selesai');
      return;
    }

    setTahap('main');
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => tutup(), DURASI);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tutup = useCallback(() => {
    try { sessionStorage.setItem(KUNCI, '1'); } catch (e) { /* abaikan */ }
    document.body.style.overflow = '';
    setTahap('selesai');
  }, []);

  useEffect(() => {
    if (tahap !== 'main') return;
    const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') tutup(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tahap, tutup]);

  if (tahap !== 'main') return null;

  return (
    <div className="pembuka" role="presentation" onClick={tutup}>
      <svg className="pembuka-svg" viewBox="0 0 210 210" aria-hidden="true">
        <circle
          className="pb-cincin"
          cx="105" cy="105" r="62"
          fill="none" stroke="#ECEFE7" strokeWidth="20"
          strokeDasharray="357.1 32.5" strokeDashoffset="-64.9"
        />
        <line
          className="pb-ekor"
          x1="184.2" y1="184.2" x2="137.5" y2="137.5"
          stroke="#E8622C" strokeWidth="20"
        />
        <g className="pb-pesawat">
          <path
            d="M0 -9.5 L22 0 L0 9.5 L5.5 0 Z"
            fill="#ECEFE7"
            transform="rotate(-135)"
          />
        </g>
        <text className="pb-teks" x="105" y="99" textAnchor="middle">LET&apos;S GO</text>
        <text className="pb-teks" x="105" y="117" textAnchor="middle">ABROAD</text>
      </svg>
      <button type="button" className="pembuka-lewat" onClick={tutup}>Lewati</button>
    </div>
  );
}

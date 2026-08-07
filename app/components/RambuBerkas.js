'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const KUNCI = ['bidang', 'benua', 'loa', 'kerja', 'ikat'];

function Dalam({ tahap, kembaliKe, labelKembali }) {
  const sp = useSearchParams();
  const p = new URLSearchParams();
  KUNCI.forEach((k) => { const v = sp.get(k); if (v) p.set(k, v); });
  const qs = p.toString();
  const href = qs ? `${kembaliKe}?${qs}` : kembaliKe;

  const nama = ['1 Saring', '2 Pilih', '3 Berkas', '4 Program'];
  return (
    <div className="rambu">
      <div className="wrap">
        <div className="langkah">
          {nama.map((n, i) => (
            <i key={n} className={i < tahap ? 'lewat' : i === tahap ? 'on' : ''}>{n}</i>
          ))}
        </div>
        <Link className="keluar" href={href}>{labelKembali}</Link>
      </div>
    </div>
  );
}

export default function RambuBerkas(props) {
  return (
    <Suspense fallback={<div className="rambu"><div className="wrap" /></div>}>
      <Dalam {...props} />
    </Suspense>
  );
}

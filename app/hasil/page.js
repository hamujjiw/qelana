'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BEASISWA, BIDANG, STATUS, saring, DEFAULT_JAWABAN } from '../../lib/data';

const SAH = {
  bidang: ['', 'si', 'ti', 'ar', 'hi', 'km'],
  benua: ['semua', 'Asia', 'Eropa', 'Amerika', 'Oseania'],
  loa: ['abai', 'punya', 'belum'],
  kerja: ['abai', '0', '2'],
  ikat: ['abai', 'tolak'],
};

function bersihkan(sp) {
  const out = { ...DEFAULT_JAWABAN };
  Object.keys(SAH).forEach((k) => {
    const v = sp.get(k);
    if (v !== null && SAH[k].includes(v)) out[k] = v;
  });
  return out;
}

function Papan() {
  const sp = useSearchParams();
  const jwb = useMemo(() => bersihkan(sp), [sp]);
  const qs = useMemo(() => {
    const p = new URLSearchParams();
    Object.entries(jwb).forEach(([k, v]) => { if (v) p.set(k, v); });
    return p.toString();
  }, [jwb]);

  const hasil = useMemo(() => saring(jwb), [jwb]);

  const grup = useMemo(() => {
    const g = {};
    hasil.forEach((d) => {
      const key = d.b === 'semua' ? 'Lintas negara' : d.b;
      (g[key] = g[key] || []).push(d);
    });
    return g;
  }, [hasil]);

  const label = [];
  if (jwb.bidang) label.push(['Jurusan', BIDANG[jwb.bidang]]);
  label.push(['Tujuan', jwb.benua === 'semua' ? 'semua benua' : jwb.benua]);
  if (jwb.loa === 'belum') label.push(['Tanpa perlu', 'LoA di awal']);
  if (jwb.kerja === '0') label.push(['Tanpa', 'syarat kerja']);
  if (jwb.ikat === 'tolak') label.push(['Tanpa', 'ikatan']);

  return (
    <main className="layar gelap-t">
      <div className="rambu">
        <div className="wrap">
          <div className="langkah">
            <i className="lewat">1 Saring</i><i className="on">2 Pilih</i><i>3 Berkas</i><i>4 Program</i>
          </div>
          <Link className="keluar" href="/saring">Ubah jawaban</Link>
        </div>
      </div>

      <div className="isi">
        <div className="wrap">
          <div className="papan-kepala">
            <h1 className="disp">
              {hasil.length ? `${hasil.length} beasiswa terbuka buat kamu` : 'Nggak ada yang cocok'}
            </h1>
            <div className="ringkas">
              {label.map(([a, b], i) => (
                <span key={i}>{a} <b>{b}</b></span>
              ))}
            </div>
          </div>

          {hasil.length === 0 ? (
            <div className="kosong">
              Kombinasi jawaban kamu terlalu ketat. Coba longgarkan satu hal, misalnya buka lagi
              pilihan benua atau terima kemungkinan ikatan dinas.
            </div>
          ) : (
            Object.entries(grup).map(([nama, arr]) => (
              <div className="benua-blok" key={nama}>
                <div className="benua-tajuk">
                  <h2>{nama}</h2>
                  <span>{arr.length} beasiswa</span>
                </div>
                {arr.map((d) => (
                  <Link className="baris" key={d.slug} href={`/beasiswa/${d.slug}/?${qs}`}>
                    <span>
                      <span className="nm">{d.k}</span>
                      <span className="ng">{d.ng}</span>
                    </span>
                    <span className="tg">{d.td}</span>
                    <span className={`st ${d.st}`}>{STATUS[d.st]}</span>
                    <span className="pnh" aria-hidden="true">&rarr;</span>
                  </Link>
                ))}
              </div>
            ))
          )}

          <div className="navi papan-navi">
            <Link className="tbl" href="/saring">Ubah jawaban</Link>
            <span className="sisa">Klik salah satu buat lihat detailnya</span>
          </div>
        </div>
      </div>

      <div className="nota">
        <div className="wrap">
          <h4>Cara papan ini disusun</h4>
          <div className="nota-grid">
            <div>
              <b>Bukan peringkat</b>
              <p>Urutannya ikut kedekatan tenggat, bukan prestise. Yang lagi dibuka selalu naik ke atas.</p>
            </div>
            <div>
              <b>Yang lewat tetap muncul</b>
              <p>Beasiswa yang tenggatnya sudah lewat tetap ditampilkan, karena siklusnya berulang tahun depan.</p>
            </div>
            <div>
              <b>Dikelompokkan per benua</b>
              <p>Biar gampang membandingkan biaya hidup dan jarak di kawasan yang sama.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Hasil() {
  return (
    <Suspense fallback={<div className="memuat">Menyiapkan hasil...</div>}>
      <Papan />
    </Suspense>
  );
}

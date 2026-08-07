'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PERTANYAAN, BEASISWA, DEFAULT_JAWABAN } from '../../lib/data';

export default function Saring() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [jwb, setJwb] = useState(DEFAULT_JAWABAN);

  const q = PERTANYAAN[idx];
  const terjawab = Boolean(jwb[q.k]);
  const terakhir = idx === PERTANYAAN.length - 1;

  const pilih = useCallback((v) => setJwb((s) => ({ ...s, [q.k]: v })), [q.k]);

  const maju = useCallback(() => {
    if (!terjawab) return;
    if (!terakhir) {
      setIdx((i) => i + 1);
      window.scrollTo(0, 0);
      return;
    }
    const qs = new URLSearchParams({
      bidang: jwb.bidang,
      benua: jwb.benua,
      loa: jwb.loa,
      kerja: jwb.kerja,
      ikat: jwb.ikat,
    }).toString();
    router.push(`/hasil?${qs}`);
  }, [terjawab, terakhir, jwb, router]);

  const mundur = useCallback(() => {
    if (idx > 0) {
      setIdx((i) => i - 1);
      window.scrollTo(0, 0);
    }
  }, [idx]);

  return (
    <main className="layar gelap">
      <div className="rambu">
        <div className="wrap">
          <div className="langkah">
            <i className="on">1 Saring</i><i>2 Pilih</i><i>3 Berkas</i><i>4 Program</i>
          </div>
          <Link className="keluar" href="/">Batal</Link>
        </div>
      </div>

      <div className="isi">
        <div className="wrap">
          <div className="tanya">
            <p className="no">Pertanyaan {idx + 1} dari {PERTANYAAN.length}</p>
            <h1 className="disp">{q.t}</h1>
            <p className="bantu">{q.b}</p>
            <div className="opsi">
              {q.o.map(([v, label]) => {
                const jml = q.k === 'bidang'
                  ? BEASISWA.filter((d) => d.bid.includes(v)).length
                  : null;
                return (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={jwb[q.k] === v}
                    onClick={() => pilih(v)}
                  >
                    <span className="tik" aria-hidden="true" />
                    {label}
                    {jml !== null && <small>{jml} beasiswa</small>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="navi">
            <button type="button" className="tbl" onClick={mundur} disabled={idx === 0}>
              Balik
            </button>
            <span className="sisa">{terjawab ? '' : 'Pilih satu dulu'}</span>
            <button type="button" className="tbl utama" onClick={maju} disabled={!terjawab}>
              {terakhir ? 'Lihat hasil' : 'Lanjut'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BIDANG } from '../../lib/data';

const KUNCI = ['bidang', 'benua', 'loa', 'kerja', 'ikat'];
const SAH_BID = ['si', 'ti', 'ar', 'hi', 'km'];

function Dalam({ slug, negara, prog }) {
  const sp = useSearchParams();

  const qs = useMemo(() => {
    const p = new URLSearchParams();
    KUNCI.forEach((k) => { const v = sp.get(k); if (v) p.set(k, v); });
    return p.toString();
  }, [sp]);

  const dariUrl = sp.get('bidang');
  const awal = dariUrl && SAH_BID.includes(dariUrl) && prog.some((p) => p.bid === dariUrl)
    ? dariUrl
    : null;

  const [pilih, setPilih] = useState(awal);
  useEffect(() => { setPilih(awal); }, [awal]);

  const adaBidang = useMemo(
    () => SAH_BID.filter((b) => prog.some((p) => p.bid === b)),
    [prog]
  );

  const tampil = pilih ? prog.filter((p) => p.bid === pilih) : prog;

  return (
    <>
      {adaBidang.length > 1 && (
        <div className="saring-bid" role="group" aria-label="Saring berdasarkan bidang">
          <button type="button" aria-pressed={!pilih} onClick={() => setPilih(null)}>
            Semua bidang
          </button>
          {adaBidang.map((b) => (
            <button key={b} type="button" aria-pressed={pilih === b} onClick={() => setPilih(b)}>
              {BIDANG[b]}
            </button>
          ))}
        </div>
      )}

      {tampil.length > 0 ? (
        <div className="kartu-grid">
          {tampil.map((p) => (
            <Link
              className="kp"
              key={p.slug}
              href={qs ? `/beasiswa/${slug}/${p.slug}/?${qs}` : `/beasiswa/${slug}/${p.slug}/`}
            >
              <span className="atas">
                <span className="bid">{BIDANG[p.bid]}</span>
                <span className="neg">{negara}</span>
              </span>
              <h4>{p.n}</h4>
              <p className="kmp">{p.kmp}</p>
              <span className="kaki">
                <span>{p.dur} · {p.bhs}</span>
                <span className="ar" aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="tak-ada">
          <b>Belum ada program terdata untuk bidang ini</b>
          Beasiswanya memang membuka bidang ini, tapi kami belum mengumpulkan program spesifiknya.
          Sementara ini cek langsung di situs resminya.
        </div>
      )}
    </>
  );
}

export default function KatalogProgram(props) {
  return (
    <Suspense fallback={<div className="tak-ada">Memuat daftar program...</div>}>
      <Dalam {...props} />
    </Suspense>
  );
}

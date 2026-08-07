import { notFound } from 'next/navigation';
import { BEASISWA, cariBeasiswa } from '../../../lib/data';
import RambuBerkas from '../../components/RambuBerkas';
import KatalogProgram from '../../components/KatalogProgram';

export function generateStaticParams() {
  return BEASISWA.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const d = cariBeasiswa(params.slug);
  if (!d) return { title: 'Beasiswa tidak ditemukan' };
  return {
    title: `${d.k} — syarat, tenggat, dan program studi`,
    description: d.intro,
    openGraph: { title: `${d.k} · ${d.ng}`, description: d.intro },
  };
}

export default function Berkas({ params }) {
  const d = cariBeasiswa(params.slug);
  if (!d) notFound();

  return (
    <main className="layar terang">
      <RambuBerkas tahap={2} kembaliKe="/hasil" labelKembali="Balik ke daftar" />

      <div className="isi">
        <div className="wrap">
          <div className="berkas">
            <p className="knt">{d.b === 'semua' ? 'Lintas negara' : d.b} · {d.ng}</p>
            <h1 className="disp">{d.k}</h1>
            <p className="intro">{d.intro}</p>

            <div className="fakta-baris">
              {d.fk.map(([a, b]) => (
                <div className="fk" key={a}><span>{a}</span><b>{b}</b></div>
              ))}
            </div>

            <div className="awas">
              <b>Yang paling sering bikin gugur</b>
              <p>{d.awas}</p>
            </div>

            <section className="seksi">
              <h3>Program yang bisa kamu ambil</h3>
              <p className="sk">{d.pcat}</p>
              <KatalogProgram slug={d.slug} negara={d.ng} prog={d.prog} />
            </section>

            <section className="seksi">
              <h3>Yang harus kamu punya</h3>
              <ul className="ceklis">
                {d.ceklis.map(([ok, teks, ket], i) => (
                  <li key={i}>
                    <span className={`kk ${ok ? 'ok' : ''}`} aria-hidden="true">{ok ? '✓' : ''}</span>
                    <p>{teks}{ket ? <em>{ket}</em> : null}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="seksi">
              <h3>Urutan waktunya</h3>
              <ul className="linimasa">
                {d.waktu.map(([kapan, apa, kini], i) => (
                  <li key={i} className={kini ? 'kini' : ''}>
                    <b>{kapan}</b><span>{apa}</span>
                  </li>
                ))}
              </ul>
            </section>

            <a className="tautan" href={`https://${d.u}`} target="_blank" rel="noopener noreferrer">
              Buka {d.u} <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

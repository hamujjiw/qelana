import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BEASISWA, BIDANG, cariProgram } from '../../../../lib/data';
import RambuBerkas from '../../../components/RambuBerkas';

export function generateStaticParams() {
  const out = [];
  BEASISWA.forEach((d) => d.prog.forEach((p) => out.push({ slug: d.slug, prodi: p.slug })));
  return out;
}

export function generateMetadata({ params }) {
  const { beasiswa, program } = cariProgram(params.slug, params.prodi);
  if (!beasiswa || !program) return { title: 'Program tidak ditemukan' };
  return {
    title: `${program.n} di ${program.kmp}`,
    description: program.d,
    openGraph: { title: `${program.n} · ${program.kmp}`, description: program.d },
  };
}

export default function Program({ params }) {
  const { beasiswa: d, program: p } = cariProgram(params.slug, params.prodi);
  if (!d || !p) notFound();

  const lain = d.prog.filter((x) => x.slug !== p.slug).slice(0, 4);

  return (
    <main className="layar terang">
      <RambuBerkas tahap={3} kembaliKe={`/beasiswa/${d.slug}/`} labelKembali="Balik ke beasiswa" />

      <div className="isi">
        <div className="wrap">
          <div className="prog">
            <p className="knt">{BIDANG[p.bid]} · {d.ng}</p>
            <h1 className="disp">{p.n}</h1>
            <p className="dari">
              <b>{p.kmp}</b> · didanai lewat{' '}
              <Link href={`/beasiswa/${d.slug}/`} style={{ textDecoration: 'underline' }}>{d.k}</Link>
            </p>

            <div className="blok-t"><p>{p.d}</p></div>

            <div className="rinci">
              <div><span>Durasi</span><b>{p.dur}</b></div>
              <div><span>Bahasa pengantar</span><b>{p.bhs}</b></div>
              <div><span>Tenggat beasiswa</span><b>{d.td}</b></div>
              <div><span>Jenjang</span><b>Pascasarjana</b></div>
            </div>

            <section className="seksi">
              <h3>Yang perlu kamu tahu</h3>
              <ul className="poin">
                {p.p.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </section>

            {lain.length > 0 && (
              <section className="seksi">
                <h3>Program lain di beasiswa yang sama</h3>
                <div className="lain">
                  {lain.map((x) => (
                    <Link key={x.slug} href={`/beasiswa/${d.slug}/${x.slug}/`}>
                      {x.n.length > 46 ? `${x.n.slice(0, 46)}...` : x.n}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <a className="tautan" href={`https://${d.u}`} target="_blank" rel="noopener noreferrer">
              Cek daftar program resminya <span aria-hidden="true">&#8599;</span>
            </a>

            <p className="catat-kecil">
              Daftar program di sini hasil kurasi manual dan bukan daftar lengkap.
              <br />
              Penyelenggara memperbarui katalog programnya tiap tahun, jadi selalu cek ulang di situs
              resmi sebelum menyusun rencana.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

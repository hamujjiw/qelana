import Link from 'next/link';
import { BEASISWA, TOTAL_PROGRAM } from '../lib/data';
import Pembuka from './components/Pembuka';
import Merek from './components/Merek';

export default function Gerbang() {
  const benua = new Set(BEASISWA.map((d) => d.b).filter((b) => b !== 'semua'));
  return (
    <>
      <Pembuka />
      <main className="layar gelap">
        <div className="wrap kepala-merek">
          <Merek terang ukuran={32} />
        </div>
        <div className="gerbang">
          <div className="wrap">
            <p className="pra">Beasiswa S2 luar negeri · Agustus 2026</p>
            <h1 className="disp">
              Beasiswanya banyak. Yang <span>cocok buat kamu,</span> belum tentu.
            </h1>
            <p className="ket">
              Ada yang nggak menerima jurusan kamu. Ada yang minta surat penerimaan kampus duluan
              sebelum boleh daftar. Ada juga yang tenggatnya sudah lewat bulan ini. Jawab lima
              pertanyaan, nanti kelihatan mana yang masih masuk akal buat dikejar.
            </p>
            <div className="angka">
              <div><b>{BEASISWA.length}</b><span>Beasiswa</span></div>
              <div><b>{TOTAL_PROGRAM}</b><span>Program studi</span></div>
              <div><b>{benua.size}</b><span>Benua</span></div>
            </div>
            <Link className="mulai" href="/saring">
              Mulai <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="wrap">
          <p className="kaki-situs">
            Data dikurasi manual dari situs resmi penyelenggara, terakhir diperiksa Agustus 2026.
            <br />
            Tenggat berubah tiap tahun, jadi selalu cek ulang ke situs resmi sebelum mendaftar.
          </p>
        </div>
      </main>
    </>
  );
}

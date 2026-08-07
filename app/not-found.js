import Link from 'next/link';

export const metadata = { title: 'Halaman tidak ditemukan' };

export default function TidakKetemu() {
  return (
    <main className="layar gelap">
      <div className="gerbang">
        <div className="wrap">
          <p className="pra">Kode 404</p>
          <h1 className="disp">Halaman ini nggak ada.</h1>
          <p className="ket">
            Mungkin tautannya salah ketik, atau beasiswanya sudah dipindah. Coba mulai lagi dari
            penyaringan.
          </p>
          <div style={{ marginTop: 34 }}>
            <Link className="mulai" href="/">Balik ke awal <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </div>
      </div>
    </main>
  );
}

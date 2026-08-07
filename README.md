# Qelana

Penyaring beasiswa S2 luar negeri untuk pelamar Indonesia. Berisi 27 beasiswa dan 104 program studi
di Asia, Eropa, Amerika, dan Oseania, difokuskan pada lima jurusan: Sistem Informasi, Teknik
Informatika, Arsitektur, Ilmu Politik atau Hubungan Internasional, dan Ilmu Komunikasi.

## Cara menjalankan

```bash
npm install
npm run dev     # buka http://localhost:3000
npm run build   # hasil statis ada di folder out/
```

## Deploy ke Vercel

1. Push folder ini ke repo GitHub.
2. Di Vercel, pilih Add New Project lalu impor repo tersebut.
3. Framework terdeteksi otomatis sebagai Next.js. Biarkan semua pengaturan default, tekan Deploy.

Tidak ada environment variable yang wajib diisi. Satu yang opsional:

| Nama | Fungsi |
|---|---|
| `NEXT_PUBLIC_SITUS` | Domain untuk sitemap dan robots.txt. Isi setelah domain final ditentukan, misalnya `https://qelana.com`. Kalau kosong, dipakai domain default Vercel. |

## Alur halaman

| Rute | Isi |
|---|---|
| `/` | Gerbang, ringkasan angka, tombol mulai |
| `/saring` | Lima pertanyaan, satu per layar |
| `/hasil` | Papan hasil dikelompokkan per benua, filter dibawa lewat query string |
| `/beasiswa/[slug]` | Syarat, linimasa, dan katalog program studi |
| `/beasiswa/[slug]/[prodi]` | Deskripsi program studi |

Filter disimpan di query string, jadi halaman hasil bisa dibagikan lewat tautan dan tombol balik
browser tetap bekerja.

## Cara memperbarui data

Semua data ada di satu berkas: `lib/data.js`. Tidak ada basis data dan tidak ada scraping.

Struktur satu beasiswa:

```js
{
  slug: 'chevening',        // dipakai jadi URL, harus unik
  k: 'Chevening',           // nama tampil
  ng: 'Inggris',            // negara
  b: 'Eropa',               // benua: Asia, Eropa, Amerika, Oseania, atau semua
  bid: ['si','ti','ar','hi','km'],  // bidang yang dibuka
  loa: 1,                   // 1 kalau wajib punya LoA sebelum daftar
  kerja: 2,                 // minimum tahun pengalaman kerja, 0 kalau bebas
  ikat: 1,                  // 1 kalau ada ikatan pulang ke Indonesia
  td: '7 Oktober',          // tenggat tampil
  st: 'buka',               // buka, segera, atau tutup
  u: 'chevening.org',       // domain situs resmi, tanpa https
  intro, fk, ceklis, waktu, awas, pcat,
  prog: [ /* program studi */ ]
}
```

Yang paling sering perlu diubah tiap tahun adalah `td` dan `st`. Kode bidang: `si` Sistem Informasi,
`ti` Teknik Informatika, `ar` Arsitektur, `hi` Ilmu Politik atau HI, `km` Ilmu Komunikasi.

Setelah mengubah data, jalankan `npm run build` untuk memastikan tidak ada yang rusak. Halaman statis
dibuat otomatis dari slug, jadi menambah program baru langsung menghasilkan halamannya sendiri.

## Catatan penting soal isi

Daftar program studi di sini hasil kurasi manual dan bukan daftar lengkap. Penyelenggara beasiswa
memperbarui katalog programnya tiap tahun lewat course finder masing-masing, jadi setiap halaman
selalu menautkan ke situs resmi. Tanggal yang tercantum adalah tanggal siklus terakhir yang bisa
diverifikasi per Agustus 2026 dan perlu dicek ulang sebelum dipakai menyusun rencana.

## Teknis

Next.js 14 App Router dengan `output: 'export'`, jadi hasilnya HTML statis murni tanpa server. Tidak
ada basis data, tidak ada login, tidak ada dependensi selain React dan Next. Penyaringan berjalan di
browser karena datanya cuma puluhan baris.

Font dimuat lewat tautan Google Fonts di `app/layout.js`, dan `optimizeFonts` sengaja dimatikan
supaya proses build tidak bergantung pada koneksi ke server font.

## Merek dan animasi pembuka

Logo ada di `app/components/Merek.js` sebagai SVG murni, tanpa file gambar. Bentuknya huruf Q dengan
cincin hijau dan ekor oranye yang menembus keluar. Ekornya sengaja memakai warna dan sudut yang sama
dengan panah pada tombol, supaya logo terasa satu sistem dengan situsnya.

Animasi pembuka ada di `app/components/Pembuka.js`. Cincin menggambar dirinya sendiri, tulisan
LET'S GO ABROAD muncul di dalamnya, lalu pesawat terbang masuk dari luar bingkai sambil meninggalkan
jejak oranye yang berhenti menjadi ekor Q. Durasinya sekitar 2,4 detik.

Pengamannya:

- Hanya jalan di halaman depan, tidak pernah di halaman beasiswa atau program
- Hanya sekali per sesi, disimpan lewat `sessionStorage`
- Bisa dilewati dengan klik di mana saja, tombol Lewati, atau tombol Escape
- Otomatis dimatikan kalau perangkat menyalakan pengaturan kurangi gerak

Untuk mengubah durasi, sesuaikan `DURASI` di `Pembuka.js` dan penundaan `pb-keluar` di `globals.css`
supaya tetap sinkron.

Berkas merek lain ada di `public/`: `favicon.svg`, `icon.svg`, `apple-icon.svg`, `og.png` untuk
pratinjau WhatsApp dan media sosial, serta `manifest.webmanifest`.

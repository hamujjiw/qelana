import './globals.css';
import { TOTAL_PROGRAM, BEASISWA } from '../lib/data';

export const metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Qelana · Cari beasiswa S2 luar negeri yang cocok buat kamu',
    template: '%s · Qelana',
  },
  applicationName: 'Qelana',
  description: `Penyaring ${BEASISWA.length} beasiswa S2 luar negeri untuk pelamar Indonesia, lengkap dengan ${TOTAL_PROGRAM} program studi di Asia, Eropa, Amerika, dan Oseania.`,
  keywords: ['beasiswa s2 luar negeri', 'beasiswa kuliah luar negeri', 'LPDP', 'Chevening', 'Fulbright', 'MEXT', 'Erasmus Mundus'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Qelana',
    title: 'Qelana · Cari beasiswa S2 luar negeri yang cocok buat kamu',
    description: `Penyaring ${BEASISWA.length} beasiswa S2 luar negeri untuk pelamar Indonesia.`,
    images: ['/og.png'],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.svg' }],
  },
  manifest: '/manifest.webmanifest',
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#17372B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=Instrument+Sans:wght@400;500;600&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

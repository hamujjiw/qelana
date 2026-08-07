import { BEASISWA } from '../lib/data';

const SITUS = process.env.NEXT_PUBLIC_SITUS || 'https://qelana.vercel.app';

export default function sitemap() {
  const kini = new Date();
  const halaman = [
    { url: `${SITUS}/`, priority: 1 },
    { url: `${SITUS}/saring/`, priority: 0.8 },
  ];
  BEASISWA.forEach((d) => {
    halaman.push({ url: `${SITUS}/beasiswa/${d.slug}/`, priority: 0.9 });
    d.prog.forEach((p) => {
      halaman.push({ url: `${SITUS}/beasiswa/${d.slug}/${p.slug}/`, priority: 0.6 });
    });
  });
  return halaman.map((h) => ({ ...h, lastModified: kini, changeFrequency: 'monthly' }));
}

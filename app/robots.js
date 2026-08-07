const SITUS = process.env.NEXT_PUBLIC_SITUS || 'https://qelana.vercel.app';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITUS}/sitemap.xml`,
  };
}

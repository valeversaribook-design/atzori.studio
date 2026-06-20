import './globals.css';

export const metadata = {
  metadataBase: new URL('https://lucaatzori.it'),
  title: 'Luca Atzori — Costruisci la tua attività online',
  description: 'Con metodo, intelligenza artificiale e automazioni. Strategie pratiche per creare libertà, reddito e impatto. Mentoring 1-a-1.',
  keywords: ['business online', 'imprenditoria digitale', 'AI', 'automazioni', 'mentoring', 'Luca Atzori'],
  authors: [{ name: 'Luca Atzori' }],
  openGraph: {
    title: 'Luca Atzori — Costruisci la tua attività online',
    description: 'Con metodo, AI e automazioni. Strategie pratiche per creare libertà, reddito e impatto.',
    url: 'https://lucaatzori.it',
    siteName: 'Luca Atzori',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Luca Atzori — Costruisci la tua attività online'
      }
    ],
    locale: 'it_IT',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luca Atzori — Costruisci la tua attività online',
    description: 'Con metodo, AI e automazioni. Strategie pratiche per creare libertà, reddito e impatto.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}

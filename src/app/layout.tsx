import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ThemeProvider } from '../components/ui/ThemeProvider';

export const viewport: Viewport = {
  themeColor: '#D48B25',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'AWARDS. | Celebrate Excellence & Vote for Leaders',
    template: '%s | AWARDS.',
  },
  description: 'Discover prestige awards, celebrate industry pioneers, and cast your nominations seamlessly on the official Awards & Nominations platform.',
  keywords: ['awards', 'nominations', 'voting', 'leaders', 'excellence', 'recognition', 'gala', 'industry awards'],
  authors: [{ name: 'Awards Platform' }],
  creator: 'Awards Platform',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' }
    ],
  },
  openGraph: {
    title: 'AWARDS. | Celebrate Excellence & Vote for Leaders',
    description: 'Discover prestige awards, celebrate industry pioneers, and cast your nominations securely.',
    url: '/',
    siteName: 'AWARDS Platform',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AWARDS. | Celebrate Excellence & Vote for Leaders',
    description: 'Discover prestige awards, celebrate industry pioneers, and cast your nominations securely.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-bg-base text-text-main font-body leading-relaxed overflow-x-hidden min-h-screen m-0 p-0 antialiased flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          <main className="grow w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Sora, Manrope } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

import '../../styles/globals.css';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'VAPE+ | Premium Vaping Experience',
  description: 'Premium e-liquids and stylish devices.',
  icons: {
    icon: [
      {
        url: '/Icons/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/Icons/favicon-32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/Icons/favicon-16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    apple: '/Icons/apple-touch-icon.png',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${sora.variable} ${manrope.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

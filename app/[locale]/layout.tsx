import i18nConfig from '@/i18nConfig';
import './globals.css';
import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import { ReactNode } from 'react';
import { dir } from 'i18next';

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Парцалеса",
  description: "Плетени играчки - Парцалеса",
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}

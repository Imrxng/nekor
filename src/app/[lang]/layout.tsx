import { ReactNode } from 'react';
import Nav from '../components/nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://jouwdomein.com/nl",
    languages: {
      nl: "https://jouwdomein.com/nl",
      fr: "https://jouwdomein.com/fr",
      ar: "https://jouwdomein.com/ar"
    }
  }
}
export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir}>
      <body style={{ fontFamily: 'sans-serif', padding: 20 }}>
        <Nav currentLang={lang} />
        {children}
      </body>
    </html>
  );
}

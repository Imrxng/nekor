import { ReactNode } from 'react';
import { Metadata } from 'next';
import '@/styles/reset.css';
import '@/styles/globals.css';
import Header from '../../components/partials/header';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100','300','400','500','700','900'], 
  variable: '--font-roboto',
});


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
    <html  lang={lang === 'nl' ? 'nl-BE' : lang === 'fr' ? 'fr-BE' : 'ar'} dir={dir}>
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}

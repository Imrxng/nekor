import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/partials/header';
import Main from '@/components/partials/main';
import Footer from '@/components/footer';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  const supportedLangs = ['nl', 'fr', 'ar'];
  if (!supportedLangs.includes(lang)) return notFound();

  const filePath = path.join(process.cwd(), 'public/locales', `${lang}.json`);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      url: `https://nekor.be/${lang}`,
      locale: lang,
      type: 'website',
    },
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;

  const supportedLangs = ['nl', 'fr', 'ar'];
  if (!supportedLangs.includes(lang)) return notFound();

  const filePath = path.join(process.cwd(), 'public/locales', `${lang}.json`);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return (
    <>
      <Header currentLang={lang} content={content}/>
      <Main currentLanguage={lang} content={content} />
      <Footer currentLanguage={lang} />
    </>
  );
}

import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/partials/header';
import landing from '@/assets/images/landingpage.webp';
import Image from 'next/image';

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
      url: `https://jouwdomein.com/${lang}`,
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
      <main>
        <Image src={landing} alt="Landing page" style={{width: '100%', height: '80vh', objectFit: 'cover'}}/>
      </main>
    </>
  );
}

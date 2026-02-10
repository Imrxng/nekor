// src/app/[lang]/page.tsx
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ lang: string }>;
}

// ✅ Async generateMetadata om dezelfde JSON te gebruiken
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
    <main>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </main>
  );
}

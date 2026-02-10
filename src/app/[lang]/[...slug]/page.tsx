// src/app/[lang]/[...slug]/page.tsx
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function NotFound({ params }: Props) {
  const { lang } = await params; // ✅ unwrap de promise

  const supportedLangs = ['nl', 'fr', 'ar'];
  const finalLang = supportedLangs.includes(lang) ? lang : 'nl';

  // redirect naar de juiste taal
  redirect(`/${finalLang}`);
}

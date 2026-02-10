import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function NotFound({ params }: Props) {
  const { lang } = await params; 

  const supportedLangs = ['nl', 'fr', 'ar'];
  const finalLang = supportedLangs.includes(lang) ? lang : 'nl';

  redirect(`/${finalLang}`);
}
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function RootPage() {
  const supportedLangs = ['nl', 'fr', 'ar'];
  const defaultLang = 'nl';

  const headerList = await headers();

  const acceptLang = headerList.get('accept-language') ?? '';
  const browserLang = acceptLang.split(',')[0].split('-')[0];

  const finalLang = supportedLangs.includes(browserLang) ? browserLang : defaultLang;

  redirect(`/${finalLang}`);
}

import { redirect } from 'next/navigation';

export default function NotFoundRedirect() {
  // Alles wat niet bestaat → redirect naar root
  redirect('/');
}
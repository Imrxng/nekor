'use client';
import Link from 'next/link';

export default function Nav({ currentLang }: { currentLang: string }) {
  const langs = ['nl', 'fr', 'ar'];
  return (
    <nav style={{ marginBottom: 20 }}>
      {langs.map((l) => (
        <Link
          key={l}
          href={`/${l}`}
          style={{
            marginRight: 10,
            fontWeight: currentLang === l ? 'bold' : 'normal',
          }}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}

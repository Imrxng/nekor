'use client';
import { useState } from 'react';
import Link from 'next/link';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

interface NavProps {
  currentLang: string;
}

export default function Nav({ currentLang }: NavProps) {
  const [openLang, setOpenLang] = useState(false);
  const langs = ['nl', 'fr', 'ar'];

  return (
    <nav className="nav">
      <div
        className="lang-wrapper"
        onMouseEnter={() => setOpenLang(true)}
        onMouseLeave={() => setOpenLang(false)}
      >
        <button
          className="lang-trigger"
          onClick={() => setOpenLang(prev => !prev)}
        >
          {currentLang.toUpperCase()} {openLang ? <IoIosArrowUp className="arrow open" /> : <IoIosArrowDown className="arrow" />}
        </button>

        {openLang && (
          <div className="lang-popup">
            {langs.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className={currentLang === l ? 'active' : ''}
                onClick={() => setOpenLang(false)}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

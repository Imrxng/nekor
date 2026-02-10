'use client';

import { useState } from 'react';
import Nav from '../nav';
import Link from 'next/link';
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import logo from '@/assets/images/logo-white.webp';

interface HeaderProps {
  currentLang: string;
  content: {
    menu: {
      home: string;
      diensten: string;
      dienstenLinks: { label: string; href: string }[];
      contact: string;
    };
  };
}

const Header = ({ currentLang, content }: HeaderProps) => {
  const [openDiensten, setOpenDiensten] = useState(false);

  return (
    <header className="header">
      <Image src={logo} alt="logo" className="logo" />

      <div className="menu">
        <Link href={`/${currentLang}#home`}>{content.menu.home}</Link>

        <div
          className="diensten-wrapper"
          onMouseEnter={() => setOpenDiensten(true)}
          onMouseLeave={() => setOpenDiensten(false)}
        >
          <button className="diensten-trigger">
            {content.menu.diensten}{' '}
            {openDiensten ? (
              <IoIosArrowUp className="arrow open" />
            ) : (
              <IoIosArrowDown className="arrow" />
            )}
          </button>

          {openDiensten && (
            <div className="diensten-popup">
              {content.menu.dienstenLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${currentLang}${link.href}`}
                  onClick={() => setOpenDiensten(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href={`/${currentLang}#contact`}>{content.menu.contact}</Link>
      </div>

      <Nav currentLang={currentLang} />
    </header>
  );
};

export default Header;

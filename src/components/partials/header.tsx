'use client';
import '@/styles/header.component.css';

import { useState } from 'react';
import Nav from '../nav';
import Link from 'next/link';
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import logo from '@/assets/images/logo-white.webp';
import WhatsAppButton from '../wathsappButton';

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

  const handleScroll = (hash: string) => {
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <Image src={logo} alt="logo" className="logo" />

      <div className="menu">
        {/* Home link */}
        <Link
          href={`/${currentLang}#home`}
          onClick={(e) => {
            e.preventDefault();
            handleScroll('home');
          }}
        >
          {content.menu.home}
        </Link>

        {/* Diensten dropdown */}
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(link.href.replace('#', ''));
                    setOpenDiensten(false);
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Contact link */}
        <Link
          href={`/${currentLang}#contact`}
          onClick={(e) => {
            e.preventDefault();
            handleScroll('contact');
          }}
        >
          {content.menu.contact}
        </Link>
      </div>

      <Nav currentLang={currentLang} />
      <WhatsAppButton />
    </header>
  );
};

export default Header;

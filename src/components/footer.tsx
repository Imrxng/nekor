import '@/styles/footer.component.css';

interface FooterProps {
  currentLanguage: string;
}

const Footer = ({ currentLanguage }: FooterProps) => {
  const year = new Date().getFullYear();

  const translations = {
    nl: `© Copyright ${year} Nekor BV. Alle rechten voorbehouden.`,
    fr: `© Copyright ${year} Nekor BV. Tous droits réservés.`,
    ar: `© حقوق النشر ${year} Nekor BV. جميع الحقوق محفوظة.`,
  };

  const text =
    translations[currentLanguage as keyof typeof translations] ||
    translations.nl;

  return (
    <footer>
      <p dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
        {text}
      </p>
    </footer>
  );
};

export default Footer;

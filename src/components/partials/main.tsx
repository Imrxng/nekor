import Contact from '../contact';
import Content from '../content';
import Diensten from '../diensten';
import Hero from '../hero';

interface Service {
  titel: string;
  beschrijving: string;
}

interface HeroContent {
  title: string[];
  phone: string;
  callButton: string;
  servicesButton: string;
  servicesLink: string;
}

interface ContentBlock {
  title: string;
  description: string;
  reverse?: boolean;
}

interface ContactText {
  title: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  send: string;
  infoText: string;
  phoneLabel: string;
  emailLabel: string;
}

interface MainProps {
  content: {
    hero: HeroContent;
    services: Service[];
    contentBlocks: ContentBlock[];
    contact: ContactText;
    diensten: string;
  };
  currentLanguage: string;
}

const Main = ({ content, currentLanguage }: MainProps) => {
  const { hero, services, contentBlocks, contact, diensten } = content;

  return (
    <main>
      <Hero hero={hero} />
      <Diensten services={services} diensten={diensten} />
      <Content blocks={contentBlocks} />
      <Contact contact={contact} currentLanguage={currentLanguage} />
    </main>
  );
};

export default Main;

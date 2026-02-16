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

interface MainProps {
  content: {
    hero: HeroContent;
    services: Service[];
  };
}

const Main = ({ content }: MainProps) => {
  const { hero, services } = content;

  return (
    <main>
      <Hero hero={hero} />
      <Diensten services={services} />
      <Content />
    </main>
  );
};

export default Main;

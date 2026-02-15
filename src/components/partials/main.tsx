import Image from 'next/image';
import landing from '@/assets/images/landingpage.webp';
import '@/styles/main.component.css';
import Link from 'next/link';
import { FaPhoneAlt } from 'react-icons/fa';

interface MainProps {
    content: {
        hero: {
            title: string[];
            phone: string;
            callButton: string;
            servicesButton: string;
            servicesLink: string;
        };
        menu: {
            home: string;
            diensten: string;
            dienstenLinks: { label: string; href: string }[];
            contact: string;
        };
    };
}

const Main = ({ content }: MainProps) => {
    const { hero } = content;

    return (
        <main>
            <figure className="intro-picture">
                <Image
                    src={landing}
                    alt={hero.title.join(' ')}
                    fill
                    priority
                    className="hero-img"
                />

                <div className="overlay" />

                <div className="hero-content">
                    <h1>
                        {hero.title.map((line, index) => (
                            <span key={index}>
                                {line}
                                {index < hero.title.length - 1 && <br />}
                            </span>
                        ))}
                    </h1>

                    <div className="intro-buttons-container">
                        <div className="bel-ons-button">
                            <FaPhoneAlt />
                            <Link href={`tel:${hero.phone}`}>
                                {hero.callButton}
                            </Link>
                        </div>

                        <Link
                            href={`/nl${hero.servicesLink}`}
                            className="bekijk-diensten-button"
                        >
                            {hero.servicesButton}
                        </Link>
                    </div>
                </div>
            </figure>
        </main>
    );
};

export default Main;

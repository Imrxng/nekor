import Image from 'next/image'
import Link from 'next/link'
import landing from '@/assets/images/landingpage.webp';
import '@/styles/hero.component.css';
import { FaPhoneAlt } from 'react-icons/fa'
import Linkdienst from './linkDiensten';

interface HeroProps {
    hero: {
        title: string[];
        phone: string;
        callButton: string;
        servicesButton: string;
        servicesLink: string;
    };
}

const Hero = ({ hero }: HeroProps) => {
    return (
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

                    <Linkdienst hero={hero} />
                </div>
            </div>
        </figure>
    )
}

export default Hero
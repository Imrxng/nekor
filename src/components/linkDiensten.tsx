'use client';
import Link from 'next/link';

interface LinksdienstProps {
    hero: {
        servicesLink: string;
        servicesButton: string;
    }
}

const Linkdienst = ({ hero }: LinksdienstProps) => {
     const handleScroll = (hash: string) => {
        const element = document.getElementById(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <Link
            href={`/nl${hero.servicesLink}`}
            className="bekijk-diensten-button"
            onClick={(e) => {
                e.preventDefault();
                handleScroll('diensten');
            }}
        >
            {hero.servicesButton}

        </Link>)
}

export default Linkdienst
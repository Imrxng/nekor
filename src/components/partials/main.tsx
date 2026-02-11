import Image from 'next/image';
import landing from '@/assets/images/landingpage.webp';
import '@/styles/main.component.css';
import Link from 'next/link';

interface MainProps {
    content: {
        menu: {
            home: string;
            diensten: string;
            dienstenLinks: { label: string; href: string }[];
            contact: string;
        };
    };
}

const Main = ({ content }: MainProps) => {
    return (
        <main>
            <figure className="intro-picture">

                <Image
                    src={landing}
                    alt="Landing page"
                    fill
                    priority
                    className="hero-img"
                />

                <div className="overlay" />

                <div className="hero-content">
                    <h1>Takeldienst & Depannage <br />Nekor</h1>
                    <div className='intro-buttons-container'>
                        <Link href={'tel:0472123456'} className="bel-ons-button">Bel ons nu</Link>
                        <Link href={'/nl#diensten'} className="bekijk-diensten-button">Bekijk alle diensten</Link>                            
                    </div>
                </div>

            </figure>
        </main>
    )
}

export default Main;
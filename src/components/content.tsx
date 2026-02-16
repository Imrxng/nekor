import Image from 'next/image'
import '@/styles/content.component.css';
import sfeer1 from '@/assets/images/sfeer1.webp';
import sfeer2 from '@/assets/images/sfeer2.webp';
import sfeer3 from '@/assets/images/sfeer3.webp';
import sfeer4 from '@/assets/images/sfeer4.webp';

const Content = () => {
    return (
        <>
            <div className="content-block">
                <Image
                    src={sfeer1}
                    alt="Nekor is 2 kleine bestelwagens/busjes aan het verplaatsen binnen België."
                    className="content-image"
                />
                <div className="content-text">
                    <h2>Personenwagens, motoren & tweewielers</h2>
                    <p>
                        Wij bieden zowel takeldienst als depannage voor personenwagens, motoren, bromfietsen en fietsen.
                        Bij pech proberen we het probleem eerst ter plaatse op te lossen.
                        Is dat niet mogelijk, dan zorgen we voor veilig en professioneel takelen naar een garage of locatie naar keuze.
                    </p>
                </div>
            </div>

            <div className="content-block reverse">
                <div className="content-text">
                    <h2>Bestelwagens tot 3,5 ton & mobilhomes</h2>
                    <p>
                        Ook voor bestelwagens tot 3,5 ton en mobilhomes kan u rekenen op onze takeldienst en depannage.
                        We helpen bij pech of technische problemen en zorgen indien nodig voor een correct transport, lokaal of over langere afstanden.
                    </p>
                </div>
                <div className="content-images">
                    <Image
                        src={sfeer2}
                        alt="Nekor voert een depannage / takeldienst met een grote bus tot 3,5ton"
                        className="content-image"
                    />
                    <Image
                        src={sfeer3}
                        alt="Nekor voert een depannage / takeldienst met een mobilhome wagen tot 3,5 ton met grote opslag"
                        className="content-image"
                    />
                </div>
            </div>

            <div className="content-block">
                <Image
                    src={sfeer4}
                    alt="Nekor voert een internationale takeldienst in het buitenland waarbij klant een lange afstandsrit vroeg"
                    className="content-image"
                />
                <div className="content-text">
                    <h2>Nationaal & internationaal transport</h2>
                    <p>
                        Naast lokale interventies verzorgen wij ook nationaal en internationaal voertuigtransport.
                        Uw voertuig wordt veilig en professioneel vervoerd naar elke gewenste bestemming, zowel binnen België als in het buitenland.
                    </p>
                </div>
            </div>

        </>
    )
}

export default Content;

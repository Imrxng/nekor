import Image from 'next/image';
import '@/styles/content.component.css';
import sfeer1 from '@/assets/images/sfeer1.webp';
import sfeer2 from '@/assets/images/sfeer2.webp';
import sfeer3 from '@/assets/images/sfeer3.webp';
import sfeer4 from '@/assets/images/sfeer4.webp';

interface ContentBlockText {
  title: string;
  description: string;
  reverse?: boolean;
}

interface ContentProps {
  blocks: ContentBlockText[];
}


const Content = ({ blocks }: ContentProps) => {
  return (
    <>
      <div id='depannage-takeldienst'>

      </div>
      {blocks.map((block, index) => (
        <div
          key={index}
          className={`content-block ${block.reverse ? 'reverse' : ''}`}
        >
          {block.reverse ? (
            <>
              <div className="content-text">
                <h2>{block.title}</h2>
                <p>{block.description}</p>
              </div>
              <div className="content-images">
                {index === 1 && (
                  <>
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
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <Image
                src={
                  index === 0
                    ? sfeer1
                    : index === 2
                    ? sfeer4
                    : sfeer1
                }
                alt="Content afbeelding"
                className={`content-image international-image`}
                id={index === 2 ? 'internationaal' : undefined}
              />
              <div className="content-text">
                <h2>{block.title}</h2>
                <p>{block.description}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default Content;

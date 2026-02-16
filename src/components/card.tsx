import { IconType } from 'react-icons';
import { GiTowTruck } from 'react-icons/gi';

interface CardProps {
  icon: IconType;
  titel: string;
  beschrijving: string;
}

const Card = ({ icon: Icon, titel, beschrijving }: CardProps) => {
  return (
    <div className='card-diensten'>
      <div className="card-header">
        <div className="icon-wrapper">
          <Icon
            className={Icon === GiTowTruck ? 'gi-tow-truck' : ''}
          />
        </div>
        <p>{titel}</p>
      </div>
      <p>{beschrijving}</p>
    </div>
  )
}

export default Card;

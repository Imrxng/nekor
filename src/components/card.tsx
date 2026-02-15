import React from 'react'
import { IconType } from 'react-icons';

interface CardProps {
    icon: IconType;
    titel: string;
    beschrijving: string;
}

const Card = ({icon: Icon, titel, beschrijving} : CardProps) => {
  return (
    <div className='card-diensten'>
        <div>
            <Icon />
            <p>{titel}</p>
        </div>
        <p>{beschrijving}</p>
    </div>
  )
}

export default Card
import React from 'react';
import Card from './card';
import { GiTowTruck } from 'react-icons/gi';
import { FaClock, FaExclamationTriangle } from 'react-icons/fa';
import '@/styles/diensten.component.css';

interface Service {
  titel: string;
  beschrijving: string;
}

interface DienstenProps {
  services: Service[];
}

const iconMap = [GiTowTruck, FaExclamationTriangle, FaClock]; 

const Diensten = ({ services }: DienstenProps) => {
  return (
    <div className='diensten-container'>
      <h2 className='diensten-titel'>Diensten</h2>
      <div className='card-diensten-container'>
        {services.map((service, index) => {
          const IconComponent = iconMap[index] || FaClock; 
          return (
            <Card
              key={service.titel}
              titel={service.titel}
              beschrijving={service.beschrijving}
              icon={IconComponent}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Diensten;

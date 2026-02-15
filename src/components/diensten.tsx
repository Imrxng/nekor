import Card from './card';
import { GiTowTruck } from 'react-icons/gi';
import { FaClock, FaExclamationTriangle } from 'react-icons/fa';

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
    <div>
      <h2>Diensten</h2>
      <div >
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

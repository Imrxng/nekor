import { FaWhatsapp } from "react-icons/fa";
import '@/styles/whatsappButton.component.css'

export default function WhatsAppButton() {
  const phoneNumber = "+32495647686"; 

  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
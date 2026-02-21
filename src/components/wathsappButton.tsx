import { FaWhatsapp } from "react-icons/fa";
import '@/styles/whatsappButton.component.css'

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/+32485363814`;

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
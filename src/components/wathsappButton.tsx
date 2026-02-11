import { FaWhatsapp } from "react-icons/fa";
import '@/styles/whatsappButton.component.css'

export default function WhatsAppButton() {
  const phoneNumber = "32485155865"; 
  const message = "Hallo, ik heb een vraag.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

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
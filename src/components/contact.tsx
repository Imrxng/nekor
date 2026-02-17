import '@/styles/contact.component.css';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import ContactForm from './contactForm';

interface ContactProps {
  contact: {
    title: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    infoText: string;
    phoneLabel: string;
    emailLabel: string;
  };
  currentLanguage: string;
}

export const Contact = ({ contact, currentLanguage }: ContactProps) => {
  return (
    <section className="contact" id="contact">
      <h2 className="contact-title">{contact.title}</h2>

      <ContactForm currentLanguage={currentLanguage} contact={contact} />

      <p className="contact-info-text">{contact.infoText}</p>

      <div className='contact-cards-container'>
        <div className="contact-card">
          <div>
            <FaPhoneAlt />
            <p>{contact.phoneLabel}</p>
          </div>
          <a href="tel:+32495647686" dir='ltr'>+32 495 64 76 86</a>
        </div>

        <div className="contact-card">
          <div>
            <IoMail />
            <p>{contact.emailLabel}</p>
          </div>
          <a href="mailto:info@nekor.be">info@nekor.be</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

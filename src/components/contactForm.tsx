'use client';

import { useState } from 'react';

interface ContactFormProps {
  currentLanguage: string;
  contact: {
    name: string;
    email: string;
    message: string;
    send: string;
    infoText: string;
    phoneLabel: string;
    emailLabel: string;
  };
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}


interface Translation {
  requiredName: string;
  requiredEmail: string;
  invalidEmail: string;
  requiredPhone: string;
  invalidPhone: string;
  requiredMessage: string;
  shortMessage: string;
  sendingError: string;
  sendingSuccess: string;
}

const translations: Record<string, Translation> = {
  nl: {
    requiredName: 'Naam is verplicht',
    requiredEmail: 'Email is verplicht',
    invalidEmail: 'Email is ongeldig',
    requiredPhone: 'Telefoonnummer is verplicht',
    invalidPhone: 'Telefoonnummer is ongeldig',
    requiredMessage: 'Bericht is verplicht',
    shortMessage: 'Bericht moet minstens 10 tekens zijn',
    sendingError: 'Er ging iets mis bij het verzenden.',
    sendingSuccess: 'Bericht succesvol verzonden!',
  },
  fr: {
    requiredName: 'Le nom est requis',
    requiredEmail: "L'email est requis",
    invalidEmail: "L'email n'est pas valide",
    requiredPhone: 'Le numéro de téléphone est requis',
    invalidPhone: 'Le numéro de téléphone n’est pas valide',
    requiredMessage: 'Le message est requis',
    shortMessage: 'Le message doit contenir au moins 10 caractères',
    sendingError: "Une erreur s'est produite lors de l'envoi.",
    sendingSuccess: 'Message envoyé avec succès !',
  },
  ar: {
    requiredName: 'الاسم مطلوب',
    requiredEmail: 'البريد الإلكتروني مطلوب',
    invalidEmail: 'البريد الإلكتروني غير صالح',
    requiredPhone: 'رقم الهاتف مطلوب',
    invalidPhone: 'رقم الهاتف غير صالح',
    requiredMessage: 'الرسالة مطلوبة',
    shortMessage: 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل',
    sendingError: 'حدث خطأ أثناء الإرسال.',
    sendingSuccess: 'تم إرسال الرسالة بنجاح!',
  },
};

const ContactForm = ({ currentLanguage, contact }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Gebruik strikte vertaling
  const t: Translation = translations[currentLanguage] || translations.nl;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setStatusMessage(null);
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = t.requiredName;
    if (!formData.email.trim()) newErrors.email = t.requiredEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = t.invalidEmail;

    if (!formData.phone.trim()) newErrors.phone = t.requiredPhone;
    else if (!/^\+?[0-9\s\-]{7,15}$/.test(formData.phone))
      newErrors.phone = t.invalidPhone;

    if (!formData.message.trim()) newErrors.message = t.requiredMessage;
    else if (formData.message.length < 10)
      newErrors.message = t.shortMessage;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setStatusMessage(null);
    setIsSuccess(false);

    if (!validate()) return;
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        language: currentLanguage,
        timestamp: new Date().toISOString(),
      };
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setIsSuccess(false);
        setStatusMessage(data.error || t.sendingError);
        return;
      }

      setIsSuccess(true);
      setStatusMessage(t.sendingSuccess);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage(t.sendingError);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && e.currentTarget.tagName !== 'TEXTAREA') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const firstError = Object.values(errors).find(Boolean);

  return (
    <div className="contact-form">
      <div className="form-group">
        <label htmlFor="name">
          {contact.name} <span className="red">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={
            currentLanguage === 'nl'
              ? 'Jouw naam...'
              : currentLanguage === 'fr'
                ? 'Votre nom...'
                : 'اسمك...'
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">
          {contact.email} <span className="red">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={
            currentLanguage === 'nl'
              ? 'Jouw e-mailadres...'
              : currentLanguage === 'fr'
                ? 'Votre adresse e-mail...'
                : 'بريدك الإلكتروني...'
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">
          {contact.phoneLabel} <span className="red">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="+32 XXX XX XX XX"
          dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">
          {contact.message} <span className="red">*</span>
        </label>
        <textarea
          name="message"
          id="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder={
            currentLanguage === 'nl'
              ? 'Jouw bericht...'
              : currentLanguage === 'fr'
                ? 'Votre message...'
                : 'رسالتك...'
          }
        />
      </div>

      <button
        type="button"
        className="form-button"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? <span className="spinner"></span> : contact.send}
      </button>

      {firstError && <p className="error-text">{firstError}</p>}
      {statusMessage && (
        <p className={isSuccess ? 'success-text' : 'error-text'}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default ContactForm;

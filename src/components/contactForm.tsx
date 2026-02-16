'use client';

import { useState } from 'react';

interface ContactFormProps {
  currentLanguage: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = ({ currentLanguage }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    setStatusMessage(null);
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Naam is verplicht';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is verplicht';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is ongeldig';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Onderwerp is verplicht';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Bericht is verplicht';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Bericht moet minstens 10 tekens zijn';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    setStatusMessage(null);

    try {
      const payload = {
        ...formData,
        language: currentLanguage,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Er ging iets mis');
      }

      setIsSuccess(true);
      setStatusMessage('Bericht succesvol verzonden!');

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

    } catch (error) {
      setIsSuccess(false);
      setStatusMessage('Er ging iets mis bij het verzenden.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-form">
      <div className="form-group">
        <label htmlFor="name">
          Naam <span className="red">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">
          Email <span className="red">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="subject">
          Onderwerp <span className="red">*</span>
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
        />
        {errors.subject && <p className="error-text">{errors.subject}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="message">
          Bericht <span className="red">*</span>
        </label>
        <textarea
          name="message"
          id="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <p className="error-text">{errors.message}</p>}
      </div>

      <button
        type="button"
        className="form-button"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? <span className="spinner"></span> : 'Versturen'}
      </button>

      {statusMessage && (
        <p className={isSuccess ? 'success-text' : 'error-text'}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default ContactForm;

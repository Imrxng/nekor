import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dns from 'dns/promises';

const ipMap = new Map<string, { count: number; lastRequest: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

async function isDomainValid(email: string) {
  try {
    const domain = email.split('@')[1];
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch {
    return false;
  }
}

const langTexts: Record<string, string> = {
  nl: `Bedankt voor je bericht {name} 👋<br>We nemen zo snel mogelijk contact op.`,
  fr: `Merci pour votre message {name} 👋<br>Nous vous contacterons dès que possible.`,
  ar: `شكراً على رسالتك {name} 👋<br>سنتواصل معك في أقرب وقت ممكن.`
};

function generateMailHTML({
  title = 'Nekor',
  message = '',
  userMessage = '',
  website = '',
  phone = '',
  language = 'nl'
}: {
  title?: string;
  message?: string;
  userMessage?: string;
  website?: string;
  phone?: string;
  language?: 'nl' | 'fr' | 'ar';
}) {
  const greetings: Record<string, string> = {
    nl: 'Met vriendelijke groeten',
    fr: 'Cordialement',
    ar: 'مع أطيب التحيات'
  };
  const websiteLabel: Record<string, string> = { nl: 'Website', fr: 'Site web', ar: 'الموقع' };
  const phoneLabel: Record<string, string> = { nl: 'Telefoon', fr: 'Téléphone', ar: 'الهاتف' };
  const rightsText: Record<string, string> = {
    nl: `Alle rechten voorbehouden.`,
    fr: `Tous droits réservés.`,
    ar: `جميع الحقوق محفوظة.`
  };

  const contactSection = website || phone ? `
  <div style="margin-top:30px;padding-top:15px;border-top:1px solid #ccc;color:#0B2345;font-size:14px;">
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${website ? `
        <tr>
          <td style="padding-right:10px;font-weight:bold;">${websiteLabel[language]}:</td>
          <td><a href="https://${website}" style="color:#0B2345;text-decoration:none;">${website}</a></td>
        </tr>` : ''}
      ${phone ? `
        <tr>
          <td style="padding-right:10px;font-weight:bold;">${phoneLabel[language]}:</td>
          <td><a href="tel:${phone}" style="color:#0B2345;text-decoration:none;">${phone}</a></td>
        </tr>` : ''}
    </table>
  </div>
` : '';

  return `
  <div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;">
    <div style="max-width:600px;margin:auto;background:#fff;padding:20px;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <h1 style="background:#0B2345;color:#fff;padding:20px;margin:0;border-radius:8px 8px 0 0;text-align:center;">${title}</h1>
      
      <!-- Body -->
      <div style="padding:20px;color:#0B2345;font-size:16px;line-height:1.5;">
        ${userMessage}
        ${message ? `<div style="margin:20px 0;padding:15px;background:#f0f0f0;border-left:4px solid #0B2345;border-radius:6px;">
          <p style="margin:0;font-style:italic;color:#555;">${message}</p>
        </div>` : ''}
        <p style="margin-top:20px;">${greetings[language]},<br><strong>Nekor</strong></p>
        ${contactSection}
      </div>

      <!-- Footer -->
      <div style="background:#0B2345;color:#fff;text-align:center;padding:15px;border-radius:0 0 8px 8px;font-size:13px;">
        &copy; ${new Date().getFullYear()} Nekor BV. ${rightsText[language]}
      </div>
    </div>
  </div>
  `;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const ipData = ipMap.get(ip);

    if (ipData) {
      if (now - ipData.lastRequest < WINDOW_MS && ipData.count >= MAX_REQUESTS) {
        return NextResponse.json({ error: 'Te veel verzoeken, probeer later opnieuw.' }, { status: 429 });
      } else if (now - ipData.lastRequest > WINDOW_MS) {
        ipMap.set(ip, { count: 1, lastRequest: now });
      } else {
        ipMap.set(ip, { count: ipData.count + 1, lastRequest: ipData.lastRequest });
      }
    } else {
      ipMap.set(ip, { count: 1, lastRequest: now });
    }

    const body = await req.json();
    const { name, email, phone, message, language } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Alle velden zijn verplicht' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return NextResponse.json({ error: 'Ongeldig e-mailadres formaat' }, { status: 400 });

    const domainValid = await isDomainValid(email);
    if (!domainValid) return NextResponse.json({ error: 'Het domein van het e-mailadres bestaat niet' }, { status: 400 });

    const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
    if (!phoneRegex.test(phone)) return NextResponse.json({ error: 'Ongeldig telefoonnummer' }, { status: 400 });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Takeldienst Nekor" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Nieuw contactformulier Nekor`,
      html: generateMailHTML({
        title: 'Nieuw contactformulier',
        userMessage: `<p>Er is een nieuw bericht verstuurd via het contactformulier door <strong>${name}</strong>.</p>`,
        message: `<strong>E-mail:</strong> ${email}<br><strong>Telefoon:</strong> ${phone}<br><strong>Bericht:</strong> ${message}`,
      })
    });

    const userMessageHTML = langTexts[language || 'nl']?.replace('{name}', name) || langTexts['nl'].replace('{name}', name);

    const userSubject = language === 'fr' ? 'Nous avons bien reçu votre message !' :
      language === 'ar' ? 'لقد تلقينا رسالتك بنجاح!' :
        'Wij hebben je bericht goed ontvangen!';

    await transporter.sendMail({
      from: `"Takeldienst Nekor" <${process.env.SMTP_USER}>`,
      to: email,
      subject: userSubject,
      html: generateMailHTML({
        title: userSubject,
        userMessage: `<h2 style="margin-top:0;">${userMessageHTML}</h2>`,
        message,
        website: 'www.nekor.be',
        phone: '+32 495 64 76 86',
        language: language || 'nl'
      })
    });


    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Mail error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

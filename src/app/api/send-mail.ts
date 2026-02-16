import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const ipMap = new Map<string, { count: number; lastRequest: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000; 

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      'unknown';

    const now = Date.now();
    const ipData = ipMap.get(ip);

    if (ipData) {
      if (now - ipData.lastRequest < WINDOW_MS && ipData.count >= MAX_REQUESTS) {
        return NextResponse.json(
          { error: 'Te veel verzoeken, probeer later opnieuw.' },
          { status: 429 }
        );
      } else if (now - ipData.lastRequest > WINDOW_MS) {
        ipMap.set(ip, { count: 1, lastRequest: now });
      } else {
        ipMap.set(ip, { count: ipData.count + 1, lastRequest: ipData.lastRequest });
      }
    } else {
      ipMap.set(ip, { count: 1, lastRequest: now });
    }

    const body = await req.json();
    const { name, email, subject, message, language, timestamp } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 1️⃣ Mail naar jou
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Nieuw contactbericht: ${subject}`,
      html: `
        <div style="font-family: sans-serif; background: #fff; color: var(--dark-blue); padding: 20px;">
          <h2 style="color: var(--dark-red);">Nieuw bericht via portfolio</h2>
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Onderwerp:</strong> ${subject}</p>
          <p><strong>Bericht:</strong></p>
          <p>${message}</p>
          <hr />
          <small>Taal: ${language}</small><br />
          <small>Verzonden op: ${timestamp}</small>
        </div>
      `,
    });

    // 2️⃣ Bevestigingsmail naar gebruiker
    await transporter.sendMail({
      from: `"Imran Portfolio" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Wij hebben je bericht goed ontvangen!',
      html: `
        <div style="font-family: sans-serif; background: #fff; color: var(--dark-blue); padding: 20px;">
          <h2 style="color: var(--dark-red);">Bedankt voor je bericht ${name} 👋</h2>
          <p>We hebben je bericht goed ontvangen en nemen zo snel mogelijk contact met je op.</p>
          <hr />
          <h3>Jouw bericht:</h3>
          <p><strong>Onderwerp:</strong> ${subject}</p>
          <p>${message}</p>
          <br />
          <p>Met vriendelijke groeten,<br/>Imran</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Mail error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

import { furnitureServices, roomOptions, roomLabel } from '@/lib/quote-options';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, departure, arrival, type, date, message, rooms, furnitureService } = body;

    if (!roomOptions.includes(rooms) || !Object.hasOwn(furnitureServices, furnitureService)) {
      return NextResponse.json({ error: 'Invalid room or furniture service selection' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Missing Telegram configuration (TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID)');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const text = `Nouvelle demande de devis 🚚\n\n` +
      `👤 Nom: ${name}\n` +
      `📞 Téléphone: ${phone}\n` +
      `📍 Départ: ${departure}\n` +
      `🏁 Arrivée: ${arrival}\n` +
      `📦 Type: ${type}\n` +
      `🏠 Logement: ${roomLabel(rooms)}\n` +
      `🔧 Montage / démontage: ${furnitureServices[furnitureService as keyof typeof furnitureServices]}\n` +
      `📅 Date: ${date}\n` +
      `📝 Message: ${message || 'N/A'}`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API Error:', errorData);
      throw new Error('Failed to send message to Telegram');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Quote API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

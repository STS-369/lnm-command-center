import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/gmail';

export const dynamic = 'force-static';

/**
 * POST /api/gmail/send
 * Body: { to, cc?, bcc?, subject, body, html?, replyTo?, inReplyTo? }
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.to || !data.subject || !data.body) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, body' },
        { status: 400 }
      );
    }

    const to = Array.isArray(data.to) ? data.to : [data.to];

    const result = await sendEmail({
      to,
      cc: data.cc ? (Array.isArray(data.cc) ? data.cc : [data.cc]) : undefined,
      bcc: data.bcc ? (Array.isArray(data.bcc) ? data.bcc : [data.bcc]) : undefined,
      subject: data.subject,
      body: data.body,
      html: data.html,
      replyTo: data.replyTo,
      inReplyTo: data.inReplyTo,
      references: data.references,
    });

    return NextResponse.json({ success: true, message: result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Send failed';
    console.error('Gmail send error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

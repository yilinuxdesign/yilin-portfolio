import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, topic, message } = await req.json()

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['jiayilin1993@gmail.com'],
      replyTo: email,
      subject: `[Portfolio] ${topic} — from ${name}`,
      text: `From: ${name} <${email}>\nTopic: ${topic}\n\n${message}`,
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return Response.json({ error: 'Failed to send' }, { status: 500 })
  }
}

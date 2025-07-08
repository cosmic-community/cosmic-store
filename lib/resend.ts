import { Resend } from 'resend'

export interface ContactEmailData {
  name: string
  email: string
  subject: string
  message: string
}

// Initialize Resend only when needed to avoid build-time issues
function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is required')
  }
  
  return new Resend(apiKey)
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  try {
    const resend = getResendClient()
    
    await resend.emails.send({
      from: 'support@cosmicjs.com',
      to: 'tony@cosmicjs.com',
      subject: `Contact Form: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; margin-bottom: 24px;">New Contact Form Submission</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0 0 12px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 0 0 12px 0;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 0;"><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #374151; margin: 0 0 16px 0;">Message:</h3>
            <p style="margin: 0; line-height: 1.6; color: #4b5563;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #6b7280; font-size: 14px;">
            <p style="margin: 0;">This email was sent from the Cosmic Store contact form.</p>
          </div>
        </div>
      `
    })
  } catch (error) {
    console.error('Failed to send contact email:', error)
    throw new Error('Failed to send email notification')
  }
}
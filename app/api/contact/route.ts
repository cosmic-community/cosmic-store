import { NextRequest, NextResponse } from 'next/server'
import { createContactSubmission } from '@/lib/cosmic'
import { sendContactEmail } from '@/lib/resend'
import { ContactFormData } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message }: ContactFormData = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const formData: ContactFormData = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    }

    // Save to Cosmic CMS
    const submission = await createContactSubmission(formData)

    // Send email notification (only if Resend is configured)
    try {
      if (process.env.RESEND_API_KEY) {
        await sendContactEmail(formData)
      } else {
        console.warn('RESEND_API_KEY not configured - email notification skipped')
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the entire request if email fails
    }

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        submissionId: submission.id
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form submission error:', error)
    
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
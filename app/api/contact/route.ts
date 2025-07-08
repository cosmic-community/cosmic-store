import { NextRequest, NextResponse } from 'next/server'
import { createContactSubmission } from '@/lib/cosmic'
import { sendContactEmail } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Basic validation
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

    // Create contact submission in Cosmic
    await createContactSubmission({
      name,
      email,
      subject,
      message,
    })

    // Send email notification via Resend
    try {
      await sendContactEmail({
        name,
        email,
        subject,
        message,
      })
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      // Continue with success response since the submission was saved
      // The email failure shouldn't prevent the form submission from being recorded
    }

    return NextResponse.json(
      { message: 'Contact submission created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating contact submission:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
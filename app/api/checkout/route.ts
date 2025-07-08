import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/cart'
import { CartItem } from '@/contexts/CartContext'

export async function POST(request: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000'
    const successUrl = `${origin}/checkout/success`
    const cancelUrl = `${origin}/cart`

    const session = await createCheckoutSession(items, successUrl, cancelUrl)

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Checkout API error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { stripe, formatAmountForStripe } from '@/lib/stripe'
import { CartItem } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const { items, successUrl, cancelUrl }: { 
      items: CartItem[]
      successUrl: string
      cancelUrl: string 
    } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Create line items for Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.metadata.name,
          images: item.product.metadata.featured_image?.imgix_url 
            ? [`${item.product.metadata.featured_image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`]
            : [],
        },
        unit_amount: formatAmountForStripe(item.product.metadata.price),
      },
      quantity: item.quantity,
    }))

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      metadata: {
        orderItems: JSON.stringify(items.map(item => ({
          productId: item.product.id,
          productName: item.product.metadata.name,
          quantity: item.quantity,
          price: item.product.metadata.price
        })))
      }
    })

    return NextResponse.json({ 
      sessionId: session.id, 
      url: session.url 
    })
  } catch (error) {
    console.error('Checkout API error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
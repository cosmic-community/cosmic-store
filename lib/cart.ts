import { stripe, formatAmountForStripe } from './stripe'
import { CartItem } from '@/contexts/CartContext'

export async function createCheckoutSession(
  items: CartItem[],
  successUrl: string,
  cancelUrl: string
) {
  try {
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}
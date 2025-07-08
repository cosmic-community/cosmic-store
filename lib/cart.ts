import { CartItem } from '@/contexts/CartContext'
import { stripe, formatAmountForStripe } from '@/lib/stripe'

export interface CheckoutSession {
  id: string
  url: string
}

export const createCheckoutSession = async (
  items: CartItem[],
  successUrl: string,
  cancelUrl: string
): Promise<CheckoutSession> => {
  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.metadata.name,
          description: item.product.metadata.description?.replace(/<[^>]*>/g, '').substring(0, 500) || '',
          images: item.product.metadata.featured_image?.imgix_url 
            ? [`${item.product.metadata.featured_image.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`]
            : [],
          metadata: {
            productId: item.product.id,
            sku: item.product.metadata.sku
          }
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
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'JP']
      },
      metadata: {
        orderItems: JSON.stringify(items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.metadata.price
        })))
      }
    })

    if (!session.url) {
      throw new Error('Failed to create checkout session')
    }

    return {
      id: session.id,
      url: session.url
    }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw new Error('Failed to create checkout session')
  }
}
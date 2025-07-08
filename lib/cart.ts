import { CartItem } from '@/contexts/CartContext'

export async function createCheckoutSession(
  items: CartItem[],
  successUrl: string,
  cancelUrl: string
): Promise<{ id: string; url: string | null }> {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items,
      successUrl,
      cancelUrl
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create checkout session')
  }

  const data = await response.json()
  return {
    id: data.sessionId,
    url: data.url
  }
}
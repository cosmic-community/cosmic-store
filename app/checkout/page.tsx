'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/hooks/useCart'
import { createCheckoutSession } from '@/lib/cart'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, total, itemCount, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect if cart is empty
    if (items.length === 0) {
      window.location.href = '/cart'
    }
  }, [items])

  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsLoading(true)
    setError(null)

    try {
      const successUrl = `${window.location.origin}/checkout/success`
      const cancelUrl = `${window.location.origin}/cart`

      const session = await createCheckoutSession(items, successUrl, cancelUrl)
      
      // Redirect to Stripe Checkout
      window.location.href = session.url
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Failed to process checkout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Add some items to your cart before checking out.
          </p>
          <Link
            href="/products"
            className="btn-primary inline-flex items-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Order Summary
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={item.product.metadata.featured_image?.imgix_url 
                        ? `${item.product.metadata.featured_image.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`
                        : '/placeholder-product.jpg'
                      }
                      alt={item.product.metadata.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {item.product.metadata.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ${(item.product.metadata.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                <span>Total ({itemCount} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Payment
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You will be redirected to Stripe's secure checkout page to complete your payment.
            </p>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
            
            <button
              onClick={handleCheckout}
              disabled={isLoading || items.length === 0}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Continue to Payment'
              )}
            </button>
            
            <div className="mt-4 text-center">
              <Link
                href="/cart"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                ← Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
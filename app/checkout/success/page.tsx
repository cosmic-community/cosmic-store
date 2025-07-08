'use client'

import { useEffect } from 'react'
import { useCart } from '@/hooks/useCart'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear the cart after successful checkout
    clearCart()
  }, [clearCart])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Thank you for your purchase. You will receive a confirmation email shortly with your order details.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/products"
            className="btn-primary inline-flex items-center"
          >
            Continue Shopping
          </Link>
          
          <div>
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
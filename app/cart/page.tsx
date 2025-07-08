'use client'

import { useCart } from '@/hooks/useCart'
import { Plus, Minus, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const { items, total, itemCount, updateQuantity, removeFromCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added anything to your cart yet.
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
        Shopping Cart ({itemCount} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={item.product.metadata.featured_image?.imgix_url 
                      ? `${item.product.metadata.featured_image.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`
                      : '/placeholder-product.jpg'
                    }
                    alt={item.product.metadata.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {item.product.metadata.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    SKU: {item.product.metadata.sku}
                  </p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">
                    ${item.product.metadata.price}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <Minus className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </button>
                      <span className="w-12 text-center text-gray-900 dark:text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <Plus className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    ${(item.product.metadata.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal ({itemCount} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Link
              href="/checkout"
              className="btn-primary w-full block text-center mb-4"
            >
              Proceed to Checkout
            </Link>
            
            <Link
              href="/products"
              className="block text-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
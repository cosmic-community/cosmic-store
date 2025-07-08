'use client'

import { Fragment } from 'react'
import { useCart } from '@/hooks/useCart'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function CartDrawer() {
  const { 
    isOpen, 
    items, 
    total, 
    itemCount, 
    closeCart, 
    updateQuantity, 
    removeFromCart 
  } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Shopping Cart ({itemCount})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">Your cart is empty</p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
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
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {item.product.metadata.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        ${item.product.metadata.price}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        >
                          <Minus className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        <span className="w-8 text-center text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        >
                          <Plus className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded ml-2"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total: ${total.toFixed(2)}
                </span>
              </div>
              
              <div className="space-y-2">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full text-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
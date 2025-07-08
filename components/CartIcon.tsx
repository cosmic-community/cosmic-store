'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

export default function CartIcon() {
  const { itemCount, toggleCart } = useCart()

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  )
}
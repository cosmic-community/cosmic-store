'use client'

import { useState } from 'react'
import { Product } from '@/lib/types'
import { useCart } from '@/hooks/useCart'
import { ShoppingCart, Check } from 'lucide-react'

interface AddToCartButtonProps {
  product: Product
  className?: string
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const { addToCart, isProductInCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = async () => {
    if (!product.metadata.in_stock) return

    setIsAdding(true)
    addToCart(product)
    
    // Show success state
    setJustAdded(true)
    setTimeout(() => {
      setJustAdded(false)
    }, 2000)
    
    setIsAdding(false)
  }

  const inCart = isProductInCart(product.id)

  return (
    <button
      onClick={handleAddToCart}
      disabled={!product.metadata.in_stock || isAdding}
      className={`btn-primary flex items-center justify-center gap-2 transition-all ${
        !product.metadata.in_stock 
          ? 'opacity-50 cursor-not-allowed' 
          : justAdded 
            ? 'bg-green-600 hover:bg-green-700' 
            : ''
      } ${className}`}
    >
      {isAdding ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Adding...
        </>
      ) : justAdded ? (
        <>
          <Check className="w-4 h-4" />
          Added to Cart!
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          {inCart ? 'Add Another' : 'Add to Cart'}
        </>
      )}
    </button>
  )
}
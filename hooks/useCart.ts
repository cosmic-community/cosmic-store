import { useCart as useCartContext } from '@/contexts/CartContext'
import { Product } from '@/lib/types'

export const useCart = () => {
  const { state, dispatch } = useCartContext()

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' })
  }

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' })
  }

  const isProductInCart = (productId: string) => {
    return state.items.some(item => item.product.id === productId)
  }

  const getProductQuantity = (productId: string) => {
    const item = state.items.find(item => item.product.id === productId)
    return item?.quantity || 0
  }

  return {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    isProductInCart,
    getProductQuantity
  }
}
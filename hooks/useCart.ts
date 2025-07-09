import { useCart as useCartContext } from '@/contexts/CartContext';
import { Product, CartItem } from '@/lib/types';

export const useCart = () => {
  const context = useCartContext();

  const addToCart = (product: Product, quantity = 1) => {
    context.addItem(product, quantity);
  };

  const removeFromCart = (productId: string) => {
    context.removeItem(productId);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    context.updateQuantity(productId, quantity);
  };

  const clearCart = () => {
    context.clearCart();
  };

  const toggleCart = () => {
    context.toggleCart();
  };

  const openCart = () => {
    context.openCart();
  };

  const closeCart = () => {
    context.closeCart();
  };

  const isProductInCart = (productId: string): boolean => {
    return context.items.some((item: CartItem) => item.product.id === productId);
  };

  const getProductQuantity = (productId: string): number => {
    const item = context.items.find((item: CartItem) => item.product.id === productId);
    return item?.quantity || 0;
  };

  return {
    items: context.items,
    isOpen: context.isOpen,
    total: context.total,
    itemCount: context.itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    isProductInCart,
    getProductQuantity,
  };
};
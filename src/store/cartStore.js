import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { products } from '@/data/products';

/**
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {number} quantity
 */

/**
 * @typedef {Object} CartStore
 * @property {CartItem[]} items
 * @property {(product: import('@/data/products').Product, quantity?: number) => void} addItem
 * @property {(productId: number) => void} removeItem
 * @property {(productId: number, quantity: number) => void} updateQuantity
 * @property {() => void} clearCart
 * @property {() => number} getTotalItems
 * @property {() => number} getTotalPrice
 */

/** @type {import('zustand').UseBoundStore<import('zustand').StoreApi<CartStore>>} */
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                quantity,
              },
            ],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;

        set((state) => ({
          items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((total, item) => {
          const product = getProduct(item.id);

          return total + (product?.price || 0) * item.quantity;
        }, 0),
    }),
    {
      name: 'vape-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

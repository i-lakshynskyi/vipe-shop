import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const initialState = {
  deliveryMethod: 'local',

  // Local Delivery
  localArea: 'Plazh',
  localAddress: '',

  // Posta Shqiptare
  selectedPostalCity: 'Durrës',
  selectedPostOfficeId: 'durres-qender',

  // Contact Information
  phoneCountry: 'AL',
  phoneNumber: '',

  // Order Note
  orderNote: '',
};

export const useCheckoutStore = create(
  persist(
    (set) => ({
      ...initialState,

      setDeliveryMethod: (value) => set({ deliveryMethod: value }),

      setLocalArea: (value) => set({ localArea: value }),
      setLocalAddress: (value) => set({ localAddress: value }),

      setSelectedPostalCity: (value) => set({ selectedPostalCity: value }),

      setSelectedPostOfficeId: (value) => set({ selectedPostOfficeId: value }),

      setPhoneCountry: (value) => set({ phoneCountry: value }),
      setPhoneNumber: (value) => set({ phoneNumber: value }),

      setOrderNote: (value) => set({ orderNote: value }),

      resetCheckout: () => set(initialState),
    }),
    {
      name: 'vape-checkout-draft',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);

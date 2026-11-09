'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { products } from '@/data/products';
import { postOffices } from '@/data/postOffices';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';

import { useRouter } from '@/i18n/routing';
import Button from '@/components/ui/Button';

import CheckoutProgress from '@/components/checkout/CheckoutProgress';
import DeliveryMethodSection from '@/components/checkout/DeliveryMethodSection';
import DeliveryDetailsSection from '@/components/checkout/DeliveryDetailsSection';
import ChooseLocationSection from '@/components/checkout/ChooseLocationSection';
import ContactInformation from '@/components/checkout/ContactInformation';
import OrderNoteSection from '@/components/checkout/OrderNoteSection';
import OrderSummary from '@/components/checkout/OrderSummary';

const postalCities = [...new Set(postOffices.map((office) => office.city))].sort((a, b) =>
  a.localeCompare(b)
);

export default function CheckoutPage() {
  const router = useRouter();

  // Cart
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const [cartHydrated, setCartHydrated] = useState(false);
  const [checkoutHydrated, setCheckoutHydrated] = useState(false);

  // Checkout Store
  const deliveryMethod = useCheckoutStore((state) => state.deliveryMethod);
  const setDeliveryMethod = useCheckoutStore((state) => state.setDeliveryMethod);

  const localArea = useCheckoutStore((state) => state.localArea);
  const setLocalArea = useCheckoutStore((state) => state.setLocalArea);

  const localAddress = useCheckoutStore((state) => state.localAddress);
  const setLocalAddress = useCheckoutStore((state) => state.setLocalAddress);

  const selectedPostalCity = useCheckoutStore((state) => state.selectedPostalCity);
  const setSelectedPostalCity = useCheckoutStore((state) => state.setSelectedPostalCity);

  const selectedPostOfficeId = useCheckoutStore((state) => state.selectedPostOfficeId);
  const setSelectedPostOfficeId = useCheckoutStore((state) => state.setSelectedPostOfficeId);

  const phoneCountry = useCheckoutStore((state) => state.phoneCountry);
  const setPhoneCountry = useCheckoutStore((state) => state.setPhoneCountry);

  const phoneNumber = useCheckoutStore((state) => state.phoneNumber);
  const setPhoneNumber = useCheckoutStore((state) => state.setPhoneNumber);

  const orderNote = useCheckoutStore((state) => state.orderNote);
  const setOrderNote = useCheckoutStore((state) => state.setOrderNote);

  // Validation State
  const [phoneError, setPhoneError] = useState('');
  const [deliveryErrors, setDeliveryErrors] = useState({});

  const setDeliveryFieldError = (field, message) => {
    setDeliveryErrors((previous) => ({
      ...previous,
      [field]: message,
    }));
  };

  // Postal Office Data
  const postalOffices = useMemo(
    () => postOffices.filter((office) => office.city === selectedPostalCity),
    [selectedPostalCity]
  );

  const selectedPostOffice = useMemo(
    () => postalOffices.find((office) => office.id === selectedPostOfficeId),
    [postalOffices, selectedPostOfficeId]
  );

  const handlePostalCityChange = (event) => {
    const city = event.target.value;
    const firstOffice = postOffices.find((office) => office.city === city);

    setSelectedPostalCity(city);
    setSelectedPostOfficeId(firstOffice?.id ?? '');

    setDeliveryErrors((previous) => ({
      ...previous,
      postalCity: '',
      postOffice: firstOffice ? '' : previous.postOffice,
    }));
  };

  // Cart Products
  const cartProducts = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((product) => product.id === item.id);

          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean),
    [items]
  );

  const totalItems = cartProducts.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cartProducts.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  // Cart Hydration
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartHydrated(true);
  }, []);

  // Checkout Store Hydration
  useEffect(() => {
    let isMounted = true;

    const hydrateCheckout = async () => {
      try {
        await useCheckoutStore.persist.rehydrate();
      } catch (error) {
        console.error('Checkout hydration failed:', error);
      } finally {
        if (isMounted) {
          setCheckoutHydrated(true);
        }
      }
    };

    hydrateCheckout();

    return () => {
      isMounted = false;
    };
  }, []);

  // Validate Checkout and Continue to Review
  const handleContinue = () => {
    if (!checkoutHydrated) return;

    const nextDeliveryErrors = {};

    // Validate Delivery Details
    if (deliveryMethod === 'local') {
      if (!localArea?.trim()) {
        nextDeliveryErrors.localArea = 'Please enter your area.';
      }

      if (!localAddress?.trim()) {
        nextDeliveryErrors.localAddress = 'Please enter your delivery address.';
      }
    } else {
      if (!selectedPostalCity || !postalCities.includes(selectedPostalCity)) {
        nextDeliveryErrors.postalCity = 'Please select a city.';
      }

      if (
        !selectedPostOfficeId ||
        !selectedPostOffice ||
        selectedPostOffice.city !== selectedPostalCity
      ) {
        nextDeliveryErrors.postOffice = 'Please select a post office.';
      }
    }

    // Validate Phone Number
    let nextPhoneError = '';

    if (!phoneNumber.trim()) {
      nextPhoneError = 'Please enter your phone number.';
    } else {
      const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber.trim(), phoneCountry);

      if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
        nextPhoneError = 'Please enter a valid phone number.';
      }
    }

    setDeliveryErrors(nextDeliveryErrors);
    setPhoneError(nextPhoneError);

    // Stop navigation if any validation errors exist
    if (Object.keys(nextDeliveryErrors).length > 0 || nextPhoneError) {
      return;
    }

    router.push('/checkout/review');
  };

  return (
    <main className="relative min-h-screen overflow-hidden pt-28 pb-16">
      {/* Background — Smoke */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/checkout-smoke-corner-full.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-fill opacity-35"
        />
      </div>

      <div className="container relative z-10">
        {/* Checkout Title */}
        <section className="mb-6">
          <h1 className="text-4xl font-semibold text-[#F5F5F5]">Checkout</h1>

          <p className="mt-2 text-sm text-[#B0B0B0]">
            Complete your order and we’ll take care of the rest.
          </p>
        </section>

        <CheckoutProgress />

        {/* Main Checkout Layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.9fr)]">
          {/* Left Column */}
          <div className="flex min-w-0 flex-col gap-3">
            <DeliveryMethodSection
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
            />

            <DeliveryDetailsSection
              deliveryMethod={deliveryMethod}
              localArea={localArea}
              setLocalArea={setLocalArea}
              localAddress={localAddress}
              setLocalAddress={setLocalAddress}
              selectedPostalCity={selectedPostalCity}
              postalCities={postalCities}
              handlePostalCityChange={handlePostalCityChange}
              postalOffices={postalOffices}
              selectedPostOfficeId={selectedPostOfficeId}
              setSelectedPostOfficeId={setSelectedPostOfficeId}
              selectedPostOffice={selectedPostOffice}
              errors={deliveryErrors}
              setFieldError={setDeliveryFieldError}
            />

            {deliveryMethod === 'local' && <ChooseLocationSection />}

            <ContactInformation
              phoneCountry={phoneCountry}
              setPhoneCountry={setPhoneCountry}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              phoneError={phoneError}
              setPhoneError={setPhoneError}
            />

            <OrderNoteSection orderNote={orderNote} setOrderNote={setOrderNote} />
          </div>

          {/* Right Column */}
          <OrderSummary
            cartHydrated={cartHydrated}
            cartProducts={cartProducts}
            totalItems={totalItems}
            totalPrice={totalPrice}
            updateQuantity={updateQuantity}
          />
        </div>

        {/* Review and Confirmation Button */}
        <div className="mt-3 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.9fr)]">
          <section>
            <Button
              size="large"
              fullWidth
              disabled={!checkoutHydrated}
              onClick={handleContinue}
              icon={<ArrowRight size={21} />}
              iconPosition="right"
            >
              Review and Confirmation
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
}

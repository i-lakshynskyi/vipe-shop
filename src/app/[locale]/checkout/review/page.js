'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { MapPin, MessageSquare, Phone, Truck } from 'lucide-react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { useRouter } from '@/i18n/routing';

import { products } from '@/data/products';
import { postOffices } from '@/data/postOffices';

import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';

import PageLoader from '@/components/layout/PageLoader';
import CheckoutProgress from '@/components/checkout/CheckoutProgress';
import OrderSummary from '@/components/checkout/OrderSummary';

function ReviewDetail({ label, value }) {
  if (!value) return null;

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
      <span className="text-sm text-[#888888]">{label}</span>

      <span className="text-sm text-[#E5E5E5] sm:max-w-[65%] sm:text-right">{value}</span>
    </div>
  );
}

export default function CheckoutReviewPage() {
  const router = useRouter();

  // Hydration
  const [checkoutHydrated, setCheckoutHydrated] = useState(false);
  const [cartHydrated, setCartHydrated] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [confirmNotice, setConfirmNotice] = useState(false);

  // Checkout Store
  const deliveryMethod = useCheckoutStore((state) => state.deliveryMethod);

  const localArea = useCheckoutStore((state) => state.localArea);
  const localAddress = useCheckoutStore((state) => state.localAddress);

  const selectedPostalCity = useCheckoutStore((state) => state.selectedPostalCity);

  const selectedPostOfficeId = useCheckoutStore((state) => state.selectedPostOfficeId);

  const phoneCountry = useCheckoutStore((state) => state.phoneCountry);
  const phoneNumber = useCheckoutStore((state) => state.phoneNumber);

  const orderNote = useCheckoutStore((state) => state.orderNote);

  // Cart Store
  const items = useCartStore((state) => state.items);

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

  // Cart Hydration
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartHydrated(true);
  }, []);

  // Selected Post Office
  const selectedPostOffice = useMemo(
    () =>
      postOffices.find(
        (office) => office.id === selectedPostOfficeId && office.city === selectedPostalCity
      ),
    [selectedPostOfficeId, selectedPostalCity]
  );

  // Validate Access to Review Page
  useEffect(() => {
    if (!checkoutHydrated || !cartHydrated) return;

    const checkout = useCheckoutStore.getState();
    const cart = useCartStore.getState();

    const parsedPhoneNumber = checkout.phoneNumber?.trim()
      ? parsePhoneNumberFromString(checkout.phoneNumber.trim(), checkout.phoneCountry)
      : null;

    const isPhoneValid = Boolean(parsedPhoneNumber && parsedPhoneNumber.isValid());

    let isDeliveryValid = false;

    if (checkout.deliveryMethod === 'local') {
      isDeliveryValid = Boolean(checkout.localArea?.trim() && checkout.localAddress?.trim());
    } else {
      const validCity = postOffices.some((office) => office.city === checkout.selectedPostalCity);

      const validPostOffice = postOffices.some(
        (office) =>
          office.id === checkout.selectedPostOfficeId && office.city === checkout.selectedPostalCity
      );

      isDeliveryValid = validCity && validPostOffice;
    }

    if (!isPhoneValid || !isDeliveryValid) {
      router.replace('/checkout');
      return;
    }

    if (!cart.items?.length) {
      router.replace('/cart');
      return;
    }

    setAccessGranted(true);
  }, [checkoutHydrated, cartHydrated, router]);

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

  // Format Phone Number
  const parsedPhoneNumber = phoneNumber
    ? parsePhoneNumberFromString(phoneNumber, phoneCountry)
    : null;

  const formattedPhoneNumber = parsedPhoneNumber?.isValid()
    ? parsedPhoneNumber.formatInternational()
    : phoneNumber;

  // Prevent rendering before hydration and validation
  if (!checkoutHydrated || !cartHydrated || !accessGranted) {
    return <PageLoader />;
  }

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
        {/* Review Title */}
        <section className="mb-6">
          <h1 className="text-4xl font-semibold text-[#F5F5F5]">Review and Confirmation</h1>

          <p className="mt-2 text-sm text-[#B0B0B0]">
            Please review your delivery details and order before confirming.
          </p>
        </section>

        <CheckoutProgress currentStep={2} />

        {/* Main Review Layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.9fr)]">
          {/* Left Column */}
          <div className="flex min-w-0 flex-col gap-3">
            {/* Delivery Details */}
            <section className="rounded-2xl border border-white/10 bg-linear-to-b from-[#202020]/15 to-[#141414]/5 p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <Truck size={23} strokeWidth={1.8} />

                <h2 className="text-xl font-semibold text-[#F5F5F5]">Delivery Details</h2>
              </div>

              <div className="space-y-4">
                {deliveryMethod === 'local' ? (
                  <>
                    <ReviewDetail label="City" value="Durrës" />
                    <ReviewDetail label="Area" value={localArea} />
                    <ReviewDetail label="Address" value={localAddress} />
                  </>
                ) : (
                  <>
                    <ReviewDetail label="City" value={selectedPostalCity} />
                    <ReviewDetail label="Post Office" value={selectedPostOffice?.office} />
                    <ReviewDetail label="Postal Code" value={selectedPostOffice?.postalCode} />
                    <ReviewDetail label="Office Address" value={selectedPostOffice?.address} />

                    {selectedPostOffice?.hasMapLocation && selectedPostOffice?.mapUrl && (
                      <a
                        href={selectedPostOffice.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 border-b border-white/50 text-sm font-medium text-[#E5E5E5] transition-colors duration-200 hover:!border-blue-300 hover:!text-blue-300"
                      >
                        <MapPin size={16} />
                        Open in Google Maps
                      </a>
                    )}
                  </>
                )}
              </div>
            </section>

            {/* Contact Information and Order Note */}
            <section className="rounded-2xl border border-white/10 bg-linear-to-b from-[#202020]/15 to-[#141414]/5 p-5 sm:p-6">
              {/* Phone Number */}
              <div
                className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between ${
                  orderNote?.trim() ? 'border-b border-white/10 pb-4' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Phone size={20} strokeWidth={1.8} className="shrink-0 text-[#F5F5F5]" />

                  <span className="text-sm text-[#E5E5E5]">Phone Number</span>
                </div>

                <span className="text-sm text-[#F5F5F5] sm:text-right">{formattedPhoneNumber}</span>
              </div>

              {/* Order Note */}
              {orderNote?.trim() && (
                <div className="mt-4 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare
                      size={20}
                      strokeWidth={1.8}
                      className="shrink-0 text-[#F5F5F5]"
                    />

                    <span className="text-sm text-[#E5E5E5] w-max">Order Note</span>
                  </div>

                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#B0B0B0] sm:max-w-[65%] sm:text-right">
                    {orderNote}
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right Column */}
          <OrderSummary
            cartHydrated={cartHydrated}
            cartProducts={cartProducts}
            totalItems={totalItems}
            totalPrice={totalPrice}
            readOnly
          />
        </div>
      </div>
    </main>
  );
}

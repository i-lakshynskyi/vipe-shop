'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Link, useRouter } from '@/i18n/routing';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';

import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/ui/Button';
import QuantitySelect from '@/components/ui/QuantitySelect';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const [cartHydrated, setCartHydrated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartHydrated(true);
  }, []);

  const cartProducts = items
    .map((item) => {
      const product = products.find((product) => product.id === item.id);

      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const totalItems = cartProducts.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cartProducts.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  if (!cartHydrated) {
    return <main className="container min-h-screen pt-28 pb-16" />;
  }

  return (
    <main className="container min-h-screen pt-28 pb-16">
      {/* Cart heading */}
      <div className="mb-10 flex items-baseline gap-4">
        <h1 className="text-4xl font-semibold text-[#F5F5F5]">Cart</h1>

        <span className="text-lg text-[#888888]">({totalItems} items)</span>
      </div>

      {cartProducts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-linear-to-b from-[#202020] to-[#141414] px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-[#F5F5F5]">Your cart is empty</h2>

          <p className="mt-3 text-sm text-[#888888]">
            Discover our products and add something to your cart.
          </p>

          <Link href="/catalog" className="mt-8 inline-block">
            <Button size="large">
              <ArrowLeft size={18} />
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Cart content */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
            {/* Cart products */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#202020] to-[#141414]">
              {cartProducts.map((product, index) => (
                <article
                  key={product.id}
                  className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6 ${
                    index !== cartProducts.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  {/* Product image */}
                  <Link
                    href={`/product/${product.id}`}
                    className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#171717]"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="112px"
                      className="object-contain p-2 transition-transform duration-300 hover:scale-105"
                    />
                  </Link>

                  {/* Product information */}
                  <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <span className="text-xs text-[#888888]">{product.brand}</span>

                      <h2 className="mt-1 text-lg font-semibold text-[#F5F5F5]">{product.name}</h2>

                      <span className="mt-1 block text-sm text-[#888888]">{product.volume} ml</span>
                    </div>

                    {/* Price and quantity */}
                    <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                      <span className="text-sm text-[#E5E5E5]">
                        €{Number(product.price).toFixed(2)}
                      </span>

                      {/* Quantity select */}
                      <QuantitySelect
                        id={`cart-quantity-${product.id}`}
                        name={`quantity-${product.id}`}
                        value={product.quantity}
                        onChange={(value) => updateQuantity(product.id, value)}
                        size="small"
                      />

                      {/* Subtotal */}
                      <span className="min-w-20 text-right text-sm font-semibold text-[#F5F5F5]">
                        €{(Number(product.price) * product.quantity).toFixed(2)}
                      </span>

                      {/* Remove product */}
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="text-[#888888] transition-colors hover:text-white"
                      >
                        <Trash2 size={19} strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Order summary */}
            <aside className="rounded-2xl border border-white/10 bg-linear-to-b from-[#202020] to-[#141414] p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-[#F5F5F5]">Order Summary</h2>

              <div className="mt-10 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <span className="text-[#B0B0B0]">Items ({totalItems})</span>

                <span className="text-[#E5E5E5]">€{totalPrice.toFixed(2)}</span>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="text-xl font-semibold text-[#F5F5F5]">Total</span>

                <span className="text-2xl font-semibold text-[#F5F5F5]">
                  €{totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="mt-10">
                <Button size="large" fullWidth onClick={() => router.push('/checkout')}>
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </Button>
              </div>
            </aside>
          </div>

          {/* Continue shopping */}
          <Link
            href="/catalog"
            className="mt-10 inline-flex items-center gap-3 text-sm text-[#E5E5E5] hover:text-white active:!text-[#666666] active:opacity-50"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </>
      )}
    </main>
  );
}

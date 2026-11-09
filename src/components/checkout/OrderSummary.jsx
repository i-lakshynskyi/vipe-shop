'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ShoppingBag } from 'lucide-react';

import QuantitySelect from '@/components/ui/QuantitySelect';
import Button from '@/components/ui/Button';

export default function OrderSummary({
  cartHydrated,
  cartProducts,
  totalItems,
  totalPrice,
  updateQuantity,
  readOnly = false,
  onConfirm,
  confirmNotice = false,
}) {
  return (
    <aside className="rounded-2xl border border-white/10 bg-linear-to-b from-[#202020]/15 to-[#141414]/15 p-5 sm:p-6">
      {/* Order Summary Header */}
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <ShoppingBag size={23} strokeWidth={1.8} />

          <h2 className="text-xl font-semibold text-[#F5F5F5]">Order Summary</h2>
        </div>

        <span className="text-xs text-[#888888]">
          {cartHydrated && `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
        </span>
      </div>

      {/* Order Items */}
      <div className="divide-y divide-white/10 border-b border-white/10">
        {!cartHydrated ? (
          <div className="py-8 text-center text-sm text-[#777777]">Loading cart...</div>
        ) : cartProducts.length === 0 ? (
          <div className="py-8 text-center text-sm text-[#777777]">Your cart is empty.</div>
        ) : (
          cartProducts.map((product) => (
            <article key={product.id} className="flex items-center gap-8 py-4">
              {/* Product Image */}
              <Link
                href={`/product/${product.id}`}
                className="relative block h-40 w-40 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#171717]"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="160px"
                  className="object-contain p-2 transition-transform duration-300 hover:scale-105"
                />
              </Link>

              {/* Product Information */}
              <div className="min-w-0 flex-1">
                <span className="text-xs text-[#888888]">{product.brand}</span>

                <h3 className="mt-1 text-sm font-semibold text-[#F5F5F5]">{product.name}</h3>

                <span className="mt-1 block text-xs text-[#888888]">{product.volume} ml</span>

                {/* Price and Quantity */}
                <div className="mt-3 flex w-max flex-wrap items-center justify-between gap-6">
                  {readOnly ? (
                    <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#B0B0B0]">
                      Qty: {product.quantity}
                    </span>
                  ) : (
                    <QuantitySelect
                      id={`checkout-quantity-${product.id}`}
                      name={`checkout-quantity-${product.id}`}
                      value={product.quantity}
                      onChange={(value) => updateQuantity(product.id, value)}
                      size="small"
                    />
                  )}

                  <span className="text-sm font-semibold text-[#F5F5F5]">
                    €{(Number(product.price) * product.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Order Totals */}
      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#B0B0B0]">Items ({cartHydrated ? totalItems : '—'})</span>

          <span className="text-[#E5E5E5]">{cartHydrated ? `€${totalPrice.toFixed(2)}` : '—'}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-[#B0B0B0]">Delivery</span>

          <span className="text-[#E5E5E5]">€0.00</span>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-lg font-semibold text-[#F5F5F5]">Total</span>

          <span className="text-2xl font-semibold text-[#F5F5F5]">
            {cartHydrated ? `€${totalPrice.toFixed(2)}` : '—'}
          </span>
        </div>
      </div>

      {/* Confirm Order — Review Page Only */}
      {readOnly && (
        <div className="mt-6">
          <Button size="large" fullWidth onClick={onConfirm}>
            Confirm Order
          </Button>

          {confirmNotice && (
            <p className="mt-3 text-center text-xs text-[#888888]">
              Order submission is not connected yet.
            </p>
          )}
        </div>
      )}
    </aside>
  );
}

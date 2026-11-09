'use client';

import { Truck, MapPin } from 'lucide-react';

export default function DeliveryMethodSection({ deliveryMethod, setDeliveryMethod }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-linear-to-b from-[#202020]/15 to-[#141414]/5 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <Truck size={23} strokeWidth={1.8} />

        <h2 className="text-xl font-semibold text-[#F5F5F5]">Delivery Method</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Local Delivery */}
        <button
          type="button"
          onClick={() => setDeliveryMethod('local')}
          className={`flex w-full items-center gap-3 rounded-xl p-4 text-left transition-colors ${
            deliveryMethod === 'local'
              ? 'border-2 border-[#C0C0C0] bg-white/[0.04]'
              : 'border border-white/20 bg-white/[0.02] hover:border-white/40'
          }`}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
            <MapPin size={23} strokeWidth={1.8} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-[#F5F5F5]">Local Delivery</h3>

            <p className="mt-1 text-xs text-[#B0B0B0]">Durrës (selected areas)</p>
          </div>

          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
              deliveryMethod === 'local' ? 'border-[#E5E5E5]' : 'border-white/40'
            }`}
          >
            {deliveryMethod === 'local' && (
              <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
            )}
          </span>
        </button>

        {/* Posta Shqiptare */}
        <button
          type="button"
          onClick={() => setDeliveryMethod('post')}
          className={`flex w-full items-center gap-3 rounded-xl p-4 text-left transition-colors ${
            deliveryMethod === 'post'
              ? 'border-2 border-[#C0C0C0] bg-white/[0.04]'
              : 'border border-white/20 bg-white/[0.02] hover:border-white/40'
          }`}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
            <Truck size={23} strokeWidth={1.8} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-[#F5F5F5]">Posta Shqiptare</h3>

            <p className="mt-1 text-xs text-[#B0B0B0]">Delivery via Albanian Post</p>
          </div>

          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
              deliveryMethod === 'post' ? 'border-[#E5E5E5]' : 'border-white/40'
            }`}
          >
            {deliveryMethod === 'post' && (
              <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
            )}
          </span>
        </button>
      </div>
    </section>
  );
}

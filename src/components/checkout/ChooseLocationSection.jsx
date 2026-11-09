import { MapPin } from 'lucide-react';

export default function ChooseLocationSection() {
  return (
    <section className="rounded-2xl border border-white/10 bg-linear-to-b from-[#202020]/15 to-[#141414]/5 p-5 sm:p-6">
      <div className="mb-1 flex items-center gap-3">
        <MapPin size={23} strokeWidth={1.8} />

        <h2 className="text-lg font-semibold text-[#F5F5F5]">
          Choose Location
          <span className="ml-2 text-sm font-normal text-[#888888]">(Optional)</span>
        </h2>
      </div>

      <p className="mb-4 text-xs text-[#888888]">
        You can enter the address manually or pick a location on the map.
      </p>

      {/* Google Maps Placeholder */}
      <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#15191C]">
        <div className="flex flex-col items-center gap-2 text-center">
          <MapPin size={32} strokeWidth={1.5} className="text-[#C0C0C0]" />

          <span className="text-sm text-[#888888]">Google Maps will appear here</span>
        </div>

        {/* Map Controls Placeholder */}
        <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#202020] text-white">
          <span className="px-3 py-1 text-sm">+</span>
          <span className="border-t border-white/10 px-3 py-1 text-sm">−</span>
        </div>
      </div>

      {/* Location Actions */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/30 text-sm text-[#E5E5E5]">
          <MapPin size={17} />
          Use My Location
        </div>

        <div className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-[#B0B0B0]">
          <MapPin size={17} />
          Pick on Map
        </div>
      </div>
    </section>
  );
}

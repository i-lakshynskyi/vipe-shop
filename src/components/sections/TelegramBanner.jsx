import Image from 'next/image';
import { Send } from 'lucide-react';

import Button from '@/components/ui/Button';

export default function TelegramBanner() {
  return (
    <div className="relative h-full min-h-0 overflow-hidden rounded-2xl border border-white/10">
      {/* Background image */}
      <Image
        src="/images/home-banner-telegram.png"
        alt=""
        fill
        loading="eager"
        sizes="(max-width: 768px) 100vw, 1440px"
        className="object-cover object-right sm:object-center"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-0 h-full items-center justify-between px-6 py-4">
        <div className="h-full flex flex-col items-start justify-center">
          <span className="text-xs font-medium uppercase tracking-[3px] text-[#C0C0C0]">
            Stay Connected
          </span>

          <h2 className="mt-3 text-2xl font-semibold leading-tight text-white md:text-3xl">
            Join Our Telegram Community
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Stay updated with new flavors, special offers and the latest news.
          </p>
        </div>

        <div className="h-full flex flex-col items-start justify-end">
          <Button extraStyles="mt-6 font-bold text-[16px]">
            <Send size={20} strokeWidth={2} />
            Join Now
          </Button>
        </div>
      </div>
    </div>
  );
}

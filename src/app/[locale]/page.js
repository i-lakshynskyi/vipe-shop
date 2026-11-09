import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import TelegramBanner from '@/components/sections/TelegramBanner';
import { products } from '@/data/products';
import ProductCarousel from '@/components/product/ProductCarousel';

export default function HomePage() {
  return (
    <main className="h-dvh flex flex-col overflow-hidden overflow-y-auto">
      {/* HOME BANNER */}
      <section className="relative min-h-0 basis-[54%] shrink-0 flex items-center mb-12">
        {/* Hero background */}
        <Image
          src="/images/home-banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right sm:object-center"
        />

        {/* Hero content */}
        <div className="container relative flex items-center h-full">
          <div className="">
            <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 mb-6 text-sm text-white/80">
              PREMIUM E-LIQUIDS
            </span>

            <h1 className="text-[48px] font-bold leading-[1.1] tracking-tight mb-6">
              VAPE MORE
              <br />
              LIVE SMOOTHER
            </h1>

            <p className="text-[16px] leading-relaxed text-white/80">
              Premium e-liquids with rich flavors.
            </p>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <div className="container mb-4 flex items-end justify-between">
        <span className=" text-[24px] font-semibold text-[#F5F5F5]">Popular Products</span>

        <Link
          href="/catalog"
          className="group flex items-center gap-2 pb-1 text-sm font-medium text-[#C0C0C0] transition-colors hover:text-white"
        >
          View All
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
      {/* Products carousel */}
      <section className="container min-h-0 basis-[50%] shrink-0 mb-12">
        <ProductCarousel products={products} />
      </section>

      {/* Telegram banner */}
      <section className="container min-h-0 basis-[30%] shrink-0 mb-12">
        <TelegramBanner />
      </section>
    </main>
  );
}

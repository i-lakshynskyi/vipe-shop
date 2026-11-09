'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import ProductCard from './ProductCard';

export default function ProductCarousel({ products }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      containScroll: false,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  return (
    <div className="relative h-full min-h-0">
      {/* Carousel */}
      <div className="h-full min-h-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full min-h-0 touch-pan-y -ml-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-0 shrink-0 grow-0 basis-full pl-4 min-[480px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Previous button */}
      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#151515]/90 text-white/80 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-[#252525] hover:text-white active:scale-95"
        title="Previous products"
      >
        <ChevronLeft size={22} strokeWidth={1.8} />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#151515]/90 text-white/80 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-[#252525] hover:text-white active:scale-95"
        title="Next products"
      >
        <ChevronRight size={22} strokeWidth={1.8} />
      </button>
    </div>
  );
}

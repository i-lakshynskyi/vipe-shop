'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ShoppingCartPlus } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article
      className="group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10
    bg-linear-to-b from-[#202020] to-[#141414] transition-colors duration-300 hover:border-white/20"
    >
      {/* Product image */}
      <Link
        href={`/product/${product.id}`}
        className="relative min-h-60 flex-1 overflow-hidden bg-[#171717]"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Product information */}
      <div className="flex shrink-0 items-center justify-between gap-2 py-4 px-6">
        <Link href={`/product/${product.id}`}>
          <div className="flex min-w-0 flex-col">
            <span className="text-xs text-[#888888]">{product.brand}</span>

            <h3 className="text-base font-semibold text-[#F5F5F5]">{product.name}</h3>

            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-[#E5E5E5]">
                €{Number(product.price).toFixed(2)}
              </span>
            </div>
          </div>
        </Link>

        <Button size="medium" onClick={() => addItem(product, 1)}>
          <ShoppingCartPlus size={20} strokeWidth={1.8} />
        </Button>
      </div>
    </article>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';

import { products } from '@/data/products';
import ProductCarousel from '@/components/product/ProductCarousel';
import Button from '@/components/ui/Button';
import QuantitySelect from '@/components/ui/QuantitySelect';
import { ShoppingCartPlus, Droplet } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useTranslations } from 'next-intl';

export default function ProductPage() {
  const tProducts = useTranslations('products');

  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(1);

  /* Store */
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <main className="container min-h-screen pt-32 pb-16">
        <h1 className="text-2xl font-semibold text-white">Product not found</h1>
        <Link href="/catalog" className="mt-4 inline-block text-[#B0B0B0]">
          Back to Catalog
        </Link>
      </main>
    );
  }

  const relatedProducts = products.filter((item) => item.id !== product.id);

  return (
    <main className="container min-h-screen pt-28 pb-16">

      {/* Main product */}
      <section className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
        {/* Product image */}
        <div
          className="relative aspect-square overflow-hidden rounded-2xl w-[60%] mx-auto
        border border-white/10 bg-linear-to-b from-[#202020] to-[#141414]"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
          />
        </div>

        {/* Product information */}
        <div className="flex flex-col justify-center">
          <span className="text-sm text-[#888888]">{product.brand}</span>

          <h1 className="mt-1 text-3xl font-semibold text-[#F5F5F5] md:text-4xl">{product.name}</h1>

          <span className="mt-5 text-2xl font-semibold text-[#E5E5E5]">
            €{Number(product.price).toFixed(2)}
          </span>

          <div className="mt-3 flex gap4">
            <Droplet size={16} strokeWidth={2} />
            <span className="text-sm text-[#888888]">{product.volume} ml</span>
          </div>

          {/* Description */}
          <section className="my-4">
            {product.descriptionKey && (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#B0B0B0]">
                {tProducts(`${product.descriptionKey}.description`)}
              </p>
            )}
          </section>

          {/* Quantity and Add to Cart */}
          <div className="mt-8 flex flex-wrap items-center gap-8 pt-10">
            <QuantitySelect
              id="product-quantity"
              name="quantity"
              value={quantity}
              onChange={setQuantity}
            />

            <Button size="large" onClick={() => addItem(product, quantity)}>
              <ShoppingCartPlus size={20} strokeWidth={2} />
              Add to Cart
            </Button>
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="mt-16">
        <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F5]">You May Also Like</h2>

        <ProductCarousel products={relatedProducts} />
      </section>
    </main>
  );
}

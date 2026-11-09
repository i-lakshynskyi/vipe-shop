import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export default function CatalogPage() {
  return (
    <main className="min-h-screen mt-20 pb-12">
      <div className="container">
        {/* Catalog heading */}
        <div className="mb-10">
          <span className="text-xs font-medium uppercase tracking-[3px] text-[#B0B0B0]">
            VAPE+ COLLECTION
          </span>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold leading-tight text-[#F5F5F5] md:text-4xl">
                Our Collection
              </h1>

              <p className="mt-3 max-w-[500px] text-sm leading-relaxed text-[#888888]">
                Discover our collection of premium e-liquid flavors.
              </p>
            </div>

            <span className="text-sm text-[#888888]">{products.length} Products</span>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

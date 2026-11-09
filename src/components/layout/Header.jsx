'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';

import { useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useCartStore } from '@/store/cartStore';

const locales = ['en', 'uk', 'ru'];

export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = useCartStore((state) => state.getTotalItems());
  const [cartHydrated, setCartHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartHydrated(true);
  }, []);

  const handleLocaleChange = (event) => {
    router.replace(pathname, { locale: event.target.value });
  };

  const changeLocale = (item) => {
    router.replace(pathname, { locale: item });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-linear-to-b from-black/90 via-black/60 to-black/40 text-white">
      <div className="container flex items-center justify-between p-2">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center justify-center gap-2 text-[20px] font-medium leading-none tracking-[-1.5px]"
        >
          <Image src="/icons/icon-192.png" alt="VAPE+" width={40} height={40} />
          <span>VAPE +</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-8">
          {/* Cart */}
          <Link href="/cart" className="relative text-white transition-colors hover:text-white/60">
            <ShoppingCart size={20} strokeWidth={1.8} />

            {cartHydrated && totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#C0C0C0] px-1 text-[10px] font-semibold leading-none text-[#090909]">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Language selector */}
          <label className="relative hidden items-center sm:flex">
            <select
              value={locale}
              onChange={handleLocaleChange}
              className="cursor-pointer appearance-none rounded-full border border-white/50 bg-black/40 py-1 pl-3 pr-8 text-[12px] font-medium text-white outline-none transition-colors hover:border-white/40"
            >
              {locales.map((item) => (
                <option key={item} value={item} className="bg-[#1A1A1A]">
                  {item.toUpperCase()}
                </option>
              ))}
            </select>

            <ChevronDown size={14} className="pointer-events-none absolute right-3 text-white/80" />
          </label>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-white lg:hidden"
          >
            {mobileMenuOpen ? (
              <X size={25} strokeWidth={1.8} />
            ) : (
              <Menu size={25} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile language selector */}
      {mobileMenuOpen && (
        <nav className="border-t border-white/10 bg-[#090909]/95 px-6 py-5 backdrop-blur-xl lg:hidden">
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">Language:</span>

            {locales.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => changeLocale(item)}
                className={`text-sm font-medium transition-colors ${
                  locale === item ? 'text-white' : 'text-white/50'
                }`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

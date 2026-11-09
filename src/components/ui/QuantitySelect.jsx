'use client';

import { ChevronDown } from 'lucide-react';

const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * @param {{
 *   value: number,
 *   onChange: (value: number) => void,
 *   size?: 'medium' | 'small',
 *   id: string,
 *   name: string
 * }} props
 */
export default function QuantitySelect({ value, onChange, size = 'medium', id, name }) {
  const selectSize = size === 'small' ? 'h-10 w-[76px]' : 'h-[46px] w-[85px]';

  return (
    <div className="relative inline-flex">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={`${selectSize} cursor-pointer appearance-none rounded-[10px] border border-white/20 bg-[#1A1A1A] py-1 pl-3 pr-8 text-center text-sm text-white outline-none transition-colors hover:border-white/40 focus:border-white/60`}
      >
        {quantities.map((quantity) => (
          <option key={quantity} value={quantity} className="bg-[#1A1A1A]">
            {quantity}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        strokeWidth={1.8}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
      />
    </div>
  );
}

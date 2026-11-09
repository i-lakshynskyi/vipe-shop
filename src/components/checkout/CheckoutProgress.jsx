'use client';

import { Link } from '@/i18n/routing';

export default function CheckoutProgress({ currentStep = 1 }) {
  const isReviewStep = currentStep === 2;

  const stepOneNumber = (
    <span
      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 ${
        isReviewStep
          ? 'border border-white/20 bg-[#1A1A1A] text-[#B0B0B0]'
          : 'bg-linear-to-r from-[#F5F5F5] to-[#B8B8B8] text-[#090909]'
      }`}
    >
      1
    </span>
  );

  const stepTwoNumber = (
    <span
      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 ${
        isReviewStep
          ? 'bg-linear-to-r from-[#F5F5F5] to-[#B8B8B8] text-[#090909]'
          : 'border border-white/20 bg-[#1A1A1A] text-[#B0B0B0]'
      }`}
    >
      2
    </span>
  );

  return (
    <section className="mb-8 flex max-w-[620px] items-center gap-4">
      {/* Step 1 — Delivery */}
      {isReviewStep ? (
        <Link
          href="/checkout"
          aria-label="Return to Delivery step"
          className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-75"
        >
          {stepOneNumber}

          <span className="text-sm font-semibold text-[#F5F5F5]">Delivery</span>
        </Link>
      ) : (
        <div className="flex shrink-0 items-center gap-3" aria-current="step">
          {stepOneNumber}

          <span className="text-sm font-semibold text-[#F5F5F5]">Delivery</span>
        </div>
      )}

      {/* Connecting Line */}
      <div
        className="h-px flex-1"
        style={{
          backgroundColor: isReviewStep ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
        }}
      />

      {/* Step 2 — Review and Confirmation */}
      <div
        className="flex shrink-0 items-center gap-3"
        aria-current={isReviewStep ? 'step' : undefined}
        aria-disabled={!isReviewStep}
      >
        {stepTwoNumber}

        <span
          className={`text-sm transition-colors duration-300 ${
            isReviewStep ? 'font-semibold text-[#F5F5F5]' : 'text-[#B0B0B0]'
          }`}
        >
          Review and Confirmation
        </span>
      </div>
    </section>
  );
}

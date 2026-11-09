'use client';

import { Fragment } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';

export default function DeliveryDetailsSection({
  deliveryMethod,

  // Local Delivery
  localArea,
  setLocalArea,
  localAddress,
  setLocalAddress,

  // Posta Shqiptare
  selectedPostalCity,
  postalCities,
  handlePostalCityChange,
  postalOffices,
  selectedPostOfficeId,
  setSelectedPostOfficeId,
  selectedPostOffice,

  // Validation
  errors = {},
  setFieldError,
}) {
  const inputClasses =
    'h-10 w-full rounded-lg border bg-[#1A1A1A] px-3 text-sm text-[#F5F5F5] outline-none transition-colors';

  const getInputClasses = (field) =>
    `${inputClasses} ${
      errors[field]
        ? 'border-red-400/70 focus:border-red-400'
        : 'border-white/20 focus:border-white/40'
    }`;

  const renderError = (field) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 text-xs text-red-400">
        {errors[field]}
      </p>
    ) : null;

  return (
    <section className="rounded-2xl border border-white/10 bg-linear-to-b from-[#202020]/15 to-[#141414]/5 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <MapPin size={23} strokeWidth={1.8} />

        <h2 className="text-xl font-semibold text-[#F5F5F5]">Delivery Details</h2>
      </div>

      {deliveryMethod === 'local' ? (
        <Fragment key="local">
          {/* Local Delivery Details */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* City */}
            <div>
              <label htmlFor="local-city" className="mb-2 block text-sm text-[#B0B0B0]">
                City <span className="text-white">*</span>
              </label>

              <input
                id="local-city"
                name="localCity"
                type="text"
                value="Durrës"
                readOnly
                className={`${inputClasses} border-white/20`}
              />
            </div>

            {/* Area */}
            <div>
              <label htmlFor="local-area" className="mb-2 block text-sm text-[#B0B0B0]">
                Area <span className="text-white">*</span>
              </label>

              <input
                id="local-area"
                name="localArea"
                type="text"
                value={localArea ?? 'Plazh'}
                onChange={(event) => {
                  const value = event.target.value;

                  setLocalArea(value);

                  if (value.trim()) {
                    setFieldError('localArea', '');
                  }
                }}
                aria-invalid={Boolean(errors.localArea)}
                aria-describedby={errors.localArea ? 'localArea-error' : undefined}
                className={getInputClasses('localArea')}
              />

              {renderError('localArea')}
            </div>
          </div>

          {/* Local Delivery Address */}
          <div className="mt-4">
            <label htmlFor="local-address" className="mb-2 block text-sm text-[#B0B0B0]">
              Address <span className="text-white">*</span>
            </label>

            <input
              id="local-address"
              name="localAddress"
              type="text"
              value={localAddress ?? ''}
              onChange={(event) => {
                const value = event.target.value;

                setLocalAddress(value);

                if (value.trim()) {
                  setFieldError('localAddress', '');
                }
              }}
              placeholder="Street, house number, apartment, etc."
              aria-invalid={Boolean(errors.localAddress)}
              aria-describedby={errors.localAddress ? 'localAddress-error' : undefined}
              className={getInputClasses('localAddress')}
            />

            {renderError('localAddress')}
          </div>
        </Fragment>
      ) : (
        <Fragment key="post">
          {/* City */}
          <div>
            <label htmlFor="postal-city" className="mb-2 block text-sm text-[#B0B0B0]">
              City <span className="text-white">*</span>
            </label>

            <div className="relative">
              <select
                id="postal-city"
                name="postalCity"
                value={selectedPostalCity ?? ''}
                onChange={handlePostalCityChange}
                aria-invalid={Boolean(errors.postalCity)}
                aria-describedby={errors.postalCity ? 'postalCity-error' : undefined}
                className={`${getInputClasses('postalCity')} cursor-pointer appearance-none pr-9`}
              >
                <option value="" className="bg-[#1A1A1A]">
                  Select a city
                </option>

                {postalCities.map((city) => (
                  <option key={city} value={city} className="bg-[#1A1A1A]">
                    {city}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
              />
            </div>

            {renderError('postalCity')}
          </div>

          {/* Post Office and Postal Code */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Post Office */}
            <div>
              <label htmlFor="post-office" className="mb-2 block text-sm text-[#B0B0B0]">
                Post Office <span className="text-white">*</span>
              </label>

              <div className="relative">
                <select
                  id="post-office"
                  name="postOffice"
                  value={selectedPostOfficeId ?? ''}
                  onChange={(event) => {
                    const value = event.target.value;

                    setSelectedPostOfficeId(value);

                    if (value) {
                      setFieldError('postOffice', '');
                    }
                  }}
                  aria-invalid={Boolean(errors.postOffice)}
                  aria-describedby={errors.postOffice ? 'postOffice-error' : undefined}
                  className={`${getInputClasses('postOffice')} cursor-pointer appearance-none pr-9`}
                >
                  <option value="" className="bg-[#1A1A1A]">
                    Select a post office
                  </option>

                  {postalOffices.map((office) => (
                    <option key={office.id} value={office.id} className="bg-[#1A1A1A]">
                      {office.office}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
                />
              </div>

              {renderError('postOffice')}
            </div>

            {/* Postal Code */}
            <div>
              <label htmlFor="postal-code" className="mb-2 block text-sm text-[#B0B0B0]">
                Postal Code
              </label>

              <input
                id="postal-code"
                name="postalCode"
                type="text"
                value={selectedPostOffice?.postalCode ?? ''}
                readOnly
                className={`${inputClasses} border-white/20`}
              />
            </div>
          </div>

          {/* Selected Post Office */}
          {selectedPostOffice && (
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                  <MapPin size={21} strokeWidth={1.8} className="text-[#C0C0C0]" />
                </div>

                <div className="min-w-0">
                  <span className="text-xs text-[#888888]">Selected Post Office</span>

                  <h3 className="mt-1 text-sm font-semibold text-[#F5F5F5]">
                    Posta Shqiptare — {selectedPostOffice.office}
                  </h3>

                  {selectedPostOffice.address ? (
                    <p className="mt-2 text-sm leading-relaxed text-[#B0B0B0]">
                      {selectedPostOffice.address}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-[#888888]">
                      {selectedPostOffice.hasMapLocation
                        ? 'Street address is not available, but the location can be viewed on the map.'
                        : 'Physical address is not available for this office yet.'}
                    </p>
                  )}

                  {selectedPostOffice.hasMapLocation && selectedPostOffice.mapUrl && (
                    <a
                      href={selectedPostOffice.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 border-b border-white/50 text-sm font-medium text-[#E5E5E5] transition-colors duration-200 hover:!border-blue-300 hover:!text-blue-300"
                    >
                      <MapPin size={16} />
                      Open in Google Maps
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </section>
  );
}

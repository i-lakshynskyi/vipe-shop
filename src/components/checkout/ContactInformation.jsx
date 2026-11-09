'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

export default function ContactInformation({
  phoneCountry,
  setPhoneCountry,
  phoneNumber,
  setPhoneNumber,
  phoneError,
  setPhoneError,
}) {
  const [phoneCountries, setPhoneCountries] = useState([]);
  const [phoneCountryOpen, setPhoneCountryOpen] = useState(false);
  const [phoneCountrySearch, setPhoneCountrySearch] = useState('');

  const phoneCountryDropdownRef = useRef(null);

  // Phone Country Data
  const phoneCallingCode = getCountryCallingCode(phoneCountry);

  const filteredPhoneCountries = phoneCountries.filter((country) => {
    const query = phoneCountrySearch.trim().toLowerCase();

    if (!query) return true;

    const aliases = {
      GB: 'uk united kingdom great britain britain england',
      US: 'usa america united states',
    };

    const callingCode = getCountryCallingCode(country.code);

    const searchableText = [
      country.name,
      country.code,
      `+${callingCode}`,
      aliases[country.code] || '',
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(query);
  });

  // Country Handlers
  const handleCountryDropdownToggle = () => {
    setPhoneCountryOpen((prev) => !prev);
  };

  const handleCountrySelect = (countryCode) => {
    setPhoneCountry(countryCode);
    setPhoneNumber('');
    setPhoneError('');
    setPhoneCountryOpen(false);
    setPhoneCountrySearch('');
  };

  const handleCountrySearchKeyDown = (event) => {
    if (event.key === 'Escape') {
      setPhoneCountryOpen(false);
      setPhoneCountrySearch('');
    }
  };

  // Phone Handler
  const handlePhoneNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');

    setPhoneNumber(value);
    setPhoneError('');
  };

  // Load Countries
  useEffect(() => {
    const countryNames = new Intl.DisplayNames(['en'], {
      type: 'region',
    });

    const countries = getCountries()
      .map((country) => ({
        code: country,
        name: countryNames.of(country) || country,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'en'));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhoneCountries(countries);
  }, []);

  // Close Dropdown on Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        phoneCountryDropdownRef.current &&
        !phoneCountryDropdownRef.current.contains(event.target)
      ) {
        setPhoneCountryOpen(false);
        setPhoneCountrySearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className="rounded-2xl border border-white/10 bg-linear-to-b from-[#202020]/15 to-[#141414]/5 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <Phone size={23} strokeWidth={1.8} />

        <h2 className="text-xl font-semibold text-[#F5F5F5]">Contact Information</h2>
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone-number" className="mb-2 block text-sm text-[#B0B0B0]">
          Phone Number <span className="text-white">*</span>
        </label>

        <div
          className={`relative flex h-10 w-full rounded-lg border bg-[#1A1A1A] transition-colors focus-within:border-white/40 ${
            phoneError ? 'border-red-400/60' : 'border-white/20'
          }`}
        >
          {/* Country Calling Code */}
          <div className="relative h-full shrink-0" ref={phoneCountryDropdownRef}>
            <button
              type="button"
              onClick={handleCountryDropdownToggle}
              className="flex h-full w-[105px] items-center justify-between border-r border-white/20 px-3 transition-colors hover:bg-white/[0.04]">

              <span className="text-sm font-medium text-[#F5F5F5]">+{phoneCallingCode}</span>

              <ChevronDown
                size={15}
                className={`text-white/70 transition-transform duration-200 ${phoneCountryOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Country Search Dropdown */}
            {phoneCountryOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-72 max-w-[calc(100vw-3rem)] rounded-xl border border-white/15 bg-[#1A1A1A] p-2 shadow-2xl">
                {/* Search */}
                <input
                  type="text"
                  value={phoneCountrySearch}
                  onChange={(event) => setPhoneCountrySearch(event.target.value)}
                  onKeyDown={handleCountrySearchKeyDown}
                  placeholder="Search country..."
                  autoComplete="off"
                  autoFocus
                  className="h-10 w-full rounded-lg border border-white/15 bg-[#242424] px-3 text-sm text-[#F5F5F5] outline-none placeholder:text-[#777777] focus:border-white/40"
                />

                {/* Countries */}
                <div className="custom-scrollbar mt-2 max-h-60 overflow-y-auto">
                  {filteredPhoneCountries.length > 0 ? (
                    filteredPhoneCountries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => handleCountrySelect(country.code)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/[0.06] ${
                          phoneCountry === country.code
                            ? 'bg-white/[0.05] text-white'
                            : 'text-[#B0B0B0]'
                        }`}
                      >
                        <span>{country.name}</span>

                        <span className="ml-3 shrink-0 text-[#E5E5E5]">
                          +{getCountryCallingCode(country.code)}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-4 text-center text-sm text-[#777777]">
                      No countries found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Phone Input */}
          <input
            id="phone-number"
            name="phoneNumber"
            type="tel"
            inputMode="numeric"
            autoComplete="off"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter phone number"
            required
            className="phone-number-input min-w-0 flex-1 bg-transparent px-3 text-sm text-[#F5F5F5] outline-none placeholder:text-[#777777]"
          />
        </div>

        {/* Phone Validation Error */}
        {phoneError && <p className="mt-2 text-xs text-red-400">{phoneError}</p>}
      </div>
    </section>
  );
}

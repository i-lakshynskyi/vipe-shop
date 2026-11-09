import { LoaderCircle } from 'lucide-react';

export default function Button({
  children,
  onClick,
  type = 'button',
  size = 'medium',
  icon,
  iconPosition = 'right',
  loading = false,
  disabled = false,
  fullWidth = false,
  extraStyles = '',
  ...props
}) {
  const sizes = {
    small: 'min-h-9 px-[18px] text-[13px]',
    medium: 'min-h-[46px] px-7 text-[15px]',
    large: 'min-h-[54px] px-[34px] text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`
        inline-flex transform-gpu items-center justify-center gap-2.5
        rounded-full border border-transparent
        bg-linear-to-r from-[#F5F5F5] via-[#DCDCDC] to-[#B8B8B8] text-[#090909]
        leading-none
        whitespace-nowrap
        transition-all duration-200 ease-in-out
        hover:brightness-110 
       active:from-[#B8B8B8] active:via-[#A0A0A0] active:to-[#888888] active:shadow-inner
        focus-visible:outline-2
        focus-visible:outline-offset-[3px]
        focus-visible:outline-[#C0C0C0]
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:transform-none
        ${sizes[size] || sizes.medium}
        ${fullWidth ? 'w-full' : ''}
        ${extraStyles}
      `}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="h-[18px] w-[18px] animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}

          <span className="inline-flex items-center gap-2">{children}</span>

          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  );
}

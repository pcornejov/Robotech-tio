import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

/**
 * Primary CTA button: accent background, dark text, chamfered corners
 * (HUD-style clip-path) and an accent glow on hover/focus instead of a
 * traditional soft shadow.
 */
export default function Button({ className = '', children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-block bg-accent px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-background transition-shadow duration-200 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)] hover:shadow-[0_0_20px_rgba(255,74,28,0.35)] focus-visible:outline-none focus-visible:shadow-[0_0_20px_rgba(255,74,28,0.35)] md:px-8 md:py-3.5 md:text-base ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

interface WordmarkProps {
  as?: 'span' | 'h1'
  className?: string
}

/**
 * Text-only wordmark for "ROBOTECH ARCHIVO".
 * "ROBOTECH" renders in text-primary, "ARCHIVO" in accent, both uppercase
 * with wide tracking, per the Robotech Archivo design spec.
 */
export default function Wordmark({ as = 'span', className = '' }: WordmarkProps) {
  const Tag = as

  return (
    <Tag className={`font-display uppercase text-text-primary ${className}`}>
      ROBOTECH <span className="text-accent">ARCHIVO</span>
    </Tag>
  )
}

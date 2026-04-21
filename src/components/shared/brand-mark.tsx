import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/site-config'

/** Cache-bust when replacing favicon assets in /public */
export const BRAND_LOGO_SRC = '/favicon.png?v=20260421'

type BrandMarkProps = {
  className?: string
  size?: number
}

export function BrandMark({ className, size = 44 }: BrandMarkProps) {
  return (
    <img
      src={BRAND_LOGO_SRC}
      alt={`${SITE_CONFIG.name} logo`}
      width={size}
      height={size}
      className={cn('shrink-0 object-contain', className)}
    />
  )
}

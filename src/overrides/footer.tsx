import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { BrandMark } from '@/components/shared/brand-mark'

export const FOOTER_OVERRIDE_ENABLED = true

const explore = [
  { name: 'Gallery', href: '/images' },
  { name: 'Photographers', href: '/profile' },
  { name: 'Search', href: '/search' },
]

const company = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Help', href: '/help' },
]

const legal = [
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
]

export function FooterOverride() {
  return (
    <footer className="border-t border-[#1A3D2F]/10 bg-[#F5F2EB] text-[#1A3D2F]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1A3D2F]/12 bg-white shadow-sm">
                <BrandMark size={40} className="h-9 w-9 rounded-full" />
              </span>
              <span className="font-display text-xl font-semibold">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#1A3D2F]/65">
              A refined home for photography, visual stories, and the people who make them.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3D2F]/45">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#1A3D2F]/80">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#C29B6D]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3D2F]/45">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#1A3D2F]/80">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#C29B6D]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3D2F]/45">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#1A3D2F]/80">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#C29B6D]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-[#1A3D2F]/10 pt-6 text-center text-sm text-[#1A3D2F]/50">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

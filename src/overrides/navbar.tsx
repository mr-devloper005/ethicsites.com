'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { BrandMark } from '@/components/shared/brand-mark'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

export const NAVBAR_OVERRIDE_ENABLED = true

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/images', label: 'Gallery' },
  { href: '/profile', label: 'Photographers' },
  { href: '/contact', label: 'Contact' },
]

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1A3D2F]/10 bg-[#F5F2EB]/92 text-[#1A3D2F] backdrop-blur-xl">
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1A3D2F]/12 bg-white shadow-sm">
            <BrandMark size={40} className="h-9 w-9 rounded-full" />
          </div>
          <div className="hidden min-w-0 sm:block">
            <span className="block truncate font-display text-xl font-semibold tracking-[-0.02em]">{SITE_CONFIG.name}</span>
          </div>
        </Link>

        <div className="hidden items-center justify-center gap-8 lg:flex">
          {navLinks.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-semibold transition-colors',
                  active ? 'text-[#C29B6D]' : 'text-[#1A3D2F]/70 hover:text-[#1A3D2F]',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4 text-[#1A3D2F] hover:bg-[#1A3D2F]/5">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="rounded-full bg-[#1A3D2F] px-5 text-white hover:bg-[#234d3e]">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}
          <Button variant="ghost" size="icon" className="rounded-full text-[#1A3D2F] lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[#1A3D2F]/10 bg-[#F5F2EB] lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[#1A3D2F] hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
            {!isAuthenticated ? (
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-2xl border border-[#1A3D2F]/15 px-4 py-3 text-center text-sm font-semibold">
                  Sign In
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="rounded-2xl bg-[#1A3D2F] px-4 py-3 text-center text-sm font-semibold text-white">
                  Sign Up
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}

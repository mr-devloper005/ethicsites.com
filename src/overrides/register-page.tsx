import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { BrandMark } from '@/components/shared/brand-mark'
import { brandMuted, brandPrimaryButton, brandSoft, brandSurface } from '@/components/shared/brand-surfaces'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

export function RegisterPageOverride() {
  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1A3D2F]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <div className={`flex flex-col justify-between p-8 sm:p-10 ${brandSoft}`}>
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1A3D2F]/10 bg-white shadow-sm">
                <BrandMark size={48} className="h-11 w-11 rounded-full" />
              </div>
              <h1 className="mt-8 font-display text-4xl font-semibold tracking-[-0.04em]">
                Create your <span className="text-[#C29B6D]">creator account</span>
              </h1>
              <p className={`mt-5 max-w-md text-sm leading-8 ${brandMuted}`}>
                Join {SITE_CONFIG.name} to publish galleries, grow your photographer profile, and keep your visual work organized in one refined
                space.
              </p>
            </div>
            <ul className="mt-10 space-y-4 text-sm">
              {['Portfolio-friendly profile layout', 'Collections tuned for photography', 'Calm UI that keeps imagery first'].map((line) => (
                <li key={line} className="flex gap-3 border-b border-[#1A3D2F]/10 pb-4 last:border-0 last:pb-0">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C29B6D]" />
                  <span className={brandMuted}>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`p-8 sm:p-10 ${brandSurface}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3D2F]/45">Sign up</p>
            <h2 className="mt-3 font-display text-2xl font-semibold">Start in a few minutes</h2>
            <form className="mt-8 grid gap-4">
              <input
                className="h-12 rounded-xl border border-[#1A3D2F]/15 bg-white px-4 text-sm outline-none ring-[#C29B6D]/30 placeholder:text-[#1A3D2F]/40 focus:ring-2"
                placeholder="Full name"
              />
              <input
                className="h-12 rounded-xl border border-[#1A3D2F]/15 bg-white px-4 text-sm outline-none ring-[#C29B6D]/30 placeholder:text-[#1A3D2F]/40 focus:ring-2"
                placeholder="Email address"
                type="email"
              />
              <input
                className="h-12 rounded-xl border border-[#1A3D2F]/15 bg-white px-4 text-sm outline-none ring-[#C29B6D]/30 placeholder:text-[#1A3D2F]/40 focus:ring-2"
                placeholder="Password"
                type="password"
              />
              <input
                className="h-12 rounded-xl border border-[#1A3D2F]/15 bg-white px-4 text-sm outline-none ring-[#C29B6D]/30 placeholder:text-[#1A3D2F]/40 focus:ring-2"
                placeholder="Primary focus (e.g. wildlife, editorial, weddings)"
              />
              <button type="button" className={`${brandPrimaryButton} h-12 w-full`}>
                Create account
              </button>
            </form>
            <div className={`mt-8 flex flex-wrap items-center justify-between gap-3 text-sm ${brandMuted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[#1A3D2F] hover:text-[#C29B6D]">
                <Sparkles className="h-4 w-4" />
                Sign in
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

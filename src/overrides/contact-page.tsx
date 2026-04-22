import Link from 'next/link'
import { ArrowUpRight, Camera, Mail, MessageCircle } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { brandMuted, brandPrimaryButton, brandSoft, brandSurface } from '@/components/shared/brand-surfaces'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const lanes = [
  {
    icon: Camera,
    title: 'Licensing & commissions',
    body: 'Ask about editorial usage, print sales, or booking a photographer for your next campaign.',
  },
  {
    icon: MessageCircle,
    title: 'Gallery & profiles',
    body: 'Get help with uploads, collections, profile visibility, and how we feature new work.',
  },
  {
    icon: Mail,
    title: 'Partnerships',
    body: 'Press, education, and community collaborations—we read every note and reply within a few business days.',
  },
]

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1A3D2F]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#1A3D2F]/45">Contact</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Let&apos;s talk about <span className="text-[#C29B6D]">your next visual project</span>.
            </h1>
            <p className={`mt-5 max-w-2xl text-sm leading-8 ${brandMuted}`}>
              {SITE_CONFIG.name} is built around photography and creator profiles. Tell us what you need—licensing, curation, account help, or
              something else—and we will route it to the right person.
            </p>
            <div className="mt-10 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`p-6 ${brandSoft}`}>
                  <lane.icon className="h-5 w-5 text-[#C29B6D]" />
                  <h2 className="mt-3 font-display text-xl font-semibold">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${brandMuted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-8 sm:p-10 ${brandSurface}`}>
            <h2 className="font-display text-2xl font-semibold">Send a message</h2>
            <p className={`mt-2 text-sm ${brandMuted}`}>This form is for UI preview—wire it to your workflow when you are ready.</p>
            <form className="mt-8 grid gap-4">
              <input
                className="h-12 rounded-xl border border-[#1A3D2F]/15 bg-white px-4 text-sm text-[#1A3D2F] outline-none ring-[#C29B6D]/30 placeholder:text-[#1A3D2F]/40 focus:ring-2"
                placeholder="Your name"
              />
              <input
                className="h-12 rounded-xl border border-[#1A3D2F]/15 bg-white px-4 text-sm text-[#1A3D2F] outline-none ring-[#C29B6D]/30 placeholder:text-[#1A3D2F]/40 focus:ring-2"
                placeholder="Email address"
                type="email"
              />
              <input
                className="h-12 rounded-xl border border-[#1A3D2F]/15 bg-white px-4 text-sm text-[#1A3D2F] outline-none ring-[#C29B6D]/30 placeholder:text-[#1A3D2F]/40 focus:ring-2"
                placeholder="Topic (e.g. licensing, profile, partnership)"
              />
              <textarea
                className="min-h-[180px] rounded-2xl border border-[#1A3D2F]/15 bg-white px-4 py-3 text-sm text-[#1A3D2F] outline-none ring-[#C29B6D]/30 placeholder:text-[#1A3D2F]/40 focus:ring-2"
                placeholder="Share context so we can respond with the right next step."
              />
              <button type="button" className={`${brandPrimaryButton} h-12 w-full`}>
                Send message
              </button>
            </form>
            <p className={`mt-6 text-sm ${brandMuted}`}>
              Prefer browsing first?{' '}
              <Link href="/images" className="inline-flex items-center gap-1 font-semibold text-[#C29B6D] hover:underline">
                Open the gallery
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

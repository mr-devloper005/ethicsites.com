'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { BrandMark } from '@/components/shared/brand-mark'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1A3D2F]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#1A3D2F]/10 bg-[linear-gradient(180deg,#ffffff_0%,#F5F2EB_100%)]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex min-w-0 flex-1 gap-5">
                <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full border border-[#1A3D2F]/12 bg-white shadow-[0_12px_40px_rgba(26,61,47,0.08)]">
                  <BrandMark size={52} className="h-[3.25rem] w-[3.25rem]" />
                </div>
                <div className="min-w-0">
                  <h1 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{title}</h1>
                  {description ? <p className="mt-3 max-w-2xl text-sm leading-7 text-[#1A3D2F]/70">{description}</p> : null}
                </div>
              </div>
              {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}

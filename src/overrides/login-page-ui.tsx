'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { BrandMark } from '@/components/shared/brand-mark'
import { useAuth } from '@/lib/auth-context'
import { storageKeys } from '@/lib/local-storage'

export function LoginPageOverride() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.')
      return
    }
    try {
      await login(email.trim(), password)
      if (typeof window !== 'undefined') {
        const raw = window.localStorage.getItem(storageKeys.user)
        if (raw) {
          const userData = JSON.parse(raw) as unknown
          window.localStorage.setItem('user', JSON.stringify(userData))
        }
      }
      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1A3D2F]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#1A3D2F]/10 bg-[#1A3D2F] p-10 text-white">
            <div className="absolute right-6 top-6 h-24 w-24 rounded-full border border-[#C29B6D]/40" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-md">
              <BrandMark size={52} className="h-12 w-12 rounded-full" />
            </div>
            <p className="relative mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Member access</p>
            <h1 className="relative mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-[2.75rem]">
              Welcome back to your <span className="text-[#C29B6D]">visual library</span>
            </h1>
            <p className="relative mt-5 max-w-md text-sm leading-8 text-white/75">
              Sign in to save collections, follow photographers, and keep your uploads organized in one calm workspace.
            </p>
            <ul className="relative mt-10 space-y-4 text-sm text-white/80">
              {[
                'Curated galleries and featured collections',
                'Profiles tuned for photographers and visual artists',
                'A softer interface built around imagery',
              ].map((line) => (
                <li key={line} className="flex gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C29B6D]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-[#1A3D2F]/10 bg-white/90 p-8 shadow-[0_28px_80px_rgba(26,61,47,0.08)] backdrop-blur-sm sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#1A3D2F]/55">Sign in</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em]">Continue with your account</h2>
            <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm font-medium text-[#1A3D2F]/80">
                Email
                <input
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="h-12 rounded-xl border border-[#1A3D2F]/15 bg-[#F5F2EB]/60 px-4 text-[#1A3D2F] outline-none ring-[#C29B6D]/40 placeholder:text-[#1A3D2F]/35 focus:ring-2"
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[#1A3D2F]/80">
                Password
                <input
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="h-12 rounded-xl border border-[#1A3D2F]/15 bg-[#F5F2EB]/60 px-4 text-[#1A3D2F] outline-none ring-[#C29B6D]/40 placeholder:text-[#1A3D2F]/35 focus:ring-2"
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                />
              </label>
              {error ? <p className="text-sm text-red-700">{error}</p> : null}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1A3D2F] px-6 text-sm font-semibold text-white transition hover:bg-[#234d3e] disabled:opacity-60"
              >
                {isLoading ? 'Signing in…' : 'Sign in'}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-[#1A3D2F]/65">
              <Link href="/forgot-password" className="font-medium hover:text-[#1A3D2F] hover:underline">
                Forgot password?
              </Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#1A3D2F] hover:text-[#C29B6D]">
                Create account
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

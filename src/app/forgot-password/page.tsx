"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"
import { BrandMark } from "@/components/shared/brand-mark"
import { brandMuted, brandPrimaryButton, brandSurface } from "@/components/shared/brand-surfaces"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1A3D2F]">
      <NavbarShell />
      <main className="mx-auto flex max-w-lg flex-col px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={`${brandSurface} p-8 sm:p-10`}
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1A3D2F]/10 bg-white shadow-sm">
              <BrandMark size={40} className="h-9 w-9 rounded-full" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1A3D2F]/45">Account</p>
              <p className="font-display text-lg font-semibold">Password recovery</p>
            </div>
          </div>

          <Link
            href="/login"
            className={`mb-8 inline-flex items-center gap-2 text-sm font-medium ${brandMuted} hover:text-[#1A3D2F]`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>

          {!isSubmitted ? (
            <>
              <h1 className="font-display text-3xl font-semibold tracking-[-0.03em]">Reset your password</h1>
              <p className={`mt-3 text-sm leading-7 ${brandMuted}`}>
                Enter the email you use for {` `}
                <span className="font-medium text-[#1A3D2F]">your gallery account</span>. We will send a secure link to create a new password.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#1A3D2F]">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1A3D2F]/40" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 border-[#1A3D2F]/15 bg-white pl-10 text-[#1A3D2F] placeholder:text-[#1A3D2F]/40"
                      required
                    />
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className={`${brandPrimaryButton} h-12 w-full`}>
                  {isLoading ? "Sending…" : "Send reset link"}
                </button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#C29B6D]/40 bg-[#F5F2EB]">
                <CheckCircle className="h-8 w-8 text-[#1A3D2F]" />
              </div>
              <h1 className="font-display text-3xl font-semibold tracking-[-0.03em]">Check your email</h1>
              <p className={`mt-3 text-sm leading-7 ${brandMuted}`}>
                We sent a reset link to <strong className="text-[#1A3D2F]">{email}</strong>
              </p>
              <Button asChild variant="outline" className="mt-8 h-11 w-full rounded-full border-[#1A3D2F]/20 text-[#1A3D2F] hover:bg-white">
                <Link href="/login">Back to sign in</Link>
              </Button>
              <p className={`mt-6 text-sm ${brandMuted}`}>
                Didn&apos;t receive it?{" "}
                <button type="button" onClick={() => setIsSubmitted(false)} className="font-semibold text-[#C29B6D] hover:underline">
                  Try again
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

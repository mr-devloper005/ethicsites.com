import Link from "next/link"
import { PageShell } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SITE_CONFIG } from "@/lib/site-config"
import { brandMuted, brandPrimaryButton, brandSoft, brandSurface } from "@/components/shared/brand-surfaces"

const roles = [
  { title: "Product designer, visual systems", location: "Remote", type: "Full-time", level: "Mid" },
  { title: "Frontend engineer, media UX", location: "Hybrid · NYC", type: "Full-time", level: "Senior" },
  { title: "Community & creator partnerships", location: "Remote", type: "Full-time", level: "Mid" },
]

const benefits = [
  "Photography stipend for personal projects",
  "Remote-first with quarterly creative offsites",
  "Health coverage and generous parental leave",
  "Hardware budget tuned for visual work",
]

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`Help shape ${SITE_CONFIG.name}—where photographers, viewers, and curators meet in a calmer interface.`}
      actions={
        <Button asChild className={brandPrimaryButton}>
          <Link href="/contact">Start a conversation</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {roles.map((role) => (
            <Card key={role.title} className={`${brandSurface} border-0 shadow-none`}>
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full border border-[#1A3D2F]/12 bg-[#F5F2EB] text-[#1A3D2F]">{role.level}</Badge>
                  <Badge variant="outline" className="rounded-full border-[#1A3D2F]/20 text-[#1A3D2F]">
                    {role.type}
                  </Badge>
                </div>
                <h2 className="mt-3 font-display text-lg font-semibold text-[#1A3D2F]">{role.title}</h2>
                <p className={`mt-1 text-sm ${brandMuted}`}>{role.location}</p>
                <Button variant="outline" className="mt-4 rounded-full border-[#1A3D2F]/20 text-[#1A3D2F] hover:bg-white" asChild>
                  <Link href="/contact">View role</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={`${brandSurface} border-0 shadow-none`}>
          <CardContent className="p-8">
            <h3 className="font-display text-lg font-semibold text-[#1A3D2F]">Why join</h3>
            <p className={`mt-3 text-sm leading-7 ${brandMuted}`}>
              We obsess over negative space, honest typography, and interfaces that respect photographers&apos; time. If that resonates, you will fit
              right in.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              {benefits.map((benefit) => (
                <div key={benefit} className={`rounded-xl px-3 py-2 ${brandSoft} ${brandMuted}`}>
                  {benefit}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}

import Link from "next/link"
import { PageShell } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SITE_CONFIG } from "@/lib/site-config"
import { brandMuted, brandPrimaryButton, brandSoft, brandSurface } from "@/components/shared/brand-surfaces"

const highlights = [
  { label: "Images published", value: "24k+" },
  { label: "Active photographer profiles", value: "3.1k" },
  { label: "Curated collections", value: "960" },
]

const values = [
  {
    title: "Imagery first",
    description: "Layouts, spacing, and typography are tuned so photographs stay the hero—not buried under unrelated modules.",
  },
  {
    title: "Profiles with craft",
    description: "Photographers get a studio-grade profile surface: specialties, regions, and story without corporate clutter.",
  },
  {
    title: "Quiet discovery",
    description: "Search and browse feel editorial: calmer cards, forest-and-gold accents, and room to breathe between sets.",
  },
]

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a photography-forward platform for galleries, visual stories, and the people behind the lens.`}
      actions={
        <>
          <Button variant="outline" asChild className="rounded-full border-[#1A3D2F]/20 bg-white text-[#1A3D2F] hover:bg-[#F5F2EB]">
            <Link href="/profile">Meet photographers</Link>
          </Button>
          <Button asChild className={brandPrimaryButton}>
            <Link href="/contact">Contact us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className={`${brandSurface} border-0 shadow-none`}>
          <CardContent className="space-y-5 p-8">
            <Badge className="rounded-full border border-[#1A3D2F]/15 bg-[#F5F2EB] text-[#1A3D2F]">Our story</Badge>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-[#1A3D2F]">
              Built for people who think in frames, light, and sequence.
            </h2>
            <p className={`text-sm leading-8 ${brandMuted}`}>
              We set out to build a calmer corner of the web for photographers and image lovers—where uploads, profiles, and collections share one
              cohesive visual language inspired by premium print studios and nature itself.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className={`rounded-2xl p-4 ${brandSoft}`}>
                  <div className="font-display text-2xl font-semibold text-[#1A3D2F]">{item.value}</div>
                  <div className={`mt-1 text-xs font-medium uppercase tracking-[0.14em] ${brandMuted}`}>{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className={`${brandSurface} border-0 shadow-none`}>
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold text-[#1A3D2F]">{value.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${brandMuted}`}>{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  )
}

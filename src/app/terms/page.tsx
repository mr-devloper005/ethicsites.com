import { PageShell } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { SITE_CONFIG } from "@/lib/site-config"
import { brandMuted, brandSoft, brandSurface } from "@/components/shared/brand-surfaces"

const sections = [
  {
    title: "Acceptable use",
    body: "Share imagery and text you have rights to publish. No harassment, scraping that harms the service, or illegal content.",
  },
  {
    title: "Content & licensing",
    body: "You keep ownership of your photos. You grant the platform a license to host, display, and distribute your work as needed to run the product.",
  },
  {
    title: "Accounts & security",
    body: "Keep credentials private. We may suspend accounts that risk the community or the stability of the service.",
  },
]

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description={`The rules for using ${SITE_CONFIG.name} as a photographer, viewer, or partner.`}
    >
      <Card className={`${brandSurface} border-0 shadow-none`}>
        <CardContent className="space-y-5 p-8">
          <p className={`text-xs font-medium uppercase tracking-[0.16em] ${brandMuted}`}>Last updated: April 21, 2026</p>
          {sections.map((section) => (
            <div key={section.title} className={`rounded-2xl p-5 ${brandSoft}`}>
              <h3 className="font-display text-sm font-semibold text-[#1A3D2F]">{section.title}</h3>
              <p className={`mt-2 text-sm leading-7 ${brandMuted}`}>{section.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  )
}

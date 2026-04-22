import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { brandMuted, brandSoft, brandSurface } from '@/components/shared/brand-surfaces'

const sections = [
  {
    title: 'Essential cookies',
    body: 'Keep you signed in, protect sessions, and remember security preferences across visits.',
  },
  {
    title: 'Analytics cookies',
    body: 'Help us understand which gallery layouts and flows work best—always aggregated, never sold.',
  },
  {
    title: 'Preference cookies',
    body: 'Remember filters, light/density choices where available, and language for a smoother return visit.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie Policy"
      description="Transparent detail about the cookies we use for accounts, analytics, and preferences."
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

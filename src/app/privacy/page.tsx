import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { brandMuted, brandSoft, brandSurface } from '@/components/shared/brand-surfaces'

const sections = [
  {
    title: 'What we collect',
    body: 'Account details, gallery metadata, usage signals that keep search fast, and messages you send through support forms.',
  },
  {
    title: 'How we use it',
    body: 'To operate the service, personalize your experience, protect accounts, and improve discovery for photographers and viewers.',
  },
  {
    title: 'Your controls',
    body: 'Export or delete your profile, adjust email preferences, and manage cookies from compatible browsers at any time.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="How we collect, use, and protect information on this photography and profiles platform."
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

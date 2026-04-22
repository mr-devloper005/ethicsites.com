import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { brandMuted, brandSoft, brandSurface } from '@/components/shared/brand-surfaces'

const licenses = [
  { name: 'Next.js', description: 'MIT License — application framework' },
  { name: 'React', description: 'MIT License — UI rendering' },
  { name: 'Tailwind CSS', description: 'MIT License — utility-first styling' },
  { name: 'Radix UI', description: 'MIT License — accessible primitives' },
]

export default function LicensesPage() {
  return (
    <PageShell
      title="Open source licenses"
      description="Acknowledgements for libraries that power this experience."
    >
      <Card className={`${brandSurface} border-0 shadow-none`}>
        <CardContent className="space-y-3 p-8">
          {licenses.map((license) => (
            <div key={license.name} className={`rounded-2xl p-4 ${brandSoft}`}>
              <h3 className="font-display text-sm font-semibold text-[#1A3D2F]">{license.name}</h3>
              <p className={`mt-1 text-sm ${brandMuted}`}>{license.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  )
}

import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { brandMuted, brandSoft, brandSurface } from '@/components/shared/brand-surfaces'

const services = [
  { name: 'Web app', status: 'Operational', detail: 'Gallery, profiles, and auth' },
  { name: 'Media delivery', status: 'Operational', detail: 'Image CDN and resizing' },
  { name: 'Search', status: 'Operational', detail: 'Cross-collection discovery' },
]

const incidents = [
  { date: 'Apr 2, 2026', title: 'Brief image cache delay', status: 'Resolved' },
  { date: 'Mar 18, 2026', title: 'Scheduled maintenance window', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <PageShell
      title="System status"
      description="Live view of the services that keep galleries and profiles online."
    >
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className={`${brandSurface} border-0 shadow-none`}>
              <CardContent className="p-6">
                <h2 className="font-display text-lg font-semibold text-[#1A3D2F]">{service.name}</h2>
                <p className={`mt-2 text-xs ${brandMuted}`}>{service.detail}</p>
                <Badge className="mt-4 rounded-full border border-[#1A3D2F]/15 bg-[#F5F2EB] text-[#1A3D2F]">{service.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={`${brandSurface} border-0 shadow-none`}>
          <CardContent className="p-8">
            <h3 className="font-display text-lg font-semibold text-[#1A3D2F]">Recent incidents</h3>
            <div className="mt-5 space-y-3">
              {incidents.map((incident) => (
                <div key={incident.title} className={`rounded-2xl px-4 py-3 ${brandSoft}`}>
                  <div className={`text-xs font-medium uppercase tracking-[0.12em] ${brandMuted}`}>{incident.date}</div>
                  <div className="text-sm font-semibold text-[#1A3D2F]">{incident.title}</div>
                  <div className={`text-xs ${brandMuted}`}>{incident.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}

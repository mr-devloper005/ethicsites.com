import Link from "next/link"
import { PageShell } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { mockFaqs } from "@/data/mock-data"
import { brandMuted, brandPrimaryButton, brandSoft, brandSurface } from "@/components/shared/brand-surfaces"

const topics = [
  {
    title: "Website Navigation",
    description: "Learn how to navigate the website interface, use search functionality, and find content efficiently.",
  },
  {
    title: "Image Gallery",
    description: "Browse and explore image galleries, use filters to find specific content, and understand card layouts.",
  },
  {
    title: "UI Features",
    description: "Discover website interface features including card styling, text visibility improvements, and responsive design.",
  },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Guides for website navigation, image galleries, UI features, and interface usage—written for optimal user experience."
      actions={
        <Button asChild className={brandPrimaryButton}>
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <Card key={topic.title} className={`${brandSurface} border-0 shadow-none transition-transform hover:-translate-y-0.5`}>
              <CardContent className="p-6">
                <h2 className="font-display text-lg font-semibold text-[#1A3D2F]">{topic.title}</h2>
                <p className={`mt-2 text-sm leading-7 ${brandMuted}`}>{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={`${brandSurface} border-0 shadow-none`}>
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold text-[#1A3D2F]">FAQ</h3>
            <Accordion type="single" collapsible className="mt-4">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-[#1A3D2F]/10">
                  <AccordionTrigger className="text-left text-[#1A3D2F] hover:text-[#C29B6D]">{faq.question}</AccordionTrigger>
                  <AccordionContent className={brandMuted}>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className={`mt-6 rounded-2xl p-4 ${brandSoft}`}>
              <p className={`text-sm ${brandMuted}`}>
                Looking for licensing or partnerships?{" "}
                <Link href="/contact" className="font-semibold text-[#C29B6D] hover:underline">
                  Message the team
                </Link>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}

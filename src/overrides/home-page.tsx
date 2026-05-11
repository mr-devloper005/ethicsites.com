import Link from 'next/link'
import { ArrowUpRight, Camera, Quote, Sparkles, Star } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const FALLBACK_COLLAGE = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=700&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=700&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=80',
]

const COLLECTIONS = [
  { title: 'Landscape', blurb: 'Horizons, terrain, and quiet scale.', href: '/images' },
  { title: 'Portrait', blurb: 'Faces, light, and intimate framing.', href: '/images' },
  { title: 'Editorial', blurb: 'Sequences built for narrative rhythm.', href: '/images' },
  { title: 'Abstract', blurb: 'Texture, color fields, and form.', href: '/images' },
]

const PHOTOGRAPHER_NICHES = ['Wildlife photographer', 'Editorial photographer', 'Architectural photographer', 'Fine art photographer']

const TESTIMONIALS = [
  {
    quote: 'The gallery rhythm feels intentional—like walking through a curated museum, not a noisy feed.',
    name: 'Morgan Ellis',
    role: 'Creative director',
  },
  {
    quote: 'Uploading sets and seeing them land in collections with this polish is rare for a community platform.',
    name: 'Priya Nandakumar',
    role: 'Documentary photographer',
  },
]

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as { images?: unknown }).images)
      ? (post.content as { images: string[] }).images.find((url: unknown) => typeof url === 'string' && url)
      : null
  const logo =
    typeof post?.content === 'object' && post?.content && typeof (post.content as { logo?: unknown }).logo === 'string'
      ? (post.content as { logo: string }).logo
      : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export async function HomePageOverride() {
  const imagePosts = await fetchTaskPosts('image', 12, { allowMockFallback: true, fresh: true })

  const collageSources =
    imagePosts.length >= 4
      ? imagePosts.slice(0, 4).map((p) => getPostImage(p))
      : [...imagePosts.map((p) => getPostImage(p)), ...FALLBACK_COLLAGE].slice(0, 4)

  const featuredImages = imagePosts.length ? imagePosts.slice(0, 6) : null

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1A3D2F] antialiased">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/12 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1A3D2F]/60">
                <Sparkles className="h-3.5 w-3.5 text-[#C29B6D]" />
                Curated photography
              </p>
              <h1 className="mt-8 font-display text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.25rem]">
                A refined space for <span className="text-[#C29B6D]">immersive creativity</span> and storytelling.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#1A3D2F]/70">
                Browse striking work, follow creators, and keep your own images organized in a calm, editorial layout inspired by premium studios.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1A3D2F] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(26,61,47,0.22)] transition hover:bg-[#234d3e]"
                >
                  Contact us
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/images"
                  className="inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/20 bg-white/80 px-7 py-3.5 text-sm font-semibold text-[#1A3D2F] transition hover:border-[#C29B6D]/50 hover:bg-white"
                >
                  Browse all images
                </Link>
              </div>
                          </div>

            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="absolute -left-4 top-8 hidden text-[#C29B6D] lg:block">
                <Star className="h-5 w-5 fill-[#C29B6D]/30" />
              </div>
              <div className="absolute -right-2 bottom-16 z-10 text-[#C29B6D] lg:block">
                <Star className="h-4 w-4 fill-[#C29B6D]/40" />
              </div>
              <svg className="absolute -bottom-6 right-8 hidden w-28 text-[#C29B6D]/50 lg:block" viewBox="0 0 120 32" fill="none" aria-hidden>
                <path d="M4 20 Q30 4 60 18 T116 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative z-[1] col-span-1 row-span-2 overflow-hidden rounded-[1.75rem] border border-[#1A3D2F]/10 shadow-[0_24px_60px_rgba(14,42,36,0.12)]">
                  <div className="relative aspect-[3/4] w-full">
                    <ContentImage src={collageSources[0]} alt="Hero photography collage" fill className="object-cover" />
                  </div>
                </div>
                <div className="relative z-[2] -ml-4 mt-8 overflow-hidden rounded-[1.5rem] border border-[#1A3D2F]/10 shadow-lg sm:-ml-6 sm:mt-12">
                  <div className="relative aspect-[4/3] w-full">
                    <ContentImage src={collageSources[1]} alt="Hero photography collage" fill className="object-cover" />
                  </div>
                </div>
                <div className="relative z-[3] -mt-6 overflow-hidden rounded-[1.5rem] border border-[#1A3D2F]/10 shadow-lg sm:-mt-10">
                  <div className="relative aspect-square w-full">
                    <ContentImage src={collageSources[2]} alt="Hero photography collage" fill className="object-cover" />
                  </div>
                </div>
                <div className="relative z-[2] col-span-2 -mt-4 flex justify-end sm:-mt-6">
                  <div className="relative w-[58%] overflow-hidden rounded-[1.5rem] border border-[#1A3D2F]/10 shadow-md">
                    <div className="relative aspect-[5/3] w-full">
                      <ContentImage src={collageSources[3]} alt="Hero photography collage" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About-style band */}
        <section className="border-y border-[#1A3D2F]/8 bg-white/40 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
            <div className="relative">
              <div className="absolute left-6 top-6 z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#C29B6D] bg-[#F5F2EB]/95 text-[10px] font-bold uppercase leading-tight tracking-wider text-[#1A3D2F] shadow-md">
                Since 2024
              </div>
              <div className="relative overflow-hidden rounded-[2rem] border border-[#1A3D2F]/10 shadow-[0_28px_80px_rgba(14,42,36,0.1)]">
                <div className="relative aspect-[4/5] w-full max-h-[520px]">
                  <ContentImage
                    src={featuredImages?.[0] ? getPostImage(featuredImages[0]) : FALLBACK_COLLAGE[1]}
                    alt="Featured visual"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-start gap-3">
                <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                  We surface the most compelling imagery—without the clutter of listings, classifieds, or feeds that were never meant for photos.
                </h2>
                <Camera className="mt-2 hidden h-6 w-6 shrink-0 text-[#C29B6D] sm:block" aria-hidden />
              </div>
              <p className="mt-6 text-base leading-8 text-[#1A3D2F]/70">
                Every layout decision here favors negative space, serif headlines, and forest-and-gold accents so your work stays the hero. Collections are first-class—nothing else competes for attention.
              </p>
              <p className="mt-4 text-base leading-8 text-[#1A3D2F]/70">
                Whether you shoot editorial, wildlife, or abstract studies, this is a home base that reads like a studio site, not a generic portal.
              </p>
              <Link
                href="/images"
                className="mt-10 inline-flex items-center justify-center rounded-full bg-[#1A3D2F] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#234d3e]"
              >
                Browse all images
              </Link>
            </div>
          </div>
        </section>

        {/* Featured collections + dark testimonials */}
        <section className="bg-[#1A3D2F] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C29B6D]">Featured collections</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Rooms of work, organized like a gallery.</h2>
              </div>
              <Link href="/images" className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-[#C29B6D]">
                View gallery
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {COLLECTIONS.map((c) => (
                <Link
                  key={c.title}
                  href={c.href}
                  className="group rounded-2xl border border-white/10 bg-[#F5F2EB] p-6 text-[#1A3D2F] shadow-sm transition hover:border-[#C29B6D]/60"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3D2F]/45">{c.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[#1A3D2F]/70">{c.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#C29B6D] group-hover:gap-2">
                    Open
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>

            {featuredImages && featuredImages.length > 0 ? (
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featuredImages.slice(0, 3).map((post) => (
                  <Link key={post.id} href={`/images/${post.slug}`} className="group overflow-hidden rounded-2xl border border-white/10">
                    <div className="relative aspect-[16/10] w-full">
                      <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                    </div>
                    <div className="border-t border-white/10 bg-gradient-to-t from-[#1A3D2F]/95 via-[#1A3D2F]/85 to-[#1A3D2F] px-4 py-3">
                      <p className="font-display text-lg font-semibold text-white drop-shadow-lg">{post.title}</p>
                      <p className="text-xs text-white/80 drop-shadow-md">Featured image</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

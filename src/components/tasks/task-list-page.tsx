import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Plus, Sparkles, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { CategoryFilter } from '@/components/tasks/category-filter'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { buildPostUrl, fetchTaskPosts, getPostImages } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory': 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]',
  'listing-showcase': 'bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)]',
  'article-editorial': 'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.08),transparent_20%),linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]',
  'article-journal': 'bg-[linear-gradient(180deg,#fffdf9_0%,#f7f1ea_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#09101d_0%,#111c2f_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(180deg,#F5F2EB_0%,#ffffff_100%)] text-[#1A3D2F]',
  'profile-creator': 'bg-[linear-gradient(180deg,#0a1120_0%,#101c34_100%)] text-white',
  'profile-business': 'bg-[linear-gradient(180deg,#F5F2EB_0%,#faf8f5_100%)] text-[#1A3D2F]',
  'classified-bulletin': 'bg-[linear-gradient(180deg,#edf3e4_0%,#ffffff_100%)]',
  'classified-market': 'bg-[linear-gradient(180deg,#f4f6ef_0%,#ffffff_100%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#fff7ee_0%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(180deg,#f7f8fc_0%,#ffffff_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const allPosts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'

  // Filter posts by category on server-side
  const posts = normalizedCategory === 'all'
    ? allPosts
    : allPosts.filter((post) => {
        const content = post.content && typeof post.content === 'object' ? post.content : {}
        const postCategory = typeof (content as any).category === 'string' ? (content as any).category : ''
        return normalizeCategory(postCategory) === normalizedCategory
      })

  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`

  /** Theme packs often omit `image` in taskLayouts → layoutKey becomes `image-editorial` and skips all gallery UI. */
  const recipeImageLayout = recipe.taskLayouts.image as string | undefined
  const imageGalleryLayout: 'image-portfolio' | 'image-masonry' | null =
    task === 'image'
      ? recipeImageLayout === 'image-masonry' || recipeImageLayout === 'image-portfolio'
        ? (recipeImageLayout as 'image-portfolio' | 'image-masonry')
        : 'image-portfolio'
      : null

  const shellClass =
    imageGalleryLayout != null
      ? variantShells[imageGalleryLayout]
      : variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark =
    imageGalleryLayout === 'image-masonry' ||
    (task !== 'image' && ['image-masonry', 'profile-creator'].includes(layoutKey))
  const isBrandLight =
    imageGalleryLayout === 'image-portfolio' || layoutKey === 'image-portfolio' || layoutKey === 'profile-business'
  const ui = isDark
    ? {
        muted: 'text-slate-300',
        panel: 'border border-white/10 bg-white/6',
        soft: 'border border-white/10 bg-white/5',
        input: 'border-white/10 bg-white/6 text-white',
        button: 'bg-white text-slate-950 hover:bg-slate-200',
      }
    : isBrandLight
      ? {
          muted: 'text-[#1A3D2F]/70',
          panel: 'border border-[#1A3D2F]/12 bg-white/95 shadow-[0_20px_50px_rgba(26,61,47,0.07)]',
          soft: 'border border-[#1A3D2F]/10 bg-[#F5F2EB]',
          input: 'border border-[#1A3D2F]/15 bg-white text-[#1A3D2F]',
          button: 'bg-[#1A3D2F] text-white hover:bg-[#234d3e]',
        }
    : layoutKey.startsWith('article') || layoutKey.startsWith('sbm')
      ? {
          muted: 'text-[#72594a]',
          panel: 'border border-[#dbc6b6] bg-white/90',
          soft: 'border border-[#dbc6b6] bg-[#fff8ef]',
          input: 'border border-[#dbc6b6] bg-white text-[#2f1d16]',
          button: 'bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
        }
      : {
          muted: 'text-slate-600',
          panel: 'border border-slate-200 bg-white',
          soft: 'border border-slate-200 bg-slate-50',
          input: 'border border-slate-200 bg-white text-slate-950',
          button: 'bg-slate-950 text-white hover:bg-slate-800',
        }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className={`rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] ${ui.panel}`}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] opacity-70"><Icon className="h-4 w-4" /> {taskConfig?.label || task}</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>Built with a cleaner scan rhythm, stronger metadata grouping, and a structure designed for business discovery rather than editorial reading.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>Explore results <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.soft}`}>Open search</Link>
              </div>
            </div>
            <form className={`grid gap-3 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-xl text-sm font-medium ${ui.button}`}>Apply filters</button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This reading surface uses slower pacing, stronger typographic hierarchy, and more breathing room so long-form content feels intentional rather than squeezed into a generic feed.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Reading note</p>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Use category filters to jump between topics without collapsing the page into the same repeated card rhythm used by other task types.</p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {task === 'image' && imageGalleryLayout ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                <Icon className="h-3.5 w-3.5" /> Gallery
              </div>
              <h1 className="mt-5 font-display text-[2.65rem] font-semibold leading-[1.05] tracking-[-0.05em] text-inherit sm:text-5xl">
                {imageGalleryLayout === 'image-portfolio' ? (
                  <>
                    Curated <span className="text-[#C29B6D]">visual stories</span>—frames, light, and texture.
                  </>
                ) : (
                  taskConfig?.description || 'Image gallery'
                )}
              </h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                {imageGalleryLayout === 'image-portfolio'
                  ? 'Scroll a gallery built like a museum wall: large tiles, gentle motion on hover, and categories when you want to narrow the mood.'
                  : 'Browse photography and visual stories in a calm, editorial layout—generous spacing, forest-and-gold accents, and imagery first.'}
              </p>
              {imageGalleryLayout === 'image-portfolio' ? (
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/create/image"
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-[0_10px_30px_rgba(26,61,47,0.18)] ${ui.button}`}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                    Create
                    <ArrowUpRight className="h-4 w-4 opacity-90" />
                  </Link>
                  <Link
                    href="/search?task=image"
                    className={`inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/18 bg-white px-5 py-3 text-sm font-semibold text-[#1A3D2F] shadow-sm transition hover:border-[#C29B6D]/45`}
                  >
                    <Sparkles className="h-4 w-4 text-[#C29B6D]" />
                    Search gallery
                  </Link>
                </div>
              ) : null}
              {imageGalleryLayout === 'image-masonry' ? (
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/create/image"
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                    Create
                    <ArrowUpRight className="h-4 w-4 opacity-90" />
                  </Link>
                  <Link
                    href="/search?task=image"
                    className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15`}
                  >
                    <Sparkles className="h-4 w-4 text-[#8df0c8]" />
                    Search gallery
                  </Link>
                </div>
              ) : null}
            </div>
            {imageGalleryLayout === 'image-portfolio' && posts.length ? (
              <div className="relative">
                <div className="pointer-events-none absolute -left-3 top-10 hidden text-[#C29B6D]/80 lg:block">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {posts.slice(0, 4).map((post, index) => {
                    const thumb = getPostImages(post)[0] || '/placeholder.svg?height=640&width=480'
                    const href = buildPostUrl('image', post.slug)
                    const cell =
                      index === 0
                        ? 'row-span-2 min-h-[260px] sm:min-h-[300px]'
                        : index === 3
                          ? 'col-span-2 min-h-[110px] sm:min-h-[128px]'
                          : 'min-h-[120px] sm:min-h-[134px]'
                    return (
                      <Link
                        key={post.id}
                        href={href}
                        className={`group relative overflow-hidden rounded-[1.65rem] border border-[#1A3D2F]/10 bg-white shadow-[0_16px_44px_rgba(26,61,47,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_56px_rgba(26,61,47,0.14)] ${cell}`}
                      >
                        <ContentImage
                          src={thumb}
                          alt={post.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A3D2F]/45 via-transparent to-transparent opacity-90" />
                        {index === 0 ? (
                          <span className="absolute bottom-4 left-4 max-w-[90%] font-display text-lg font-semibold text-white drop-shadow-sm sm:text-xl">
                            {post.title}
                          </span>
                        ) : null}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className={`min-h-[220px] rounded-[2rem] ${ui.panel}`} />
                <div className={`min-h-[220px] rounded-[2rem] ${ui.soft}`} />
                <div className={`col-span-2 min-h-[120px] rounded-[2rem] ${ui.panel}`} />
              </div>
            )}
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(26,61,47,0.08)] sm:p-10 ${ui.panel}`}>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              {layoutKey === 'profile-business' && posts.length ? (
                <div className="grid grid-cols-2 gap-3 sm:max-w-md">
                  {posts.slice(0, 4).map((post, index) => {
                    const thumb = getPostImages(post)[0] || '/placeholder.svg?height=200&width=200'
                    const href = buildPostUrl('profile', post.slug)
                    return (
                      <Link
                        key={post.id}
                        href={href}
                        className={`relative aspect-square overflow-hidden rounded-full border-2 border-white shadow-[0_12px_32px_rgba(26,61,47,0.12)] ring-2 ring-[#1A3D2F]/8 transition hover:-translate-y-0.5 hover:ring-[#C29B6D]/40 ${index === 1 ? 'sm:translate-x-2 sm:-translate-y-2' : index === 2 ? 'sm:-translate-x-1 sm:translate-y-1' : index === 3 ? 'sm:translate-x-2' : ''}`}
                      >
                        <ContentImage src={thumb} alt={post.title} fill className="object-cover grayscale transition duration-500 hover:grayscale-0" />
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className={`min-h-[240px] rounded-[2rem] ${ui.soft}`} />
              )}
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.05em] text-inherit sm:text-[2.5rem] sm:leading-tight">
                  {layoutKey === 'profile-business' ? (
                    <>
                      Photographers &amp; <span className="text-[#C29B6D]">visual artists</span>, in one directory.
                    </>
                  ) : (
                    'Profiles with stronger identity, trust, and reputation cues.'
                  )}
                </h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                  {layoutKey === 'profile-business'
                    ? 'Each card opens a calmer profile surface—specialty, region, and story—so you can find the right collaborator without wading through unrelated listings.'
                    : 'This layout prioritizes the person or business surface first, then lets the feed continue below without borrowing the same visual logic used by articles or listings.'}
                </p>
                {layoutKey === 'profile-business' ? (
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/create/profile"
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                      Create profile
                      <ArrowUpRight className="h-4 w-4 opacity-90" />
                    </Link>
                    <Link
                      href="/register"
                      className={`inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/18 bg-white px-5 py-3 text-sm font-semibold text-[#1A3D2F] shadow-sm transition hover:border-[#C29B6D]/45`}
                    >
                      Join as photographer
                    </Link>
                    <Link
                      href="/search?task=profile"
                      className={`inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/18 bg-[#F5F2EB] px-5 py-3 text-sm font-semibold text-[#1A3D2F] transition hover:border-[#C29B6D]/45`}
                    >
                      Search profiles
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className={`rounded-[1.8rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Fast-moving notices, offers, and responses in a compact board format.</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {['Quick to scan', 'Shorter response path', 'Clearer urgency cues'].map((item) => (
                <div key={item} className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Curated resources arranged more like collections than a generic post feed.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Bookmarks, saved resources, and reference-style items need calmer grouping and lighter metadata. This variant gives them that separation.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {((task === 'image' && taskConfig?.route) || (task === 'profile' && layoutKey === 'profile-business' && taskConfig?.route)) ? (
          <div
            className={`mb-10 flex flex-col gap-4 rounded-[1.75rem] border p-5 sm:flex-row sm:items-stretch sm:gap-5 ${
              task === 'image' && imageGalleryLayout === 'image-masonry'
                ? 'border-white/12 bg-[rgba(9,16,29,0.55)] shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-md'
                : isBrandLight
                  ? 'border-[#1A3D2F]/10 bg-white/90 shadow-[0_14px_40px_rgba(26,61,47,0.06)]'
                  : `${ui.panel}`
            }`}
          >
            <CategoryFilter
              route={taskConfig.route}
              inputClass={ui.input}
              buttonClass={ui.button}
              labelClass={ui.muted}
              mutedClass={ui.muted}
            />
            {task === 'image' ? (
              <div className="flex shrink-0 flex-col justify-end gap-2 sm:items-end">
                <span className={`hidden text-[10px] font-semibold uppercase tracking-[0.2em] sm:block ${ui.muted}`}>Publish</span>
                <Link
                  href="/create/image"
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition sm:min-w-[148px] ${
                    imageGalleryLayout === 'image-masonry'
                      ? 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]'
                      : 'bg-[#1A3D2F] text-white shadow-[0_10px_28px_rgba(26,61,47,0.2)] hover:bg-[#234d3e]'
                  }`}
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                  Create
                </Link>
              </div>
            ) : task === 'profile' && layoutKey === 'profile-business' ? (
              <div className="flex shrink-0 flex-col justify-end gap-2 sm:items-end">
                <span className={`hidden text-[10px] font-semibold uppercase tracking-[0.2em] sm:block ${ui.muted}`}>Directory</span>
                <Link
                  href="/create/profile"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1A3D2F] px-6 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(26,61,47,0.2)] transition hover:bg-[#234d3e] sm:min-w-[160px]"
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                  Create profile
                </Link>
              </div>
            ) : null}
          </div>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a key={link.href} href={link.href} className="font-semibold text-foreground hover:underline">{link.label}</a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient
          task={task}
          initialPosts={posts}
          category={normalizedCategory}
          galleryToolbar={task === 'image' && imageGalleryLayout === 'image-masonry' ? 'dark' : 'light'}
        />
      </main>
      <Footer />
    </div>
  )
}

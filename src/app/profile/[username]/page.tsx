import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/site-config";
import { Globe, Mail, MapPin, Sparkles } from "lucide-react";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";

export const revalidate = 3;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }

  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description, "Profile details will appear here once available.");
  const relatedProfiles = (await fetchTaskPosts("profile", 8))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        <section className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[2rem] border border-[#1A3D2F]/10 bg-white shadow-[0_24px_70px_rgba(26,61,47,0.08)]">
              <div className="relative aspect-[4/5] bg-[#ebe6de]">
                {logoUrl ? (
                  <ContentImage
                    src={logoUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 420px"
                    intrinsicWidth={960}
                    intrinsicHeight={1200}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-6xl font-semibold text-[#1A3D2F]/45">
                    {post.title.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#10271d]/38 via-transparent to-transparent" />
                <div className="absolute left-5 top-5">
                  <Badge className="border border-white/25 bg-white/15 text-white backdrop-blur-sm hover:bg-white/20">
                    <Sparkles className="mr-1 h-3.5 w-3.5" />
                    Profile
                  </Badge>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#1A3D2F]/10 bg-[#f7f3ec] p-6 shadow-[0_18px_44px_rgba(26,61,47,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3D2F]/55">Quick details</p>
              <div className="mt-4 space-y-3 text-sm text-[#1A3D2F]/72">
                {domain ? (
                  <div className="flex items-start gap-2">
                    <Globe className="mt-0.5 h-4 w-4" />
                    <span>{domain}</span>
                  </div>
                ) : null}
                {typeof content.location === "string" && content.location.trim() ? (
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4" />
                    <span>{content.location}</span>
                  </div>
                ) : null}
                {typeof content.email === "string" && content.email.trim() ? (
                  <div className="flex items-start gap-2">
                    <Mail className="mt-0.5 h-4 w-4" />
                    <a href={`mailto:${content.email}`} className="break-all text-[#1A3D2F] hover:underline">
                      {content.email}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#1A3D2F]/10 bg-[linear-gradient(180deg,#fffdf9_0%,#f5f2eb_100%)] p-8 shadow-[0_24px_70px_rgba(26,61,47,0.08)] md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#1A3D2F]/55">Featured profile</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em] text-[#1A3D2F] sm:text-5xl">
              {brandName}
            </h1>
            {domain ? (
              <p className="mt-3 text-sm font-medium text-[#1A3D2F]/58">{domain}</p>
            ) : null}
            <RichContent html={descriptionHtml} className="mt-6 max-w-3xl text-[#1A3D2F]/80 prose-p:my-5 prose-p:leading-8" />
            <div className="mt-8 flex flex-wrap gap-3">
              {website ? (
                <Button asChild size="lg" className="rounded-full bg-[#1A3D2F] px-7 text-base text-white hover:bg-[#234d3e]">
                  <Link href={website} target="_blank" rel="noopener noreferrer">
                    Visit official site
                  </Link>
                </Button>
              ) : null}
              {typeof content.email === "string" && content.email.trim() ? (
                <Button asChild size="lg" variant="outline" className="rounded-full border-[#1A3D2F]/15 bg-white px-7 text-base text-[#1A3D2F] hover:bg-[#f7f3ec]">
                  <a href={`mailto:${content.email}`}>Send email</a>
                </Button>
              ) : null}
            </div>
          </div>
        </section>

        {relatedProfiles.length ? (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">More profiles</h2>
              <Link href="/profile" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProfiles.map((profile) => (
                <TaskPostCard
                  key={profile.id}
                  post={profile}
                  href={buildPostUrl("profile", profile.slug)}
                  taskKey="profile"
                />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}

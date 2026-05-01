"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Image as ImageIcon, Plus, UserRound } from "lucide-react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";
import { brandMuted, brandSoft, brandSurface } from "@/components/shared/brand-surfaces";
import { cn } from "@/lib/utils";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
  galleryToolbar?: "light" | "dark";
};

export function TaskListClient({ task, initialPosts, category, galleryToolbar = "light" }: Props) {
  const localPosts = getLocalPostsForTask(task);

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  const isGallery = task === "image";
  const isProfiles = task === "profile";

  if (!merged.length) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 rounded-[1.75rem] border border-dashed border-[#1A3D2F]/18 px-8 py-16 text-center ${brandSurface}`}
      >
        <div className={`flex h-14 w-14 items-center justify-center rounded-full ${brandSoft}`}>
          {isGallery ? (
            <ImageIcon className="h-7 w-7 text-[#1A3D2F]/55" aria-hidden />
          ) : isProfiles ? (
            <UserRound className="h-7 w-7 text-[#1A3D2F]/55" aria-hidden />
          ) : (
            <ImageIcon className="h-7 w-7 text-[#1A3D2F]/55" aria-hidden />
          )}
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-[#1A3D2F]">
            {isGallery ? "No images in this view yet" : isProfiles ? "No profiles in this view yet" : "No posts yet"}
          </p>
          <p className={`mt-2 max-w-md text-sm ${brandMuted}`}>
            {isGallery
              ? "Try another category, upload a new set, or browse the homepage for featured work."
              : isProfiles
                ? "Adjust the category filter or invite creators to publish their photographer profiles."
                : "Check back soon or switch filters."}
          </p>
        </div>
        {isGallery ? (
          <Link
            href="/create/image"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1A3D2F] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#234d3e]"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Create image
          </Link>
        ) : isProfiles ? (
          <Link
            href="/create/profile"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1A3D2F] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#234d3e]"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Create profile
          </Link>
        ) : null}
      </div>
    );
  }

  const gridClass = isGallery
    ? "columns-1 gap-6 sm:columns-2 xl:columns-3"
    : isProfiles
      ? "mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
      : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div>
      {isGallery && merged.length > 0 ? (
        <div
          className={cn(
            "mb-8 flex flex-col gap-4 rounded-[1.35rem] border px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5",
            galleryToolbar === "dark"
              ? "border-white/12 bg-white/[0.07] text-white"
              : "border-[#1A3D2F]/10 bg-white/85 text-[#1A3D2F] shadow-[0_12px_36px_rgba(26,61,47,0.06)]",
          )}
        >
          <div>
            <p
              className={cn(
                "text-[11px] font-semibold uppercase tracking-[0.24em]",
                galleryToolbar === "dark" ? "text-slate-300" : "text-[#1A3D2F]/50",
              )}
            >
              Gallery
            </p>
            <p className="font-display text-lg font-semibold tracking-[-0.02em] sm:text-xl">
              {merged.length} {merged.length === 1 ? "image" : "images"}
              {category && category !== "all" ? (
                <span className={cn("ml-2 text-sm font-normal", galleryToolbar === "dark" ? "text-slate-300" : brandMuted)}>
                  - filtered
                </span>
              ) : null}
            </p>
          </div>
          <Link
            href="/create/image"
            className={cn(
              "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition",
              galleryToolbar === "dark"
                ? "bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]"
                : "bg-[#1A3D2F] text-white shadow-[0_8px_24px_rgba(26,61,47,0.18)] hover:bg-[#234d3e]",
            )}
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Create
          </Link>
        </div>
      ) : null}
      {isProfiles && merged.length > 0 ? (
        <div
          className={cn(
            "mb-8 flex flex-col gap-4 rounded-[1.35rem] border border-[#1A3D2F]/10 bg-white/85 px-4 py-3.5 text-[#1A3D2F] shadow-[0_12px_36px_rgba(26,61,47,0.06)] sm:flex-row sm:items-center sm:justify-between sm:px-5",
          )}
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1A3D2F]/50">Photographers</p>
            <p className="font-display text-lg font-semibold tracking-[-0.02em] sm:text-xl">
              {merged.length} {merged.length === 1 ? "profile" : "profiles"}
              {category && category !== "all" ? (
                <span className={cn("ml-2 text-sm font-normal", brandMuted)}>- filtered</span>
              ) : null}
            </p>
          </div>
          <Link
            href="/create/profile"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#1A3D2F] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(26,61,47,0.18)] transition hover:bg-[#234d3e]"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Create profile
          </Link>
        </div>
      ) : null}
      <div className={gridClass}>
        {merged.map((post) => {
          const localOnly = (post as any).localOnly;
          const href = localOnly ? `/local/${task}/${post.slug}` : buildPostUrl(task, post.slug);
          return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
        })}
      </div>
    </div>
  );
}

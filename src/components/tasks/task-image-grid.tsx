"use client";

import { ContentImage } from "@/components/shared/content-image";

export function TaskImageGrid({ images }: { images: string[] }) {
  if (!images.length) return null;

  // Masonry-like layout - first image large, others in 2-column grid
  const mainImage = images[0];
  const gridImages = images.slice(1);

  return (
    <div className="space-y-4">
      {/* Main large image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-[#1A3D2F]/10 shadow-[0_14px_40px_rgba(26,61,47,0.08)]">
        <ContentImage
          src={mainImage}
          alt="Main image"
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          quality={85}
          className="object-cover"
          intrinsicWidth={1440}
          intrinsicHeight={900}
          priority
        />
      </div>

      {/* Grid of remaining images */}
      {gridImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {gridImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-[#1A3D2F]/10 shadow-[0_10px_30px_rgba(26,61,47,0.06)]"
            >
              <ContentImage
                src={src}
                alt={`Image ${index + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 450px"
                quality={80}
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                intrinsicWidth={800}
                intrinsicHeight={600}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

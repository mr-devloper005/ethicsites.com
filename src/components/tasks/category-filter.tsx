"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CATEGORY_OPTIONS } from "@/lib/categories";

type Props = {
  route: string;
  inputClass: string;
  buttonClass: string;
  labelClass: string;
  mutedClass: string;
};

export function CategoryFilter({ route, inputClass, buttonClass, labelClass }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    const queryString = params.toString();
    router.push(`${route}${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-end sm:gap-4">
      <div className="min-w-0 flex-1">
        <label className={`block text-xs font-semibold uppercase tracking-[0.2em] ${labelClass}`}>Filter by category</label>
        <select
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`mt-2 h-12 w-full rounded-xl px-3 text-sm ${inputClass}`}
        >
          <option value="all">All categories</option>
          {CATEGORY_OPTIONS.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={`h-12 shrink-0 rounded-full px-8 text-sm font-semibold sm:min-w-[120px] ${buttonClass}`}>
        Apply
      </button>
    </form>
  );
}

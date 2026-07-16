import type { ReactNode } from "react";
import { DraftingMarks } from "@/components/ui/DraftingMarks";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line pb-16 pt-36 md:pt-44">
      <div className="schematic-bg absolute inset-0 -z-10" />
      <div className="bg-directional-light absolute inset-0 -z-10" />
      <DraftingMarks />
      <div className="container-page">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] text-paper md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-paper-muted md:text-base">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

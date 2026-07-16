import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-24 md:py-32", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-14 max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-paper md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-paper-muted">{description}</p>
      )}
    </div>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  icon?: ReactNode;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

const variants = {
  primary:
    "bg-paper text-ink-950 shadow-soft hover:bg-signal hover:text-white hover:shadow-glow-brass",
  secondary:
    "border border-line bg-white/[0.02] text-paper-dim hover:border-signal/40 hover:text-signal hover:bg-white/[0.05]",
  ghost: "text-paper-dim hover:text-paper",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  icon,
  external,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-[7px] px-5 py-2.5 font-mono text-[12.5px] font-medium tracking-[0.02em] transition-all duration-300 ease-out",
    variants[variant],
    className
  );

  const content = (() => {
    if (href) {
      if (external) {
        return (
          <a href={href} target="_blank" rel="noreferrer" className={classes}>
            {children}
            {icon}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
          {icon}
        </Link>
      );
    }

    return (
      <button type={type} onClick={onClick} className={classes}>
        {children}
        {icon}
      </button>
    );
  })();

  // Ghost buttons read as plain text links — magnetism is reserved for
  // primary/secondary CTAs, where a physical response feels intentional.
  if (variant === "ghost") return content;

  return <Magnetic>{content}</Magnetic>;
}

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { site, mainNav, moreNav } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-line">
      <div className="container-page grid grid-cols-1 gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="node-dot" />
            <span className="font-display text-base font-semibold text-paper">
              Vipul Dabaria
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper-muted">
            {site.description}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-paper-muted hover:text-signal">
              <Github className="h-[18px] w-[18px]" />
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-paper-muted hover:text-signal">
              <Linkedin className="h-[18px] w-[18px]" />
            </a>
            <a href={site.socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="text-paper-muted hover:text-signal">
              <Twitter className="h-[18px] w-[18px]" />
            </a>
            <a href={site.socials.email} aria-label="Email" className="text-paper-muted hover:text-signal">
              <Mail className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="flex flex-col gap-2.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-paper-muted hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">More</p>
          <ul className="flex flex-col gap-2.5">
            {moreNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-paper-muted hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Base</p>
          <p className="text-sm text-paper-muted">{site.location}</p>
          <p className="mt-2 text-sm text-paper-muted">{site.university}</p>
          <p className="mt-2 text-sm text-paper-muted">{site.degree} · {site.year}</p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-paper-faint md:flex-row">
          <p className="font-mono">© {year} Vipul Dabaria. All signals accounted for.</p>
          <p className="font-mono">Built with Next.js, TypeScript & Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}

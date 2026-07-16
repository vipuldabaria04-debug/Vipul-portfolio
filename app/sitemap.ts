import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  const routes = [
    "",
    "/about",
    "/experience",
    "/projects",
    "/projects/urban-pulse",
    "/research",
    "/research/pinn-inertia-estimation",
    "/publications",
    "/achievements",
    "/photography",
    "/thoughts",
    "/snippets",
    "/resume",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/thoughts" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

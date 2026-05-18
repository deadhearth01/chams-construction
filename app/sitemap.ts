import type { MetadataRoute } from "next";
import { servicesTree } from "./data";

const SITE_URL = "https://chamsconstruction.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL + "/", lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: SITE_URL + "/about", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: SITE_URL + "/services", lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: SITE_URL + "/our-work", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: SITE_URL + "/join-our-team", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: SITE_URL + "/contact-us", lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = servicesTree.map((c) => ({
    url: `${SITE_URL}/services/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const subRoutes: MetadataRoute.Sitemap = servicesTree.flatMap((c) =>
    c.subservices.map((s) => ({
      url: `${SITE_URL}/services/${c.slug}/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...categoryRoutes, ...subRoutes];
}

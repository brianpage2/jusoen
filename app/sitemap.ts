import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://jusoen.co.kr'
  return [
    { url: base,                          lastModified: new Date('2026-05-12'), changeFrequency: 'weekly',  priority: 1   },
    { url: `${base}/bank-account`,        lastModified: new Date('2026-05-12'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/swift-code`,          lastModified: new Date('2026-05-12'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/road-address`,        lastModified: new Date('2026-04-27'), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${base}/about`,              lastModified: new Date('2026-05-12'), changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${base}/privacy`,            lastModified: new Date('2026-04-25'), changeFrequency: 'yearly',  priority: 0.3 },
  ]
}

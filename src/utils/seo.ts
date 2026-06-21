export const SITE_NAME = 'HODA Wellness Group';
export const SITE_CITY = 'Allen, TX';
export const DEFAULT_OG_IMAGE = '/og-default.jpg';
export const DEFAULT_DESCRIPTION =
  'Integrated wellness practice combining functional medicine, personalized nutrition, movement coaching, and nervous system regulation for durable aging.';

export function getSiteUrl(site: URL | string | undefined): URL {
  return new URL(site ?? 'https://musical-brioche-e3c8a5.netlify.app');
}

export function absoluteUrl(path: string, site: URL): string {
  return new URL(path.startsWith('/') ? path : `/${path}`, site).href;
}

export function organizationSchema(site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: site.href,
    logo: absoluteUrl(DEFAULT_OG_IMAGE, site),
    description: DEFAULT_DESCRIPTION,
    sameAs: [
      'https://www.instagram.com/hodawellness',
      'https://www.facebook.com/hodawellness',
      'https://www.linkedin.com/company/hodawellness',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-310-555-1234',
      email: 'info@hodawellness.com',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  };
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return JSON.stringify(data);
}

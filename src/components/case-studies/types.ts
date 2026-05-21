export type CaseStudySection =
    | {
          type: 'hero';
          badge?: string;
          title: string;
          subtitle: string;
          description: string;
          metrics: { label: string; value: string; change?: string }[];
          primaryCta?: string;
          secondaryCta?: string;
          primaryCtaHref?: string;
          secondaryCtaHref?: string;
      }
    | {
          type: 'overview';
          title: string;
          content: string[];
          stats?: { label: string; value: string }[];
      }
    | {
          type: 'challenge';
          title: string;
          items: { title: string; description: string }[];
      }
    | {
          type: 'solution';
          title: string;
          items: { title: string; description: string; image?: string }[];
      }
    | {
          type: 'metrics';
          title: string;
          metrics: { label: string; value: string; description?: string }[];
      }
    | {
          type: 'gallery';
          title: string;
          layout?: 'grid' | 'carousel';
          images: { title: string; description?: string; image: string }[];
      }
    | {
          type: 'cards';
          title: string;
          cards: { title: string; description: string; stats?: string[] }[];
      }
    | {
          type: 'quote';
          quote: string;
          author: string;
          role?: string;
      }
    | {
          type: 'results';
          title: string;
          items: { label: string; value: string; description?: string }[];
      }
    | {
          type: 'cta';
          title: string;
          description: string;
          primaryCta: string;
          secondaryCta?: string;
          primaryCtaHref?: string;
          secondaryCtaHref?: string;
      };

/** Page content for `/case-studies/[slug]/page.tsx` — metadata lives in `export const metadata`. */
export type CaseStudyContent = {
    slug: string;
    title: string;
    tagline: string;
    year: string;
    role: string;
    client?: string;
    duration?: string;
    categories?: string[];
    coverImage: string;
    sections: CaseStudySection[];
};

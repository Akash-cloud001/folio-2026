import { getFaqJsonLd } from '@/lib/ai-seo';

export function FaqJsonLd() {
    const jsonLd = getFaqJsonLd();

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

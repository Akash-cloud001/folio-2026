import { getSiteJsonLd } from '@/lib/json-ld';

export function SiteJsonLd() {
    const jsonLd = getSiteJsonLd();

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

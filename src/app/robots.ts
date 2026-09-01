import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/** AI crawlers explicitly allowed — content is public portfolio material. */
const AI_CRAWLERS = [
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    'anthropic-ai',
    'ClaudeBot',
    'Claude-Web',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
    'CCBot',
    'cohere-ai',
    'FacebookBot',
    'meta-externalagent',
] as const;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
            ...AI_CRAWLERS.map((userAgent) => ({
                userAgent,
                allow: '/' as const,
            })),
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}

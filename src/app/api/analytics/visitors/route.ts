import { NextResponse } from 'next/server';
import { fetchVisitorCount } from '@/services/analytics.service';

/** Never prerender at build — credentials exist only at runtime on Vercel. */
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const visitors = await fetchVisitorCount();

        if (visitors === null) {
            if (process.env.NODE_ENV === 'development') {
                console.warn(
                    '[analytics] Visitor count unavailable. Add GA_PROPERTY_ID and either GA_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS to .env.local'
                );
            }
            return NextResponse.json({ visitors: null, configured: false });
        }

        return NextResponse.json(
            { visitors, configured: true },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                },
            }
        );
    } catch (error) {
        console.error('Visitor count API error:', error);
        return NextResponse.json({ visitors: null }, { status: 500 });
    }
}

import { existsSync } from 'node:fs';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

let client: BetaAnalyticsDataClient | null = null;

type GaClientOptions = ConstructorParameters<typeof BetaAnalyticsDataClient>[0];

/**
 * Resolve GA credentials for serverless (JSON env) or local dev (file path).
 * GOOGLE_APPLICATION_CREDENTIALS is only used when the file exists — avoids
 * Vercel build failures when a local path was copied into project env vars.
 */
function resolveGaClientOptions(): GaClientOptions | null {
    const jsonEnv = process.env.GA_SERVICE_ACCOUNT_JSON?.trim();
    if (jsonEnv) {
        try {
            return { credentials: JSON.parse(jsonEnv) };
        } catch {
            return null;
        }
    }

    const credsEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
    if (!credsEnv) {
        return null;
    }

    if (credsEnv.startsWith('{')) {
        try {
            return { credentials: JSON.parse(credsEnv) };
        } catch {
            return null;
        }
    }

    if (existsSync(credsEnv)) {
        return { keyFilename: credsEnv };
    }

    return null;
}

export function isGaDataApiConfigured(): boolean {
    return Boolean(process.env.GA_PROPERTY_ID && resolveGaClientOptions());
}

function getAnalyticsClient(): BetaAnalyticsDataClient | null {
    const options = resolveGaClientOptions();
    if (!options) {
        return null;
    }

    if (!client) {
        try {
            client = new BetaAnalyticsDataClient(options);
        } catch (error) {
            console.error('Failed to initialize GA Data API client:', error);
            return null;
        }
    }

    return client;
}

/**
 * Total unique visitors (totalUsers) for the portfolio property.
 * Production (Vercel): GA_PROPERTY_ID + GA_SERVICE_ACCOUNT_JSON
 * Local dev: GA_PROPERTY_ID + GOOGLE_APPLICATION_CREDENTIALS (file path)
 */
export async function fetchVisitorCount(): Promise<number | null> {
    const propertyId = process.env.GA_PROPERTY_ID;
    const analyticsClient = getAnalyticsClient();

    if (!propertyId || !analyticsClient) {
        return null;
    }

    try {
        const [response] = await analyticsClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate: '2020-01-01', endDate: 'today' }],
            metrics: [{ name: 'totalUsers' }],
        });

        const raw = response.rows?.[0]?.metricValues?.[0]?.value;
        if (!raw) {
            return 0;
        }

        const count = Number.parseInt(raw, 10);
        return Number.isFinite(count) ? count : null;
    } catch (error) {
        console.error('Failed to fetch GA visitor count:', error);
        return null;
    }
}

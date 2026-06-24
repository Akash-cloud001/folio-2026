import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { isGaDataApiConfigured } from '@/lib/analytics';

let client: BetaAnalyticsDataClient | null = null;

function getAnalyticsClient(): BetaAnalyticsDataClient | null {
    if (!isGaDataApiConfigured()) {
        return null;
    }

    if (client) {
        return client;
    }

    try {
        const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
        if (keyPath) {
            client = new BetaAnalyticsDataClient({ keyFilename: keyPath });
            return client;
        }

        const credentials = JSON.parse(process.env.GA_SERVICE_ACCOUNT_JSON!);
        client = new BetaAnalyticsDataClient({ credentials });
        return client;
    } catch (error) {
        console.error('Failed to initialize GA Data API client:', error);
        return null;
    }
}

/**
 * Total unique visitors (totalUsers) for the portfolio property.
 * Requires GA_PROPERTY_ID + GA_SERVICE_ACCOUNT_JSON on the server.
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

export type VisitorStatsResponse = {
    visitors: number | null;
    configured: boolean;
};

/** Numeric GA4 property ID (Admin → Property settings), not the G- measurement ID. */
export function isGaDataApiConfigured(): boolean {
    const hasCredentials =
        Boolean(process.env.GA_SERVICE_ACCOUNT_JSON) ||
        Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS);

    return Boolean(process.env.GA_PROPERTY_ID && hasCredentials);
}

export function formatVisitorCount(count: number): string {
    if (count < 10_000) {
        return count.toLocaleString('en-US');
    }
    return new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(count);
}

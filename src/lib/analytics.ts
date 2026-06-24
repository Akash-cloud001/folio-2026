export type VisitorStatsResponse = {
    visitors: number | null;
    configured: boolean;
};

export function formatVisitorCount(count: number): string {
    if (count < 10_000) {
        return count.toLocaleString('en-US');
    }
    return new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(count);
}

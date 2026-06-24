import { create } from 'zustand';
import type { VisitorStatsResponse } from '@/lib/analytics';

interface AnalyticsStore {
    visitors: number | null;
    loading: boolean;
    error: string | null;
    fetchVisitors: () => Promise<void>;
    reset: () => void;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
    visitors: null,
    loading: false,
    error: null,

    fetchVisitors: async () => {
        set({ loading: true, error: null });

        try {
            const response = await fetch('/api/analytics/visitors');

            if (!response.ok) {
                set({ loading: false, visitors: null, error: null });
                return;
            }

            const data = (await response.json()) as VisitorStatsResponse;
            set({
                visitors: data.visitors,
                loading: false,
                error: null,
            });
        } catch (error) {
            set({
                loading: false,
                visitors: null,
                error: error instanceof Error ? error.message : 'Failed to fetch visitors',
            });
        }
    },

    reset: () => {
        set({ visitors: null, loading: false, error: null });
    },
}));

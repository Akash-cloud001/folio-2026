// Zustand Store for GitHub Data
import { create } from 'zustand';
import type { GitHubUser, ContributionDay } from '@/lib/github';
import { githubService } from '@/services/github.service';

interface GitHubStore {
    // State
    user: GitHubUser | null;
    contributions: ContributionDay[];
    loading: boolean;
    error: string | null;

    // Actions
    fetchGitHubData: () => Promise<void>;
    reset: () => void;
}

/**
 * GitHub Data Store
 * Manages GitHub user profile and contribution data
 * Follows clean architecture: Component → Store → Service
 */
export const useGitHubStore = create<GitHubStore>((set) => ({
    // Initial state
    user: null,
    contributions: [],
    loading: false,
    error: null,

    // Fetch GitHub data using service layer
    fetchGitHubData: async () => {
        set({ loading: true, error: null });

        try {
            const { user, contributions } = await githubService.fetchAllData();

            set({
                user,
                contributions,
                loading: false,
                error: null
            });
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : 'Failed to fetch GitHub data'
            });
        }
    },

    // Reset store to initial state
    reset: () => {
        set({
            user: null,
            contributions: [],
            loading: false,
            error: null
        });
    }
}));

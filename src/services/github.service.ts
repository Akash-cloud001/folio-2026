// GitHub Service Layer - handles all GitHub API calls
import type { GitHubUser, ContributionDay } from '@/lib/github';

const GITHUB_USERNAME = 'Akash-cloud001';

/**
 * GitHub Service
 * Responsible for all GitHub API interactions
 * Follows clean architecture: Component → Store → Service → API
 */
export const githubService = {
    /**
     * Fetch GitHub user profile data
     */
    async fetchUser(): Promise<GitHubUser | null> {
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);

            if (!response.ok) {
                console.error('Failed to fetch GitHub user:', response.status);
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching GitHub user:', error);
            return null;
        }
    },

    /**
     * Fetch GitHub contribution calendar data
     */
    async fetchContributions(): Promise<ContributionDay[]> {
        try {
            const response = await fetch(
                `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
            );

            if (!response.ok) {
                console.error('Failed to fetch contributions:', response.status);
                return [];
            }

            const data = await response.json();

            // Transform the data to match react-activity-calendar format
            return data.contributions.map((contrib: any) => ({
                date: contrib.date,
                count: contrib.count,
                level: Math.min(4, Math.floor(contrib.count / 5)) as 0 | 1 | 2 | 3 | 4
            }));
        } catch (error) {
            console.error('Error fetching GitHub contributions:', error);
            return [];
        }
    },

    /**
     * Fetch all GitHub data at once
     */
    async fetchAllData(): Promise<{
        user: GitHubUser | null;
        contributions: ContributionDay[];
    }> {
        const [user, contributions] = await Promise.all([
            this.fetchUser(),
            this.fetchContributions()
        ]);

        return { user, contributions };
    }
};

// Utility to fetch GitHub user data and contribution calendar

export interface GitHubUser {
    login: string;
    avatar_url: string;
    name: string | null;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
}

export interface ContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

/**
 * Fetches GitHub user profile data
 */
export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!response.ok) {
            console.error('Failed to fetch GitHub user:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching GitHub user:', error);
        return null;
    }
}

/**
 * Fetches GitHub contribution calendar data
 * Note: GitHub's GraphQL API requires authentication for contribution data
 * As a fallback, we'll use a public scraping service or hardcoded data
 */
export async function fetchGitHubContributions(username: string): Promise<ContributionDay[]> {
    try {
        // Using GitHub's contribution calendar SVG as a fallback
        // In production, you'd want to use GitHub GraphQL API with a token
        const response = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
            {
                next: { revalidate: 3600 } // Revalidate every hour
            }
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
}

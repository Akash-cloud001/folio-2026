// Projects Service Layer - handles fetching project data
import type { Project, ProjectsData } from '@/lib/projects';

/**
 * Projects Service
 * Responsible for fetching project data from JSON file
 * Follows clean architecture: Component → Store → Service
 */
export const projectsService = {
    /**
     * Fetch all projects from projects.json
     */
    async fetchProjects(): Promise<Project[]> {
        try {
            const response = await fetch('/projects.json');

            if (!response.ok) {
                console.error('Failed to fetch projects:', response.status);
                return [];
            }

            const data: ProjectsData = await response.json();
            return data.works || [];
        } catch (error) {
            console.error('Error fetching projects:', error);
            return [];
        }
    }
};

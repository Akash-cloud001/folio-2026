// Zustand Store for Projects Data
import { create } from 'zustand';
import type { Project } from '@/lib/projects';
import { projectsService } from '@/services/projects.service';

interface ProjectsStore {
    // State
    projects: Project[];
    loading: boolean;
    error: string | null;

    // Actions
    fetchProjects: () => Promise<void>;
    reset: () => void;
}

/**
 * Projects Data Store
 * Manages project data from projects.json
 * Follows clean architecture: Component → Store → Service
 */
export const useProjectsStore = create<ProjectsStore>((set) => ({
    // Initial state
    projects: [],
    loading: false,
    error: null,

    // Fetch projects using service layer
    fetchProjects: async () => {
        set({ loading: true, error: null });

        try {
            const projects = await projectsService.fetchProjects();

            set({
                projects,
                loading: false,
                error: null
            });
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : 'Failed to fetch projects'
            });
        }
    },

    // Reset store to initial state
    reset: () => {
        set({
            projects: [],
            loading: false,
            error: null
        });
    }
}));

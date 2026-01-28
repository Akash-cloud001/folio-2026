// Project Types
export interface Project {
    id: string;
    name: string;
    url: string;
    imgUrl: string;
    tech: string[];
    desc: string;
    smallDesc: string;
}

export interface ProjectsData {
    works: Project[];
}

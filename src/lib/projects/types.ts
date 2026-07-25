import type { ImageMetadata } from 'astro';

export type ProjectListItem = {
    id: string;
    title: string;
    shortDescription: string;
    date: string;
    company: string | null;
    image: ImageMetadata | null;
    tags: string[];
};

export type ProjectDetail = ProjectListItem & {
    url: string | null;
    github_url: string | null;
    Content: unknown; // rendered body component
};

export type GetProjects = () => Promise<ProjectListItem[]>;
export type GetProject = (id: string) => Promise<ProjectDetail>;
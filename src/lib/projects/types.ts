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

export type ProjectDetails = ProjectListItem & {
    url: string | null;
    github_url: string | null;
    Content: unknown; // rendered body component
};

export type GetProjectsList = () => Promise<ProjectListItem[]>;
export type GetProjectDetails = (id: string) => Promise<ProjectDetails>;
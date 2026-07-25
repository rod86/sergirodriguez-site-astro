import type { ImageMetadata } from 'astro';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

export type ProjectListItem = {
    id: string;
    title: string;
    shortDescription: string;
    date: string;
    company: string | null;
    image: ImageMetadata | null;
    tags: string[];
};

export type ProjectDetails = Omit<ProjectListItem, 'shortDescription'> & {
    url: string | null;
    github_url: string | null;
    Content: AstroComponentFactory;
};

export type GetProjectsList = () => Promise<ProjectListItem[]>;
export type GetProjectDetails = (id: string) => Promise<ProjectDetails>;
import type { ImageMetadata } from 'astro';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

type Image = {
    image: ImageMetadata;
    text?: string;
};

export type ProjectListItem = {
    id: string;
    title: string;
    shortDescription: string;
    date: string;
    company: string | null;
    image: Image | null;
    tags: string[];
};

export type ProjectDetails = Omit<ProjectListItem, 'shortDescription' | 'image'> & {
    url: string | null;
    github_url: string | null;
    Content: AstroComponentFactory;
    images: Image[];
};

export interface ContentProviderInterface {
    getProjects: () => Promise<ProjectListItem[]>;
    getFeaturedProjects: (ids: readonly string[]) => Promise<ProjectListItem[]>;
    getProjectDetails: (id: string) => Promise<ProjectDetails>;
}
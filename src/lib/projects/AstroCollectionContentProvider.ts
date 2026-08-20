import type {ContentProviderInterface, ProjectDetails, ProjectListItem} from "@lib/projects/types.ts";
import {type CollectionEntry, getCollection, getEntry, render } from 'astro:content';


export class AstroCollectionContentProvider implements ContentProviderInterface {
    async getProjects(): Promise<ProjectListItem[]> {
        const projects = (await getCollection('projects')) as CollectionEntry<'projects'>[];
        const orderedProjects = projects.sort((a, b) => {
            return b.data.date.getTime() - a.data.date.getTime();
        });
        return orderedProjects.map(item => ({
            id: item.id,
            title: item.data.title,
            image: item.data.images[0] ?? null,
            shortDescription: item.data.short_description,
            date: this.formatDate(item.data.date),
            company: item.data.company,
            tags: item.data.tags
        }));
    }

    async getFeaturedProjects(ids: string[]): Promise<ProjectListItem[]> {
        const projects = (await getCollection('projects',
            ({ id }) => ids.includes(id)
        )) as CollectionEntry<'projects'>[];
        const orderedProjects = projects.sort((a, b) => {
            return ids.indexOf(a.id) - ids.indexOf(b.id);
        });
        return orderedProjects.map(item => ({
            id: item.id,
            title: item.data.title,
            image: item.data.images[0] ?? null,
            shortDescription: item.data.short_description,
            date: this.formatDate(item.data.date),
            company: item.data.company,
            tags: item.data.tags
        }));
    }

    async getProjectDetails(id: string): Promise<ProjectDetails> {
        const entry = await getEntry('projects', id) as CollectionEntry<'projects'>;
        if (!entry) {
            throw new Error(`Project with id ${id} not found`);
        }
        const { Content } = await render(entry);
        return {
            id: entry.id,
            title: entry.data.title,
            images: entry.data.images,
            date: this.formatDate(entry.data.date),
            company: entry.data.company,
            tags: entry.data.tags,
            url: entry.data.url,
            github_url: entry.data.github_url,
            Content
        };
    }

    private formatDate(value: Date): string {
        return value.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    }
}
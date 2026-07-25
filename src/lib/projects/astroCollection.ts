import type {GetProjectDetails, GetProjectsList, ProjectDetails, ProjectListItem} from "@lib/projects/types.ts";
import {type CollectionEntry, getCollection, getEntry, render} from "astro:content";


export const getProjectsList: GetProjectsList = async (): Promise<ProjectListItem[]> => {
    const projects = (await getCollection('projects')) as CollectionEntry<'projects'>[];
    const orderedProjects = projects.sort((a, b) => {
        return b.data.date.getTime() - a.data.date.getTime();
    });
    return orderedProjects.map(item => ({
        id: item.id,
        title: item.data.title,
        image: item.data.image,
        shortDescription: item.data.short_description,
        date: item.data.date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
        company: item.data.company,
        tags: item.data.tags
    }));
}

export const getProjectDetails: GetProjectDetails = async (id: string): Promise<ProjectDetails> => {
    const entry = await getEntry('projects', id) as CollectionEntry<'projects'>;
    const { Content } = await render(entry);
    return {
        id: entry.id,
        title: entry.data.title,
        image: entry.data.image,
        date: entry.data.date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
        company: entry.data.company,
        tags: entry.data.tags,
        url: entry.data.url,
        github_url: entry.data.github_url,
        Content
    };
};
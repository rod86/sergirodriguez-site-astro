import type {
    GetFeaturedProjects,
    GetProjectDetails,
    GetProjectsList,
    ProjectDetails,
    ProjectListItem
} from "@lib/projects/types.ts";
import {type CollectionEntry, getCollection, getEntry, render} from "astro:content";

const formatDate = (value: Date) => value.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

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
        date: formatDate(item.data.date),
        company: item.data.company,
        tags: item.data.tags
    }));
}

export const getProjectDetails: GetProjectDetails = async (id: string): Promise<ProjectDetails> => {
    const entry = await getEntry('projects', id) as CollectionEntry<'projects'>;
    if (!entry) {
        throw new Error(`Project with id ${id} not found`);
    }
    const { Content } = await render(entry);
    return {
        id: entry.id,
        title: entry.data.title,
        image: entry.data.image,
        date: formatDate(entry.data.date),
        company: entry.data.company,
        tags: entry.data.tags,
        url: entry.data.url,
        github_url: entry.data.github_url,
        Content
    };
};

export const getFeaturedProjects: GetFeaturedProjects = async (ids: string[]): Promise<ProjectListItem[]> => {
    const projects = (await getCollection('projects',
        ({ id }) => ids.includes(id)
    )) as CollectionEntry<'projects'>[];
    const orderedProjects = projects.sort((a, b) => {
        return ids.indexOf(a.id) - ids.indexOf(b.id);
    });
    return orderedProjects.map(item => ({
        id: item.id,
        title: item.data.title,
        image: item.data.image,
        shortDescription: item.data.short_description,
        date: formatDate(item.data.date),
        company: item.data.company,
        tags: item.data.tags
    }));
}
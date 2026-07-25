import type {GetProjectsList, ProjectListItem} from "@lib/projects/types.ts";
import {type CollectionEntry, getCollection} from "astro:content";


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
import { vi } from "vitest";
import {type CollectionEntry, getCollection, getEntry, render } from 'astro:content';

vi.mock('astro:content', () => ({
    getCollection: vi.fn(),
    getEntry: vi.fn(),
    render: vi.fn(),
}));

import {getProjectsList, getProjectDetails} from "@lib/projects/astroCollection.ts";
import type {AstroComponentFactory} from "astro/runtime/server/index.js";
import {projectsFixture} from "@tests/lib/fixtures/projects.ts";
import type {ProjectDetails, ProjectListItem} from "@lib/projects/types.ts";

const buildItemFromEntry = (item: CollectionEntry<'projects'>): ProjectListItem => ({
    id: item.id,
    title: item.data.title,
    image: item.data.image,
    shortDescription: item.data.short_description,
    date: item.data.date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
    company: item.data.company,
    tags: item.data.tags
});

const buildDetailsFromEntry = (item: CollectionEntry<'projects'>, content: AstroComponentFactory): ProjectDetails => ({
    id: item.id,
    title: item.data.title,
    image: item.data.image,
    date: item.data.date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
    company: item.data.company,
    tags: item.data.tags,
    url: item.data.url,
    github_url: item.data.github_url,
    Content: content,
});

describe('Astro Collection', () => {

    beforeEach(() => {
       vi.resetAllMocks();
    });

    describe('getProjects', () => {
        it('returns an list of projects sorted by date (newest first)', async () => {
            const expectedProjects = [
                buildItemFromEntry(projectsFixture[0]), // Budget Tracker
                buildItemFromEntry(projectsFixture[5]), // weather dashboard
                buildItemFromEntry(projectsFixture[1]), // cloud notes sync
                buildItemFromEntry(projectsFixture[3]), // recipe finder cli
                buildItemFromEntry(projectsFixture[2]), // habits tracker
                buildItemFromEntry(projectsFixture[4]), // taskflow api
            ];
            vi.mocked(getCollection).mockResolvedValue(projectsFixture);

            const result = await getProjectsList();
            expect(getCollection).toHaveBeenCalledWith('projects');
            expect(result).toEqual(expectedProjects);
        });
    });

    describe('getProjectDetails', () => {
        it('returns a project details', async () => {
            const project: CollectionEntry<'projects'> = projectsFixture[0];
            const contentMock = vi.fn() as unknown as AstroComponentFactory;
            const expectedProject = buildDetailsFromEntry(project, contentMock);

            vi.mocked(getEntry).mockResolvedValue(project);
            vi.mocked(render).mockResolvedValue({ Content: contentMock, headings: [], remarkPluginFrontmatter: {} });

            const result = await getProjectDetails(project.id);
            expect(getEntry).toHaveBeenCalledWith('projects', project.id);
            expect(render).toHaveBeenCalledWith(project);
            expect(result).toEqual(expectedProject);
        });

        it('throws an error when no project is found', async () => {
            const id = 'invalid-id';
            vi.mocked(getEntry).mockResolvedValue(undefined);

            await expect(getProjectDetails(id)).rejects.toThrow(new Error(`Project with id ${id} not found`));
            expect(render).not.toHaveBeenCalled();
        });
    });
});
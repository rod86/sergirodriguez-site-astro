import { vi } from "vitest";
import {type CollectionEntry, getCollection} from 'astro:content';

vi.mock('astro:content', () => ({
    getCollection: vi.fn()
}));

import {getProjectsList} from "@lib/projects/astroCollection.ts";

import type {ProjectListItem} from "@lib/projects/types.ts";

const fakeImage = (image: string): ImageMetadata => ({
    src: `/_astro/${image ?? 'image'}.png`,
    width: 800,
    height: 450,
    format: 'png',
});

const fakeProjects: CollectionEntry<'projects'>[] = [
    {
        id: 'budget-tracker-app',
        collection: 'projects',
        filePath: 'collections/projects/budget-tracker-app.md',
        body: 'Budget Tracker App is a personal finance tool for tracking income and expenses.',
        data: {
            title: 'Budget Tracker App',
            date: new Date('2024-06-03'),
            company: null,
            image: fakeImage('budget-tracker-app'),
            url: null,
            github_url: 'https://github.com/rod86/budget-tracker-app',
            tags: ['Vue', 'NodeJS', 'MongoDB'],
            short_description: 'Budget Tracker App',
        },
    },
    {
        id: 'cloud-notes-sync',
        collection: 'projects',
        filePath: 'collections/projects/cloud-notes-sync.md',
        body: 'Cloud Notes Sync keeps notes in sync across devices in real time.',
        data: {
            title: 'Cloud Notes Sync',
            date: new Date('2022-11-15'),
            company: null,
            image: fakeImage('cloud-notes-sync'),
            url: null,
            github_url: 'https://github.com/rod86/cloud-notes-sync',
            tags: ['React', 'Firebase', 'TypeScript'],
            short_description: 'A simple notes app'
        },
    },
    {
        id: 'habit-tracker-pwa',
        collection: 'projects',
        filePath: 'collections/projects/habit-tracker-pwa.md',
        body: 'Habit Tracker PWA helps users build daily habits with streaks and offline support.',
        data: {
            title: 'Habit Tracker PWA',
            date: new Date('2020-04-20'),
            company: null,
            image: fakeImage('habit-tracker-pwa'),
            url: null,
            github_url: 'https://github.com/rod86/habit-tracker-pwa',
            tags: ['React', 'TypeScript', 'PWA'],
            short_description: 'A basic habits tracker PWA',
        },
    },
    {
        id: 'recipe-finder-cli',
        collection: 'projects',
        filePath: 'collections/projects/recipe-finder-cli.md',
        body: 'Recipe Finder CLI searches recipes by ingredients you already have.',
        data: {
            title: 'Recipe Finder CLI',
            date: new Date('2021-09-22'),
            company: null,
            image: fakeImage('recipe-finder-cli'),
            url: null,
            github_url: 'https://github.com/rod86/recipe-finder-cli',
            tags: ['Python', 'CLI'],
            short_description: 'recipe finder cli'
        },
    },
    {
        id: 'task-flow-api',
        collection: 'projects',
        filePath: 'collections/projects/task-flow-api.md',
        body: 'TaskFlow API is a backend for managing tasks and team boards.',
        data: {
            title: 'TaskFlow API',
            date: new Date('2020-04-05'),
            company: null,
            image: fakeImage('task-flow-api'),
            url: null,
            github_url: 'https://github.com/rod86/task-flow-api',
            tags: ['NodeJS', 'Express', 'PostgreSQL'],
            short_description: 'A REST API for tasks management',
        },
    },
    {
        id: 'weather-dashboard',
        collection: 'projects',
        filePath: 'collections/projects/weather-dashboard.md',
        body: 'Weather Dashboard visualizes forecasts with interactive charts.',
        data: {
            title: 'Weather Dashboard',
            date: new Date('2023-08-10'),
            company: null,
            image: fakeImage('weather-dashboard'),
            url: null,
            github_url: 'https://github.com/rod86/weather-dashboard',
            tags: ['React', 'TypeScript', 'D3.js'],
            short_description: 'Interactive Weather Dashboard',
        },
    },
];

const buildItemFromEntry = (item: CollectionEntry<'projects'>): ProjectListItem => ({
    id: item.id,
    title: item.data.title,
    image: item.data.image,
    shortDescription: item.data.short_description,
    date: item.data.date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
    company: item.data.company,
    tags: item.data.tags
});

describe('Astro Collection', () => {
    describe('getProjects', async () => {
        it('returns an list of projects sorted by date (newest first)', async () => {
            const expectedProjects = [
                buildItemFromEntry(fakeProjects[0]), // Budget Tracker
                buildItemFromEntry(fakeProjects[5]), // weather dashboard
                buildItemFromEntry(fakeProjects[1]), // cloud notes sync
                buildItemFromEntry(fakeProjects[3]), // recipe finder cli
                buildItemFromEntry(fakeProjects[2]), // habits tracker
                buildItemFromEntry(fakeProjects[4]), // taskflow api
            ];
            vi.mocked(getCollection).mockResolvedValue(fakeProjects);

            const result = await getProjectsList();
            expect(getCollection).toHaveBeenCalledWith('projects');
            expect(result).toEqual(expectedProjects);
        });
    });
});
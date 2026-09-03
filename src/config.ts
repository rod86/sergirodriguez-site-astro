
export default {
    siteDomain: "sergirodriguez.dev",
    title: "Software Developer",
    description: "Sergi Rodriguez — Software Stack Developer with 20+ years building scalable web applications with PHP, NodeJS, TypeScript, Python and React.",
    linkedin: "https://www.linkedin.com/in/sergirodriguez86/",
    github: "https://github.com/rod86",
    web3Forms: {
        accessToken:  import.meta.env.PUBLIC_WEB3FORMS_ACCESS_TOKEN,
    },
    mainNavItems: [
        { href: '/', label: 'Home' },
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/about', label: 'About Me' },
        { href: '/contact', label: 'Contact' },
    ],
    featuredProjects: [
        'ai-prompts-vault-api',
        'learning-hub',
        'symfony-auctions-api',
        'lunchbox',
    ],
    skillsGroups: [
        {
            title: 'Languages',
            skills: ['TypeScript' , 'PHP', 'Python'],
        },
        {
            title: 'Frontend',
            skills: ['HTML/CSS', 'Tailwind CSS', 'Bootstrap', 'React'],
        },
        {
            title: 'Backend',
            skills: ['NodeJS', 'Express', 'Symfony', 'Laravel'],
        },
        {
            title: 'Infrastructure & Data',
            skills: ['MySQL', 'PostgreSQL' , 'Docker', 'AWS', 'Google Cloud']
        },
        {
            title: 'Architecture & Testing',
            skills: ['REST API', 'Clean Code', 'Domain-Driven Design', 'Hexagonal', 'Test-Driven Development', 'CI/CD', 'AI/Spec-Driven Development'],
        },
        {
            title: 'Methodologies & Soft Skills',
            skills: ['Agile', 'Peer Mentoring', 'Continuous Learner', 'Team Player'],
        }
    ],
    workExperiences: [
        {
            position: 'NodeJS/Python Developer',
            company: 'Leadtech',
            location: 'Barcelona, Spain',
            startDate: '11/2023',
            endDate: '05/2026',
        },
        {
            position: 'Backend Developer',
            company: 'Leadtech',
            location: 'Barcelona, Spain',
            startDate: '04/2022',
            endDate: '11/2023',
        },
        {
            position: 'Flutter Developer',
            company: 'Leadtech',
            location: 'Barcelona, Spain',
            startDate: '11/2020',
            endDate: '04/2022',
        },
        {
            position: 'Backend Developer',
            company: 'Leadtech',
            location: 'Barcelona, Spain',
            startDate: '11/2018',
            endDate: '11/2020',
        },
        {
            position: 'Web Developer',
            company: 'Localgiving',
            location: 'London, UK',
            startDate: '12/2016',
            endDate: '08/2018',
        },
        {
            position: 'PHP Developer',
            company: 'Opera Mediaworks',
            location: 'London, UK',
            startDate: '11/2014',
            endDate: '06/2016',
        },
    ]
};
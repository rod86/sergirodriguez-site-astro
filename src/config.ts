
export default {
    siteDomain: "sergirodriguezwebsite.com",
    title: "Full Stack Developer",
    description: "Sergi Rodriguez — Full Stack Developer with 10+ years building scalable web applications with PHP, Node.js, TypeScript, Python and React.",
    linkedin: "https://www.linkedin.com/in/sergirodriguez86/",
    github: "https://github.com/rod86",
    web3Forms: {
        accessToken:  import.meta.env.PUBLIC_WEB3FORMS_ACCESS_TOKEN,
    },
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
            isFullWidth: true,
        },
        {
            title: 'Methodologies & Soft Skills',
            skills: ['Agile', 'Peer Mentoring', 'Continuous Learner', 'Team Player'],
            isFullWidth: true,
        }
    ]
};
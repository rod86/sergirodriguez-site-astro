
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
} as const;
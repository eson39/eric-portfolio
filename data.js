const site = {
  name: "Eric Son",
  title: "Software Engineer",
  bio: "Hello, I am a junior studying CS at Columbia University's School of Engineering and Applied Sciences, interested in full-stack web, systems programming, and tooling for AI coding agents.",
  aboutPreview:
    "This portfolio highlights my journey in exploring the space where software engineering, artificial intelligence, and interactive media meet.",
  aboutFull: {
    headline: "More about me",
    paragraphs: [
      "I am a CS student that has built up their coding experience through school projects, extracurricular team work, and different internships environments. From shipping user-facing features in a fast-paced startup to experiencing seen how tools get built, tested, and maintained at scale in large organizations, I've learned to work with different kinds of teams, stay flexible in the role I take on, and pick up new tools when a project needs them.",
      "I like building tools that address real problems I've faced in everyday life. Experimenting with unfamiliar technologies and ideas helps me to create software that bridge the interdiciplinary gap between engineering and other fields I care about.",
      "In my freetime, I love playing sports (basketball, tennis, pickleball), practicing my cello, and playing open-world and competitive video games.",
    ],
    highlights: [
      { label: "Focus", text: "Information Internetworks, Intelligence" },
      { label: "Currently", text: "In my junior year of college/ working on my Cursor token optimizer project" },
      { label: "Open to", text: "Internships (Summer '27), collabs, and hackathons" },
    ],
  },
  links: {
    linkedin: "www.linkedin.com/in/eson10",
    github: "https://github.com/eson39",
    resume: "./resume.pdf",
    email: "es4451@columbia.edu",
  },
  avatar: "./assets/avatar.png",
  contact: {
    heading: "Contact me",
    intro:
      "Have a question, opportunity, or project idea? Reach out — I’d love to hear from you.",
    emailLabel: "Email me",
    subject: "Hello from your portfolio",
  },
  homeProjectCount: 2,
  skills: [
    {
      title: "Programming Languages",
      intro: "Languages I use for coursework, apps, and experiments.",
      items: [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "C++",
        "C",
        "HTML",
        "CSS",
        "Bash",
        "SQL"
      ],
    },
    {
      title: "Frameworks & Tools",
      intro: "Libraries and environments I work with regularly.",
      items: ["React", "Next.js", "Express.js", "Git", "VS Code", "IntelliJ"],
    },
    {
      title: "Spoken Languages",
      intro: "Languages I use at school, work, and with friends.",
      items: ["English","Korean"],
    },
    {
      title: "Creative Tools",
      intro: "Design and content tools for visuals and demos.",
      items: ["Figma", "Premiere Pro", "Capcut", "Canva", "Notion"],
    },
  ],
  projects: [
    {
      title: "My Portfolio",
      longDescription:
        "A custom glassmorphism-style portfolio site with custom smooth scrolling, scroll reveals, and a morphing navigation bar.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "./assets/projects/portfolio.svg",
      github: "https://github.com/eson39/eric-portfolio",
      live: "./index.html",
      featured: true,
    },
    {
      title: "Hungry Lion",
      longDescription:
        "A web application for students to view and rate real-time dining hall menus anonymously",
      tags: ["React", "Express.js", "MongoDB", "Node.js"],
      image: "./assets/projects/hungrylion.png",
      github: "https://github.com/eson39/hungry-lion",
      live: "https://hungry-lion-blue.vercel.app/",
      featured: true,
    },
    {
      title: "Talking Point",
      longDescription:
        "An invisible teleprompter to keep track of meeting notes and bullet points. Hidden from screen share.",
      tags: ["JavaScript","Node.js", "HTML", "CSS"],
      image: "./assets/projects/talking.png",
      github: "https://github.com/eson39/talking-point",
      live: "https://talking-point-website.vercel.app/",
      featured: false,
    },
    {
      title: "HTTP Web Server",
      longDescription:
        "A C-based HTTP/1.0 web server supporting HTTP GET requests, static file serving, and HTTP status codes using the Berkeley sockets API",
      tags: ["C", "UNIX", "Git"],
      image: "./assets/projects/sockets.png",
      github: "https://gist.github.com/eson39/6ce3439515a1aa4f73a3ce35d1db8c28",
      live: null,
      featured: false,
    },
    {
      title: "Leetcode Randomizer",
      longDescription:
        "A chrome extension that turns the NeetCode 150 into focused practice sessions. Filter by topic and difficulty, then work through a hidden random queue one problem at a time.",
      tags: ["JavaScript", "HTML", "CSS"],
      image: "./assets/projects/leetcoderandomizer.png",
      github: "https://github.com/eson39/leetcode-randomizer",
      live: "https://chromewebstore.google.com/detail/leetcode-randomizer/kpcfdadongbobogdkojpflldijmhllln",
      featured: false,
    },
    {
      title: "Single Cell Segmentation",
      longDescription:
        "A 2D U-Net segmentation model for single-cell detection across 7,590 fluorescence microscopy images of hamster kidney cells",
      tags: ["Python", "Pytorch", "Machine Learning"],
      image: "./assets/projects/cellseg.png",
      github: "https://www.kaggle.com/code/eson10/bme-2d-department-project-eric-isabella",
      live: "https://drive.google.com/file/d/1WqJY30OmAWm-vnOTA450vSFTNfo23ZiT/view",
      featured: false,
    },
  ],
  experience: [
    {
      role: "Infosys",
      company: "Software Engineering Intern",
      years: "June 2026 - Aug 2026",
      location: "Bangalore, India",
      logo: "./assets/companies/infosyslogo.jpeg",
      logoText: "CN",
    },
    {
      role: "Cirqle",
      company: "Software Engineering Intern",
      years: "Aug 2025 - Dec 2025",
      location: "New York, NY",
      logo: null,
      logoText: "C",
    },
  ],
  education: [
    {
      school: "Columbia University",
      degree: "Computer Science",
      years: "2025 - 2028",
      logo: "./assets/pictures/columbia.jpeg",
    },
    {
      school: "Georgia Institute of Technology",
      degree: "Computer Engineering",
      years: "2024 - 2025",
      logo: "./assets/pictures/gt.png",
    },
  ],
  extracurriculars: [
    {
      name: "Georgia Tech WebDev Club",
      logo: "./assets/pictures/gtwebdev.png",
      logoText: "WD",
    },
    {
      name: "Georgia Tech VIP Program",
      logo: "./assets/pictures/gtvip.jpeg",
      logoText: "VIP",
    },
    {
      name: "Silicon Jackets (DV Subteam)",
      logo: "./assets/pictures/silicon.jpeg",
      logoText: "SJ",
    },
  ],
  courses: [
    "Introduction to Artificial Intelligence",
    "C++ Deep Dive",
    "Advanced Programming in C",
    "Data Structures & Algorithms",
    "Discrete Mathematics",
    "Fundamentals of Computer Systems",
    "Analysis of Algorithms",
    "Introduction to Databases",
  ],
};

const icons = {
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
  resume: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`,
  demo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
};

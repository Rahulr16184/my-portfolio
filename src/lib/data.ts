import type { Profile, About, Skills, Project, Experience, Education, Contact } from './types';

export const profile: Profile = {
  name: "John Doe",
  role: "Full Stack Developer",
  tagline: "Building modern web apps with React, Next.js, and Cloud solutions",
  profilePhotoUrl: "https://res.cloudinary.com/.../profile.png",
  resumeUrl: "/resume.pdf"
};

export const about: About = {
  bio: "I am a passionate developer with over 3 years of experience in building scalable and user-friendly web applications. Skilled in modern technologies like Next.js, Firebase, and various cloud services, I thrive on solving complex problems and creating innovative digital solutions that make a difference.",
  highlights: [
    "3+ years of experience in web development",
    "Successfully delivered over 10 real-world projects",
    "Strong interest in AI, Blockchain, and Serverless architectures",
    "Committed to writing clean, efficient, and maintainable code"
  ]
};

export const skills: Skills = {
  frontend: ["React", "Next.js", "TypeScript", "TailwindCSS", "Redux", "HTML5", "CSS3"],
  backend: ["Node.js", "Express.js", "Firebase", "GraphQL", "REST APIs"],
  databases: ["Firestore", "MySQL", "MongoDB", "PostgreSQL"],
  tools: ["Git", "Docker", "Cloudinary", "Netlify", "Vercel", "Jest", "Webpack"]
};

export const projects: Project[] = [
  {
    title: "TRACEIN Attendance System",
    desc: "A smart attendance system using QR codes and face recognition, featuring a comprehensive admin dashboard for managing users and attendance records.",
    imageId: "project-1",
    tech: ["Next.js", "Firebase", "FaceAPI", "TailwindCSS"],
    github: "https://github.com/johndoe/tracein",
    demo: "https://tracein.netlify.app"
  },
  {
    title: "E-commerce Platform",
    desc: "A full-featured e-commerce site with product listings, a shopping cart, user authentication, and a Stripe-integrated checkout process.",
    imageId: "project-2",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    github: "https://github.com/johndoe/ecommerce",
    demo: "https://e-commerce-demo.vercel.app"
  },
  {
    title: "PortfolioForge",
    desc: "The very portfolio you are looking at! Built with Next.js and designed to be easily configurable through a Firebase backend.",
    imageId: "project-3",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "ShadCN UI", "Genkit"],
    github: "https://github.com/johndoe/portfolio",
    demo: "#"
  }
];

export const experience: Experience[] = [
  {
    role: "Software Developer",
    company: "Tech Solutions Inc.",
    duration: "2022 - Present",
    desc: "Lead developer on several client projects. Developed and maintained web applications using Next.js and Firebase, resulting in a 30% improvement in performance and user engagement. Mentored junior developers."
  },
  {
    role: "Junior Web Developer",
    company: "Innovate Digital",
    duration: "2020 - 2022",
    desc: "Assisted in the development of WordPress and React websites. Gained hands-on experience with frontend technologies and client communication."
  }
];

export const education: Education[] = [
  {
    degree: "B.Sc. in Computer Science",
    institution: "State University",
    duration: "2018 - 2022",
    desc: "Graduated with honors. Specialized in web development, database management, and artificial intelligence. President of the university coding club."
  }
];

export const contact: Contact = {
  email: "john.doe@example.com",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  twitter: "https://twitter.com/johndoe"
};

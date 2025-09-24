import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  profile: {
    name: "John Doe",
    role: "Full Stack Developer",
    tagline: "Building modern web apps with React, Next.js, and Cloud solutions",
    profilePhoto: "https://picsum.photos/seed/1/300/300",
    resumes: [
      { id: "resume-1", name: "Download Resume", url: "placeholder.txt" }
    ],
  },
  about: {
    bio: "I am a passionate developer with experience in building scalable apps. Skilled in Next.js, Firebase, and cloud services, I love creating innovative solutions.",
    highlights: [
      "3+ years experience in web development",
      "Worked on 10+ real-world projects",
      "Interested in AI, Blockchain",
    ],
  },
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    backend: ["Node.js", "Express", "Firebase", "GraphQL"],
    databases: ["Firestore", "MySQL", "MongoDB"],
    tools: ["Git", "Docker", "Cloudinary", "Netlify", "Vercel"],
  },
  softSkills: [
    { id: 'ss-1', skill: 'Team Collaboration' },
    { id: 'ss-2', skill: 'Problem Solving' },
    { id: 'ss-3', skill: 'Communication' },
    { id: 'ss-4', skill: 'Adaptability' },
  ],
  projects: [
    {
      id: "proj-1",
      title: "TRACEIN Attendance System",
      desc: "Smart attendance system using QR codes, face recognition, and admin dashboard.",
      imageUrl: "https://picsum.photos/seed/2/600/400",
      tech: ["Next.js", "Firebase", "FaceAPI"],
      github: "",
      demo: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Software Developer",
      company: "Tech Solutions Inc",
      duration: "2022 - Present",
      desc: "Developed web apps using Next.js and Firebase, improving performance by 30%.",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Google Cloud Certified - Associate Cloud Engineer",
      authority: "Google",
      date: "2023",
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.Sc Computer Science",
      institution: "XYZ University",
      duration: "2018 - 2022",
      desc: "Graduated with honors, specialized in web development and AI.",
    },
  ],
  extracurricular: [
    {
      id: "extra-1",
      title: "Hackathon Club",
      role: "President",
      desc: "Organized monthly hackathons and coding workshops for over 100 students."
    }
  ],
  contact: {
    email: "john.doe@example.com",
    phone: "+1 123 456 7890",
    socials: [
      { id: 'social-1', platform: 'linkedin', url: 'https://www.linkedin.com' },
      { id: 'social-2', platform: 'github', url: 'https://www.github.com' },
      { id: 'social-3', platform: 'twitter', url: '' },
    ]
  },
  theme: {
    accent: '16 93% 63%', // Default: Soft Coral
    backgroundTheme: 'Default',
    headlineFont: 'Playfair Display',
    bodyFont: 'PT Sans',
    headlineWeight: 700,
  },
};

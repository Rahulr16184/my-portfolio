
export interface Resume {
  id: string;
  name: string;
  url: string; // This will now store the filename, e.g., "my_resume.pdf"
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  profilePhoto: string;
  resumes: Resume[];
}

export interface About {
  bio: string;
  highlights: string[];
}

export interface Skills {
  frontend: string[];
  backend: string[];
  databases: string[];
  tools: string[];
}

export interface SoftSkill {
  id: string;
  skill: string;
}

export interface Certification {
  id: string;
  name: string;
  authority: string;
  date: string;
}

export interface Extracurricular {
  id: string;
  title: string;
  role: string;
  desc: string;
}

export interface Project {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  tech: string[];
  github: string;
  demo: string;
}

export interface Experience {
  id:string;
  role: string;
  company: string;
  duration: string;
  desc: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  desc: string;
}

export interface SocialLink {
  id: string;
  platform: 'linkedin' | 'github' | 'twitter';
  url: string;
}

export interface Contact {
  email: string;
  phone?: string;
  socials: SocialLink[];
}

export interface Theme {
  accent: string; // Stored as HSL string "H S% L%"
  backgroundTheme: string; // Name of the selected gradient theme
  headlineFont: string;
  bodyFont: string;
  headlineWeight: number;
}

export interface PortfolioData {
  profile: Profile;
  about: About;
  skills: Skills;
  softSkills: SoftSkill[];
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  education: Education[];
  extracurricular: Extracurricular[];
  contact: Contact;
  theme: Theme;
}

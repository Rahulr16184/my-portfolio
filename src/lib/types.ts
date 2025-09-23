export interface Profile {
  name: string;
  role: string;
  tagline: string;
  profilePhoto: string;
  resumeUrl: string;
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
  id: string;
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

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export interface PortfolioData {
  profile: Profile;
  about: About;
  skills: Skills;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  contact: Contact;
}

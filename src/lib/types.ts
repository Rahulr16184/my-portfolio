export type Profile = {
  name: string;
  role: string;
  tagline: string;
  profilePhotoUrl: string;
  resumeUrl: string;
};

export type About = {
  bio: string;
  highlights: string[];
};

export type Skills = {
  frontend: string[];
  backend: string[];
  databases: string[];
  tools: string[];
};

export type Project = {
  title: string;
  desc: string;
  imageId: string;
  tech: string[];
  github?: string;
  demo?: string;
};

export type Experience = {
  role: string;
  company: string;
  duration: string;
  desc: string;
};

export type Education = {
  degree: string;
  institution: string;
  duration: string;
  desc: string;
};

export type Contact = {
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
};

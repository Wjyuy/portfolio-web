// types/index.ts
export interface Profile {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    blog?: string;
    portfolio: string;
  };
  avatar: string;
  resumeUrl: string;
  bio: string[];
  details: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: {
    start: string;
    end: string | 'Present';
  };
  description: string[];
  technologies: string[];
  achievements?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  goals: string[];
  period: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  features?: string[];
  screenshots?: {
    url: string;
    caption: string;
  }[];
  contributions?: {
    score: number;
    role: string;
    responsibilities: string[];
  };
  technologies: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    deployment?: string[];
    others?: string[];
  };
  troubleshooting?: {
    problem: string;
    solution: string;
    result: string;
  }[];
  links: {
    github?: string;
    demo?: string;
    article?: string;
  };
}
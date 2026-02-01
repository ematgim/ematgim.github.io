export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}

export interface ServiceProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export interface ExperienceProps {
  company: string;
  role: string;
  period: string;
  milestone: string;
  desc: string;
  tags: string[];
  icon: React.ReactNode;
}

export interface TechStackProps {
  name: string;
  icon: React.ReactNode;
}

export interface ProjectProps {
  translationKey?: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  featured: boolean;
  link: string | null;
  github: string | null;
  image: React.ReactNode;
  stats?: Array<{
    label?: string;
    labelKey?: 'precision' | 'latency' | 'uptime';
    value: string;
  }>;
}

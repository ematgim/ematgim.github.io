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

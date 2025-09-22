export type SectionType = "hero" | "about" | "projects" | "contact";

export interface PortfolioSection {
  id: string;
  type: SectionType;
  name: string;
  content: {
    [key: string]: any;
  };
}

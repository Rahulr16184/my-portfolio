import { cn } from "@/lib/utils";
import { Briefcase, GraduationCap } from "lucide-react";

type TimelineItem = {
  icon: 'work' | 'education';
  title: string;
  subtitle: string;
  date: string;
  description: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

const iconMap = {
  work: <Briefcase className="h-4 w-4 text-primary-foreground" />,
  education: <GraduationCap className="h-4 w-4 text-primary-foreground" />,
};

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border -ml-[1px]"></div>
      {items.map((item, index) => (
        <div key={index} className="relative pl-12 pb-8">
          <div className="absolute left-4 -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            {iconMap[item.icon]}
          </div>
          <div className="p-4 rounded-lg bg-card border">
            <p className="text-xs text-muted-foreground">{item.date}</p>
            <h3 className="font-bold text-lg text-card-foreground">{item.title}</h3>
            <p className="text-sm font-medium text-accent-foreground/80">{item.subtitle}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
export type { TimelineItem };

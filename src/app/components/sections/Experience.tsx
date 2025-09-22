import { experience, education } from "@/lib/data";
import Section from "./Section";
import Timeline, { type TimelineItem } from "@/app/components/Timeline";

const Experience = () => {
  const experienceItems: TimelineItem[] = experience.map((item) => ({
    icon: 'work',
    title: item.role,
    subtitle: item.company,
    date: item.duration,
    description: item.desc,
  }));

  const educationItems: TimelineItem[] = education.map((item) => ({
    icon: 'education',
    title: item.degree,
    subtitle: item.institution,
    date: item.duration,
    description: item.desc,
  }));

  const allItems = [...experienceItems, ...educationItems];
  // A real implementation would sort by date, but for this mock data, the order is sufficient.

  return (
    <Section id="experience" title="Career & Education">
      <Timeline items={allItems} />
    </Section>
  );
};

export default Experience;

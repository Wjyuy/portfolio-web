// app/page.tsx
import Hero from '@/components/sections/Hero';
import ProfileSection from '@/components/sections/Profile'; 
import SkillsSection from '@/components/sections/Skills';  
import ExperienceSection from '@/components/sections/Experience'; 
import ProjectsSection from '@/components/sections/Projects';
import SubProjectsSection from '@/components/sections/SubProjects';

export default function HomePage() {
  return (
    <div className="dark:bg-gray-950">
      <Hero />
      <ProfileSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <SubProjectsSection />
    </div>
  );
}
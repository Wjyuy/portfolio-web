// app/page.tsx
import Hero from '@/components/sections/Hero';
import ProfileSection from '@/components/sections/Profile'; // 이름 변경
import SkillsSection from '@/components/sections/Skills';   // 이름 변경
import ExperienceSection from '@/components/sections/Experience'; // 이름 변경
import ProjectsSection from '@/components/sections/Projects'; // 이름 변경

export default function HomePage() {
  return (
    <div className="dark:bg-gray-950">
      <Hero />
      <ProfileSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
    </div>
  );
}
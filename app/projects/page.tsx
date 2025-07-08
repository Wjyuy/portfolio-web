// app/page.tsx
import ProjectsSection from '@/components/sections/Projects'; 
import SubProjectsSection from '@/components/sections/SubProjects';

export default function ProjectsPage() {
  return (
    <div className="dark:bg-gray-950">
      <ProjectsSection />
      <SubProjectsSection />
    </div>
  );
}
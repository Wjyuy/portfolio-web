// components/sections/Projects.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Github, ExternalLink, Newspaper } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import ImageModal from '../ui/ImageModal'; // 🟢 새로 만든 ImageModal 임포트
import { Project } from '@/types';

// JSON 데이터 임포트
import projectsData from '@/data/projects.json';

const ProjectsSection = () => {
  const projects: Project[] = projectsData.map((project: any) => ({
    ...project,
    status:
      project.status === 'Completed'
        ? 'Completed'
        : project.status === 'In Progress'
        ? 'In Progress'
        : project.status === 'Planned'
        ? 'Planned'
        : 'Planned', // fallback to a valid value
  }));
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 🟢 이미지 확대 모달 상태 추가
  const [imageModalState, setImageModalState] = useState<{
    isOpen: boolean;
    images: { url: string; caption: string }[];
    initialIndex: number;
  }>({
    isOpen: false,
    images: [],
    initialIndex: 0,
  });

  // 🟢 이미지 확대 모달 열기 핸들러
  const openImageModal = (images: { url: string; caption: string }[], initialIndex: number) => {
    setImageModalState({
      isOpen: true,
      images,
      initialIndex,
    });
  };

  // 🟢 이미지 확대 모달 닫기 핸들러
  const closeImageModal = () => {
    setImageModalState({
      isOpen: false,
      images: [],
      initialIndex: 0,
    });
  };

  return (
    <section id="projects" className="py-16 px-6 bg-slate-50 dark:bg-gray-950 text-slate-800 dark:text-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-gray-50">
          주요 프로젝트
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              hover
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:shadow-md dark:hover:bg-gray-700"
            >
              <Card.Body>
                {project.screenshots && project.screenshots.length > 0 && (
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-slate-200 dark:bg-gray-700">
                    <Image
                      src={project.screenshots[0].url}
                      alt={project.screenshots[0].caption || project.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105 cursor-pointer"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-slate-900 mb-2 dark:text-gray-50">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 dark:text-gray-300">
                  {project.description.substring(0, 100)}...
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.frontend && project.technologies.frontend.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs dark:bg-blue-900 dark:text-blue-200">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.backend && project.technologies.backend.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs dark:bg-green-900 dark:text-green-200">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.database && project.technologies.database.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-xs dark:bg-purple-900 dark:text-purple-200">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.deployment && project.technologies.deployment.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded text-xs dark:bg-yellow-900 dark:text-yellow-200">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.others && project.technologies.others.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs dark:bg-red-900 dark:text-red-200">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  {project.links.github && (
                    <Button size="sm" variant="outline" icon={Github} onClick={(e) => { e.stopPropagation(); window.open(project.links.github!, '_blank'); }}>
                      코드
                    </Button>
                  )}
                  {project.links.demo && (
                    <Button size="sm" variant="primary" icon={ExternalLink} onClick={(e) => { e.stopPropagation(); window.open(project.links.demo!, '_blank'); }}>
                      데모
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* 프로젝트 상세 모달 */}
        {selectedProject && (
          <Modal
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            title={selectedProject.title}
            size="lg"
            className="dark:bg-gray-800 dark:border-gray-700"
            overlayClassName="dark:bg-black dark:bg-opacity-70"
          >
            <Modal.Body className="dark:text-gray-300">
              <div className="space-y-6">
                {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProject.screenshots.map((screenshot, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden bg-slate-200 dark:bg-gray-700 cursor-pointer"
                        // 🟢 여기서 이미지 클릭 시 ImageModal 열도록 설정
                        onClick={() => openImageModal(selectedProject.screenshots!, index)}
                      >
                        <Image
                          src={screenshot.url}
                          alt={screenshot.caption}
                          layout="fill"
                          objectFit="cover"
                        />
                        {screenshot.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-2">
                            {screenshot.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* ... (나머지 프로젝트 상세 정보) ... */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-gray-50">프로젝트 개요</h3>
                  <p className="text-slate-600 dark:text-gray-300">{selectedProject.description}</p>
                  <p className="text-sm text-slate-500 mt-2 dark:text-gray-400">
                    기간: {selectedProject.period} | 상태: {selectedProject.status}
                  </p>
                </div>

                {selectedProject.goals && selectedProject.goals.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-slate-900 dark:text-gray-50">프로젝트 목표</h4>
                    <ul className="list-disc list-inside text-slate-600 dark:text-gray-300 space-y-1">
                      {selectedProject.goals.map((goals, index) => (
                        <li key={index}>{goals}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-slate-900 dark:text-gray-50">주요 기능</h4>
                    <ul className="list-disc list-inside text-slate-600 dark:text-gray-300 space-y-1">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.contributions && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-slate-900 dark:text-gray-50">기여</h4>
                    <p className="text-slate-600 dark:text-gray-300 mb-1">
                      역할: {selectedProject.contributions.role}
                    </p>
                    <ul className="list-disc list-inside text-slate-600 dark:text-gray-300 space-y-1">
                      {selectedProject.contributions.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-slate-900 dark:text-gray-50">사용 기술</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedProject.technologies).map(([category, techs]) => (
                      techs && techs.length > 0 && (
                        <div key={category} className="flex items-center gap-1">
                          <span className="font-medium text-slate-700 dark:text-gray-200">{category}:</span>
                          {techs.map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs dark:bg-gray-700 dark:text-gray-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {selectedProject.troubleshooting && selectedProject.troubleshooting.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-slate-900 dark:text-gray-50">트러블슈팅</h4>
                    <div className="space-y-4">
                      {selectedProject.troubleshooting.map((ts, index) => (
                        <Card key={index} className="border-l-4 border-blue-500 p-4 dark:bg-gray-800 dark:border-blue-700 dark:shadow-md">
                          <h5 className="font-semibold text-slate-800 mb-1 dark:text-gray-100">문제: {ts.problem}</h5>
                          <p className="text-slate-600 text-sm mb-1 dark:text-gray-300">해결: {ts.solution}</p>
                          <p className="text-slate-500 text-sm italic dark:text-gray-400">결과: {ts.result}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              {selectedProject.links.github && (
                <Button variant="outline" icon={Github} onClick={() => window.open(selectedProject.links.github!, '_blank')}>
                  GitHub
                </Button>
              )}
              {selectedProject.links.demo && (
                <Button variant="primary" icon={ExternalLink} onClick={() => window.open(selectedProject.links.demo!, '_blank')}>
                  데모 보기
                </Button>
              )}
              {selectedProject.links.article && (
                <Button variant="secondary" icon={Newspaper} onClick={() => window.open(selectedProject.links.article!, '_blank')}>
                  아티클 읽기
                </Button>
              )}
              <Button variant="ghost" onClick={() => setSelectedProject(null)}>
                닫기
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* 🟢 이미지 확대 모달 렌더링 */}
        <ImageModal
          isOpen={imageModalState.isOpen}
          onClose={closeImageModal}
          images={imageModalState.images}
          initialIndex={imageModalState.initialIndex}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
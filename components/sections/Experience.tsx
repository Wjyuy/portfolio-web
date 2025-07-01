// components/sections/Experience.tsx
import { Briefcase, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import { Experience } from '@/types'; // 타입 임포트

// JSON 데이터 임포트
import experienceData from '@/data/experiences.json';

const ExperienceSection = () => { // 이름 충돌 피하기 위해 ExperienceSection으로 변경
  const experiences: Experience[] = experienceData; // 불러온 데이터를 타입과 연결

  return (
    <section id="experience" className="py-16 px-6 bg-slate-50 dark:bg-gray-950 text-slate-800 dark:text-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-gray-50">
          경력
        </h2>

        <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-1/2 before:-ml-px before:w-0.5 before:bg-slate-200 dark:before:bg-gray-700 max-md:before:hidden">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative flex items-center justify-between md:flex-row flex-col-reverse md:even:flex-row-reverse w-full gap-8"
            >
              <div className="md:w-1/2 md:text-right max-md:text-center">
                <Card className="dark:bg-gray-800 dark:border-gray-700 dark:shadow-md">
                  <Card.Header>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-50">{exp.company}</h3>
                    <p className="text-blue-600 dark:text-blue-400 mt-1">{exp.position}</p>
                  </Card.Header>
                  <Card.Body>
                    <div className="flex items-center justify-center md:justify-end gap-2 text-slate-500 dark:text-gray-400 text-sm mb-4">
                      <Calendar size={16} />
                      <span>{exp.period.start} - {exp.period.end}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-gray-300">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap justify-center md:justify-end gap-2 mt-4">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium dark:bg-gray-700 dark:text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-gray-700">
                        <h4 className="font-semibold text-slate-700 dark:text-gray-200 mb-2">주요 성과:</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-gray-300 text-sm">
                          {exp.achievements.map((ach, i) => (
                            <li key={i}>{ach}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>

              <div className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white items-center justify-center z-10 shadow-md">
                <Briefcase size={20} />
              </div>

              <div className="md:w-1/2 max-md:hidden">
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection; // ExperienceSection으로 내보내기
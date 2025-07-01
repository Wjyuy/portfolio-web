// components/sections/Skills.tsx
import Image from 'next/image';
import Card from '../ui/Card';
import { SkillCategory } from '@/types'; // 타입 임포트

// JSON 데이터 임포트
import skillsData from '@/data/skills.json';

const SkillsSection = () => { // 이름 충돌 피하기 위해 SkillsSection으로 변경
  const skillCategories: SkillCategory[] = skillsData; // 불러온 데이터를 타입과 연결

  const getLevelColor = (level: number) => {
    if (level === 5) return 'bg-blue-600';
    if (level === 4) return 'bg-green-500';
    if (level === 3) return 'bg-yellow-500';
    if (level === 2) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <section id="skills" className="py-16 px-6 bg-white dark:bg-gray-900 text-slate-800 dark:text-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-gray-50">
          기술 스택
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <Card key={category.category} className="dark:bg-gray-800 dark:border-gray-700 dark:shadow-md">
              <Card.Header>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-50">
                  {category.category}
                </h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  {category.items.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-4">
                      {skill.icon && ( // 아이콘이 있을 때만 렌더링
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image src={skill.icon} alt={skill.name} layout="fill" objectFit="contain" />
                        </div>
                      )}
                      <div className="flex-grow">
                        <p className="font-medium text-slate-700 dark:text-gray-200">{skill.name}</p>
                        <div className="w-full bg-slate-200 rounded-full h-2 mt-1 dark:bg-gray-700">
                          <div
                            className={`h-2 rounded-full ${getLevelColor(skill.level)}`}
                            style={{ width: `${(skill.level / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; // SkillsSection으로 내보내기
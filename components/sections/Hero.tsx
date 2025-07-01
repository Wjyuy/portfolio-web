// components/sections/Hero.tsx
'use client';

import { Download, Github, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Button from '../ui/Button';
import { Profile } from '@/types'; // 타입 임포트

// JSON 데이터 임포트
import profileData from '@/data/profile.json';

const Hero = () => {
  const profile: Profile = profileData; // 불러온 데이터를 타입과 연결

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center py-16 px-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20 dark:opacity-10"></div>
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white dark:border-gray-700 transition-all duration-300">
          <Image
            src={profile.avatar}
            alt={`${profile.name} 아바타`}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight dark:text-gray-50">
          안녕하세요, <span className="text-blue-600 dark:text-blue-400">{profile.name}</span>입니다.
        </h1>
        <p className="text-xl md:text-2xl font-medium text-slate-700 dark:text-gray-300">
          {profile.title}
        </p>
        <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
          {profile.summary}
        </p>
        <p className="text-md md:text-lg text-slate-500 dark:text-gray-500">
          📍 {profile.location}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Button variant="primary" size="lg" icon={Download} iconPosition="left"
            onClick={() => window.open(profile.resumeUrl, '_blank')}
          >
            이력서 다운로드
          </Button>
          <Button variant="outline" size="lg" icon={Github} iconPosition="left"
            onClick={() => window.open(profile.social.github, '_blank')}
          >
            GitHub
          </Button>
          <Button variant="outline" size="lg" icon={Linkedin} iconPosition="left"
            onClick={() => window.open(profile.social.linkedin, '_blank')}
          >
            LinkedIn
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
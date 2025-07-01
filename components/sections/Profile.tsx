// components/sections/Profile.tsx
import Image from 'next/image';
import { Profile } from '@/types'; // 타입 임포트

// JSON 데이터 임포트
import profileData from '@/data/profile.json';

const ProfileSection = () => { // 이름 충돌 피하기 위해 ProfileSection으로 변경
  const profile: Profile = profileData; // 불러온 데이터를 타입과 연결

  return (
    <section id="profile" className="py-16 px-6 bg-white dark:bg-gray-900 text-slate-800 dark:text-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden shadow-xl border-4 border-blue-500 dark:border-blue-700">
          <Image
            src={profile.avatar}
            alt={`${profile.name} 프로필 이미지`}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        <div className="flex-grow text-center md:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-gray-50">
            소개
          </h2>
          <h3 className="text-2xl font-semibold text-slate-800 dark:text-gray-100">
            {profile.name} - {profile.title}
          </h3>
          <div className="space-y-4 text-lg text-slate-600 dark:text-gray-300">
            {profile.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700 dark:text-gray-400">
            {profile.details.map((detail, index) => (
              <div key={index}>
                <p className="font-semibold">{detail.label}:</p>
                <p>{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection; // ProfileSection으로 내보내기
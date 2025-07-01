// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Inter 폰트 임포트
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // <--- 이 부분 추가: CSS 변수로 폰트 설정
});

export const metadata: Metadata = {
  title: '우주연 이력서',
  description: '신입 풀스택 개발자 우주연의 이력서 페이지입니다. Java, TypeScript, Node.js 등 다양한 기술 스택을 공부하고 있습니다.',
  keywords: ['풀스택 개발자', 'Next.js','Java', 'TypeScript', 'React', 'Node.js', '개발자 이력서'],
  authors: [{ name: '우주연' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: '우주연 - 풀스택 개발자',
    description: '신입 풀스택 개발자 우주연의 이력서 페이지',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable}`}> 
      <body>
        <Header />
        <main className="relative z-10 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
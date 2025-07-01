// components/ui/ImageModal.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; caption: string }[];
  initialIndex?: number;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, images, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 모달이 다시 열릴 때 초기 인덱스 설정
    // images 배열이 변경될 때도 초기 인덱스를 다시 설정할 수 있도록 의존성 배열에 images 추가
    if (images.length > 0) { // images가 비어있지 않을 때만 인덱스 설정
      setCurrentIndex(Math.min(initialIndex, images.length - 1)); // initialIndex가 images.length를 초과하지 않도록 안전하게 설정
    } else {
      setCurrentIndex(0); // 이미지가 없으면 0으로 초기화
    }
  }, [initialIndex, isOpen, images]); // images를 의존성 배열에 추가

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen) {
        if (event.key === 'ArrowLeft') {
          handlePrev();
        } else if (event.key === 'ArrowRight') {
          handleNext();
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleKeyDown);
      // 이 부분은 개선이 필요할 수 있습니다. onClose가 다른 모달을 닫을 때
      // body overflow가 의도치 않게 변경될 수 있습니다.
      // 하지만 현재 상태에서는 문제 해결을 위해 유지합니다.
      if (!isOpen) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, onClose, currentIndex, images.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // 🟢 이 조건문이 중요합니다. 이미지가 없으면 렌더링하지 않아야 합니다.
  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[110]"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative flex flex-col items-center justify-center w-full h-full p-4" // 🟢 w-full h-full로 변경하여 부모 컨테이너가 화면을 꽉 채우도록 함
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          icon={X}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white hover:bg-gray-700"
          aria-label="닫기"
        />

        {/* 이전/다음 버튼 (이미지가 여러 개일 때만) */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="lg"
              icon={ChevronLeft}
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-gray-700"
              aria-label="이전 이미지"
            />
            <Button
              variant="ghost"
              size="lg"
              icon={ChevronRight}
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-gray-700"
              aria-label="다음 이미지"
            />
          </>
        )}

        {/* 🟢 이미지 컨테이너: max-w, max-h로 제한하면서 비율을 유지하도록 함 */}
        <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <Image
            src={currentImage.url}
            alt={currentImage.caption}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>

        {/* 이미지 캡션 (선택 사항) */}
        {currentImage.caption && (
          <p className="mt-4 text-white text-center text-lg max-w-[80vw]">
            {currentImage.caption}
          </p>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
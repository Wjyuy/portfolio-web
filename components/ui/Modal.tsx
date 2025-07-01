// components/ui/Modal.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;         // 모달 본체에 적용될 클래스
  overlayClassName?: string;  // <--- 이 부분을 추가하거나 확인하세요.
}

const Modal: React.FC<ModalProps> & {
  Header: React.FC<{ children: React.ReactNode }>;
  Body: React.FC<{ children: React.ReactNode; className?: string }>;
  Footer: React.FC<{ children: React.ReactNode; className?: string }>;
} = ({ isOpen, onClose, children, title, size = 'md', className = '', overlayClassName = '' }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return createPortal(
    // overlayClassName을 여기에 적용합니다.
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] ${overlayClassName}`}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`bg-white rounded-lg shadow-xl relative m-4 w-full ${sizeClasses[size]}
                    ${className} dark:bg-gray-800 dark:border dark:border-gray-700`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-gray-700">
          <h3 id="modal-title" className="text-lg font-semibold text-slate-800 dark:text-gray-50">
            {title}
          </h3>
          <Button variant="ghost" size="sm" icon={X} onClick={onClose} aria-label="모달 닫기" />
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

Modal.Header = ({ children }) => <div className="p-4">{children}</div>;
Modal.Body = ({ children, className = '' }) => (
  <div className={`p-4 overflow-y-auto max-h-[70vh] ${className}`}>
    {children}
  </div>
  );
Modal.Footer = ({ children, className = '' }) => <div className={`p-4 border-t border-slate-200 flex justify-end gap-2 dark:border-gray-700 ${className}`}>{children}</div>;

export default Modal;
"use client";

import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  const { dir, language } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" dir={dir}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-white rounded-3xl shadow-2xl z-10 p-6 sm:p-10 border border-gray-100"
          >
            <button 
              onClick={onClose}
              className={`absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} p-2 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors`}
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#1F2933] mb-8 pr-12">{title}</h2>
            
            <div className="prose prose-sm sm:prose-base text-gray-600 max-w-none whitespace-pre-line leading-relaxed">
              {content}
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-100 text-right">
              <button 
                onClick={onClose}
                className="px-6 py-3 bg-[#F5F6F8] hover:bg-gray-200 text-[#1F2933] font-bold rounded-xl transition-colors"
              >
                {language === 'fr' ? 'Fermer' : language === 'en' ? 'Close' : 'إغلاق'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

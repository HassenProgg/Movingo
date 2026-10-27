"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import LegalModal from './LegalModal';

export default function Footer({ t }: { t: any }) {
  const { dir } = useLanguage();
  const [modalState, setModalState] = useState<{isOpen: boolean, title: string, type: string}>({ isOpen: false, title: '', type: '' });

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.quote, href: '#quote' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const openModal = (e: React.MouseEvent, title: string, type: string) => {
    e.preventDefault();
    setModalState({ isOpen: true, title, type });
  };

  const closeModal = () => setModalState(prev => ({ ...prev, isOpen: false }));

  return (
    <footer className="bg-[#1F2933] py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={dir}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <a href="#home" aria-label="MOVINGO — Accueil" className="footer-brand">
              <Image src="/movingo-logo-transparent.png" alt="MOVINGO — Déménagement & Transport" width={1774} height={887} sizes="170px" />
            </a>
            <p className="text-gray-400 font-medium text-sm">
              {t.footer.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p dir="ltr">{t.footer.copyright}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={(e) => openModal(e, t.footer.legalMentions, 'legalMentions')} className="hover:text-gray-300 transition-colors text-left">{t.footer.legalMentions}</button>
            <button onClick={(e) => openModal(e, t.footer.privacyPolicy, 'privacyPolicy')} className="hover:text-gray-300 transition-colors text-left">{t.footer.privacyPolicy}</button>
            <button onClick={(e) => openModal(e, t.footer.cgv, 'cgv')} className="hover:text-gray-300 transition-colors text-left">{t.footer.cgv}</button>
          </div>
        </div>
      </div>
      <LegalModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        title={modalState.title} 
        content={t.legal?.[modalState.type as keyof typeof t.legal] || "..."} 
      />
    </footer>
  );
}

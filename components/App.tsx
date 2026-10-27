"use client";

import React from 'react';
import { MotionConfig } from 'motion/react';
import Header from './Header';
import Services from './Services';
import Advantages from './Advantages';
import HowItWorks from './HowItWorks';
import QuoteForm from './QuoteForm';
import CoverageMap from './CoverageMap';
import Contact from './Contact';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/i18n';

export default function App() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <MotionConfig reducedMotion="user"><div className="movingo-site flex flex-col min-h-screen">
      <Header t={t} />
      <HowItWorks />
      <Services t={t} />
      <QuoteForm t={t} />
      <Advantages t={t} />
      <CoverageMap t={t} />
      <Contact t={t} />
      <Footer t={t} />
      <FloatingWhatsApp />
    </div></MotionConfig>
  );
}

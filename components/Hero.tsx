'use client';

import { ArrowDown, ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from './Reveal';

export default function Hero({ t }: { t: any }) {
  const { language } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const doorTurn = useTransform(scrollYProgress, [0, 0.75], [0, -24]);
  const frontY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const backY = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const copy = {
    fr: { eyebrow: 'DÉMÉNAGEMENT & TRANSPORT · TUNISIE', title: 'Un déménagement', accent: 'bien organisé.', description: 'De la préparation à l’installation, des prestations adaptées à votre logement et à votre calendrier.', cta: 'Obtenir un devis', discover: 'Découvrir nos services', label: 'MOVINGO · TUNISIE', detail: 'Préparation, transport, installation.', box: 'MOVINGO', note: 'Déménagement & transport', free: 'Devis gratuit · Sans engagement' },
    en: { eyebrow: 'MOVING & TRANSPORT · TUNISIA', title: 'A move,', accent: 'well planned.', description: 'From preparation to installation, choose the services that suit your home and schedule.', cta: 'Request a quote', discover: 'Explore our services', label: 'MOVINGO · TUNISIA', detail: 'Preparation, transport, installation.', box: 'MOVINGO', note: 'Moving & transport', free: 'Free quote · No obligation' },
    ar: { eyebrow: 'نقل الأثاث · تونس', title: 'نقل منظّم،', accent: 'وفق احتياجاتكم.', description: 'من التحضير إلى التركيب، اختاروا الخدمات المناسبة لمسكنكم والموعد المحدد.', cta: 'اطلبوا عرض سعر', discover: 'اكتشفوا خدماتنا', label: 'MOVINGO · تونس', detail: 'التحضير والنقل والتركيب.', box: 'MOVINGO', note: 'نقل الأثاث', free: 'عرض سعر مجاني · دون التزام' }
  }[language];
  return <section ref={ref} id="home" className="editorial-hero">
    <div className="site-container hero-grid">
      <Reveal className="hero-copy">
        <p className="eyebrow"><span className="red-dot" />{copy.eyebrow}</p>
        <h1>{copy.title}<br /><em>{copy.accent}</em></h1>
        <p className="hero-description">{copy.description}</p>
        <div className="hero-actions"><a href="#quote" className="button-primary">{copy.cta}<ArrowUpRight size={19} /></a><a href="tel:+21624190486" className="phone-link" dir="ltr">24 190 486</a></div>
        <p className="quiet-note">{copy.free}</p>
        <div className="hero-assurances">{[t.hero.trust[0], t.hero.trust[2]].map((v: string) => <span key={v}><Check size={14} />{v}</span>)}</div>
      </Reveal>
      <Reveal className="hero-art" delay={0.15}>
        <motion.div className="moving-scene"  aria-hidden="true">
          <div className="scene-grid" /><div className="scene-door"><motion.div className="door-panel" style={{ rotateY: reduced ? 0 : doorTurn }} /><span className="door-handle" /></div>
          <div className="scene-step" />
          <motion.div className="moving-box box-back" style={{ y: reduced ? 0 : backY, rotate: 7 }}><span className="box-tape" /><span className="box-arrows">↑↑</span></motion.div>
          <motion.div className="moving-box box-front" style={{ y: reduced ? 0 : frontY, rotate: -5 }}><span className="box-tape" /><div className="box-label"><Image src="/movingo-logo-transparent.png" alt="" width={1774} height={887} sizes="105px" /><small>{copy.box}</small></div></motion.div>
          <div className="scene-stamp"><Image src="/movingo-symbol-transparent.png" alt="" width={1774} height={887} sizes="54px" /></div>
          <span className="scene-floor-label">{copy.note}</span>
        </motion.div>
        <div className="scene-caption"><div><span>{copy.label}</span><strong>{copy.detail}</strong></div><ArrowRight size={28} strokeWidth={1} /></div>
      </Reveal>
    </div>
    <div className="site-container hero-bottom"><a href="#services"><ArrowDown size={15} />{copy.discover}</a><span>01 — MOVINGO</span></div>
  </section>;
}

'use client';

import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Check, Home, Package, PhoneCall, Truck } from 'lucide-react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

const stories = {
  fr: {
    eyebrow: 'DÉMÉNAGEMENT & TRANSPORT · TUNISIE',
    title: 'Un déménagement', accent: 'bien organisé.',
    intro: 'De la préparation à l’installation, des prestations adaptées à votre logement et à votre calendrier.',
    scroll: 'Faites défiler pour découvrir les étapes', cta: 'Obtenir un devis', phone: '24 190 486', call: 'Appeler MOVINGO', skip: 'Accéder au devis',
    steps: [
      { title: 'Préparation', text: 'Nous définissons avec vous les prestations nécessaires et le déroulement de l’intervention.', tag: 'Préparation' },
      { title: 'Transport', text: 'Protection, chargement et transport selon les prestations retenues dans votre devis.', tag: 'Transport en cours' },
      { title: 'Installation', text: 'Déchargement et remontage des meubles prévus dans votre devis.', tag: 'À destination' },
    ],
  },
  en: {
    eyebrow: 'MOVING & TRANSPORT · TUNISIA', title: 'A move,', accent: 'well planned.',
    intro: 'From preparation to installation, choose the services that suit your home and schedule.', scroll: 'Scroll to see each stage', cta: 'Request a quote', phone: '24 190 486', call: 'Call MOVINGO', skip: 'Go to quote',
    steps: [
      { title: 'Preparation', text: 'We confirm the services you need and how the move will be organised.', tag: 'Preparation' },
      { title: 'Transport', text: 'Protection, loading and transport according to the services in your quote.', tag: 'In transit' },
      { title: 'Installation', text: 'Unloading and furniture reassembly as specified in your quote.', tag: 'Delivered' },
    ],
  },
  ar: {
    eyebrow: 'نقل الأثاث · تونس', title: 'نقل منظّم،', accent: 'وفق احتياجاتكم.',
    intro: 'من التحضير إلى التركيب، اختاروا الخدمات المناسبة لمسكنكم والموعد المحدد.', scroll: 'مرّر لمشاهدة مراحل النقل', cta: 'اطلبوا عرض سعر', phone: '24 190 486', call: 'اتصلوا بموفينجو', skip: 'الانتقال إلى عرض السعر',
    steps: [
      { title: 'التحضير', text: 'نحدّد معكم الخدمات المطلوبة وخطوات تنظيم عملية النقل.', tag: 'التحضير' },
      { title: 'النقل', text: 'حماية الأثاث والتحميل والنقل وفق الخدمات المحددة في عرض السعر.', tag: 'في الطريق' },
      { title: 'التركيب', text: 'التفريغ وإعادة تركيب الأثاث المشمول في عرض السعر.', tag: 'تمّ التسليم' },
    ],
  },
};

export default function HowItWorks() {
  const { language } = useLanguage();
  const c = stories[language];
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [arrived, setArrived] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', value => {
    setStage(value < 0.32 ? 0 : value < 0.69 ? 1 : 2);
    setArrived(value >= 0.97);
  });

  const truckX = useTransform(scrollYProgress, [0, 0.2, 0.72, 0.84, 1], ['-38%', '-38%', '29%', '29%', '110%']);
  const truckOpacity = useTransform(scrollYProgress, [0, 0.84, 1], [1, 1, 0]);
  const wheelTurn = useTransform(scrollYProgress, [0.2, 0.72], [0, 540]);
  const parcelY = useTransform(scrollYProgress, [0, 0.15, 0.29], [-30, -10, 0]);
  const parcelOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const parcelRotate = useTransform(scrollYProgress, [0, 0.29], [-12, 0]);
  const roadProgress = useTransform(scrollYProgress, [0.2, 0.78], [0, 1]);
  const doorRotate = useTransform(scrollYProgress, [0.7, 0.92], [0, -72]);
  const homeGlow = useTransform(scrollYProgress, [0.65, 0.9], [0, 1]);
  const arrivalY = useTransform(scrollYProgress, [0.74, 0.94], [22, 0]);
  const backdropX = useTransform(scrollYProgress, [0.2, 0.72], [12, -16]);
  const icons = [Package, Truck, Home];

  return (
    <section ref={ref} id="home" className={`journey-section${reduced ? ' journey-static' : ''}`} aria-labelledby="home-title" data-arrived={arrived || reduced}>
      <span id="journey" className="journey-anchor" aria-hidden="true" />
      <div className="journey-sticky">
        <div className="site-container journey-layout">
          <div className="journey-copy">
            <p className="eyebrow">{c.eyebrow}</p>
            <h1 id="home-title" className="journey-title">{c.title}<br /><em>{c.accent}</em></h1>
            <p className="journey-intro">{c.intro}</p>
            <div className="journey-hero-actions"><a href="#quote" className="button-primary">{c.cta}<ArrowUpRight size={18} /></a><a href="tel:+21624190486" className="journey-phone" dir="ltr" aria-label={`${c.call}: +216 24 190 486`}><PhoneCall size={17} /><span><small>{c.call}</small><strong>{c.phone}</strong></span></a></div>
            <ol className="journey-chapters">
              {c.steps.map((step, i) => {
                const Icon = icons[i];
                return <li key={i} className={stage === i && !reduced ? 'is-current' : ''}>
                  <span className="chapter-index">0{i + 1}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                  <Icon size={18} strokeWidth={1.4} aria-hidden="true" />
                </li>;
              })}
            </ol>
            {!reduced && <p className="journey-mobile-detail">{c.steps[stage].text}</p>}
            <a className="journey-skip" href="#quote">{c.skip}<ArrowUpRight size={15} /></a>
          </div>

          <div className="journey-visual">
            <div className="journey-stage" aria-hidden="true" dir="ltr">
              <div className="journey-halo" />
              <motion.div className="journey-skyline" style={{ x: reduced ? 0 : backdropX }}>
                <span /><span /><span /><span /><span />
              </motion.div>
              <div className="destination-home">
                <motion.div className="home-light" style={{ opacity: reduced ? 1 : homeGlow }} />
                <div className="home-doorframe">
                  <motion.div className="home-doorleaf" style={{ rotateY: reduced ? -72 : doorRotate }}><span /></motion.div>
                </div>
                <div className="home-window"><span /><span /><span /><span /></div>
                <div className="home-stoop" />
              </div>
              <div className="journey-road"><motion.div style={{ scaleX: reduced ? 1 : roadProgress }} /></div>
              <motion.div className="journey-vehicle" style={{ x: reduced ? '110%' : truckX, opacity: reduced ? 0 : truckOpacity }}>
                {stage === 0 && !reduced && <motion.div className="journey-parcel" style={{ y: reduced ? 0 : parcelY, opacity: reduced ? 0 : parcelOpacity, rotate: reduced ? 0 : parcelRotate }}>
                  <span /><Image src="/movingo-symbol-transparent.png" alt="" width={1774} height={887} sizes="90px" />
                </motion.div>}
                <div className="truck-cargo"><Image src="/movingo-logo-transparent.png" alt="" width={1774} height={887} sizes="140px" /><span className="truck-stripe" /></div>
                <div className="truck-cabin"><div className="truck-window" /><span className="truck-headlight" /><span className="truck-handle" /></div>
                <div className="truck-chassis" />
                {[0, 1].map(i => <motion.span key={i} className={`truck-wheel wheel-${i}`} style={{ rotate: reduced ? 0 : wheelTurn }}><i /><b /></motion.span>)}
              </motion.div>
              <motion.div className="delivered-parcel" style={{ opacity: reduced ? 1 : homeGlow, y: reduced ? 0 : arrivalY }}><Image src="/movingo-symbol-transparent.png" alt="" width={1774} height={887} sizes="45px" /></motion.div>
              <motion.div className="arrival-note" style={{ opacity: reduced ? 1 : homeGlow, y: reduced ? 0 : arrivalY }}><Check size={15} />{c.steps[2].tag}</motion.div>
              <span className="journey-coordinate">MOVINGO — TUNISIE</span>
            </div>
            <div className="journey-scene-footer">
              <span><ArrowDown size={14} />{reduced ? c.intro : c.scroll}</span>
              <span className="journey-counter">0{reduced ? 3 : stage + 1}<i> / 03</i></span>
            </div>
            <div className="journey-progress-track"><motion.div style={{ scaleX: reduced ? 1 : scrollYProgress }} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

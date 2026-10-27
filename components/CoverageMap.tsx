'use client';

import { ArrowUpRight, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from './Reveal';

export default function CoverageMap({ t }: { t: any }) {
  const { language } = useLanguage();
  const copy = {
    fr: { label: '02 / NOTRE TERRAIN DE ROUTE', title: 'La Tunisie,', accent: 'd’une adresse à l’autre.', unit: 'gouvernorats', text: 'Dans votre ville ou à l’autre bout du pays, notre carte vous aide à situer nos destinations.', map: 'Carte de la Tunisie', mapNote: 'Explorez la carte et retrouvez les 24 gouvernorats ci-dessous.' },
    en: { label: '02 / COVERING THE COUNTRY', title: 'Across Tunisia,', accent: 'from door to door.', unit: 'governorates', text: 'Across your city or the country, explore the map and the destinations we serve.', map: 'Map of Tunisia', mapNote: 'Explore the map and find all 24 governorates below.' },
    ar: { label: '02 / في كامل أنحاء تونس', title: 'تونس كاملة،', accent: 'من عنوان إلى آخر.', unit: 'ولاية', text: 'داخل مدينتكم أو في جهة أخرى، استكشفوا الخريطة والوجهات التي تغطيها خدماتنا.', map: 'خريطة تونس', mapNote: 'استكشفوا الخريطة وتعرفوا على الولايات الـ 24 أدناه.' },
  }[language];

  return (
    <section id="coverage" className="coverage-section section-space">
      <div className="site-container">
        <Reveal className="coverage-heading"><div>
          <p className="eyebrow">{copy.label}</p><h2>{copy.title}<br/><em>{copy.accent}</em></h2><p className="section-intro">{copy.text}</p>
        </div><a href="#quote" className="text-link">{t.hero.quoteBtn}<ArrowUpRight size={18}/></a></Reveal>
        <Reveal className="coverage-map-card">
          <div className="map-window"><iframe title={copy.map} src="https://maps.google.com/maps?q=Tunisia&t=&z=6&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
          <div className="coverage-details">
            <div className="coverage-number"><strong>24</strong><span>{copy.unit}<br/>Tunisie</span></div>
            <p className="map-note"><MapPin size={15}/>{copy.mapNote}</p>
            <div className="governorates">{t.coverage.governorates.map((governorate: string) => <span key={governorate}>{governorate}</span>)}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

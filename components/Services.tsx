'use client';

import { ArrowUpRight, Building2, Home, Package, Snowflake, Truck, Wrench } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from './Reveal';

const serviceIcons = [Home, Building2, Package, Truck, Wrench, Snowflake];

export default function Services({ t }: { t: any }) {
  const { language } = useLanguage();
  const heading = {
    fr: { label: 'NOS PRESTATIONS', title: 'Des services adaptés', accent: 'à votre déménagement.', intro: 'Emballage, transport et installation : sélectionnez les prestations utiles à votre situation.', more: 'Demander cette prestation' },
    en: { label: 'OUR SERVICES', title: 'Services tailored', accent: 'to your move.', intro: 'Packing, transport and installation: select the services that suit your needs.', more: 'Ask about this service' },
    ar: { label: 'خدماتنا', title: 'خدمات تناسب', accent: 'احتياجاتكم.', intro: 'التغليف والنقل والتركيب: اختاروا الخدمات المناسبة لكم.', more: 'اطلبوا هذه الخدمة' },
  }[language];

  return (
    <section id="services" className="section-space services-section">
      <div className="site-container">
        <Reveal className="section-heading">
          <div><p className="eyebrow">{heading.label}</p><h2>{heading.title}<br/><em>{heading.accent}</em></h2></div>
          <p className="section-intro">{heading.intro}</p>
        </Reveal>
        <div className="service-grid service-grid-detailed">
          {t.services.cards.map((service: { title: string; description: string; detail: string }, i: number) => {
            const Icon = serviceIcons[i];
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.08} className="service-column service-card">
                <div className="service-top"><Icon size={27} strokeWidth={1.35}/><span>0{i + 1}</span></div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <p className="service-detail">{service.detail}</p>
                <a href="#quote" className="service-link" aria-label={`${heading.more} — ${service.title}`}><ArrowUpRight size={21}/></a>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="service-footnote" delay={0.1}>
          <Wrench size={16}/><span>{t.services.items[5]} · {t.services.items[6]}</span><a href="#quote">{heading.more}<ArrowUpRight size={15}/></a>
        </Reveal>
      </div>
    </section>
  );
}

'use client';
import { Check, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Reveal from './Reveal';
export default function Advantages({t}:{t:any}) {
 const {language}=useLanguage();
 const c={fr:{label:'UNE ORGANISATION MAÎTRISÉE',title:'Une équipe attentive,',accent:'à chaque étape.',text:'Nous préparons le transport, protégeons vos biens et coordonnons les prestations retenues dans votre devis.',link:'Échanger sur votre déménagement'},en:{label:'A WELL-ORGANISED MOVE',title:'One dedicated team,',accent:'at every stage.',text:'We plan the transport, protect your belongings and coordinate the services included in your quote.',link:'Discuss your move'},ar:{label:'تنظيم دقيق للنقل',title:'فريق واحد،',accent:'في كل مرحلة.',text:'نخطط للنقل ونحمي أغراضكم وننسق الخدمات المحددة في عرض السعر.',link:'تحدثوا معنا عن عملية النقل'}}[language];
 return <section id="advantages" className="care-section section-space"><div className="site-container care-grid"><Reveal><p className="eyebrow">{c.label}</p><h2>{c.title}<br/><em>{c.accent}</em></h2><p className="care-description">{c.text}</p><a className="text-link" href="#contact">{c.link}<ArrowUpRight size={18}/></a></Reveal><div className="care-list">{t.advantages.items.slice(0,6).map((item:string,i:number)=><Reveal key={item} delay={i*0.04} className="care-item"><Check size={17}/><span>{item}</span></Reveal>)}</div></div></section>;
}

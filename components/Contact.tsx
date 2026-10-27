'use client';
import {ArrowUpRight,MessageCircle,PhoneCall} from 'lucide-react';
import {useLanguage} from '@/lib/LanguageContext';
import Reveal from './Reveal';
export default function Contact({t}:{t:any}) {
 const {language}=useLanguage();
 const c={fr:{label:'CONTACT',title:'Une question ?',accent:'Contactez notre équipe.',call:'Appelez-nous'},en:{label:'CONTACT',title:'Speak with',accent:'our team.',call:'Call us'},ar:{label:'تواصلوا معنا',title:'تواصلوا مع فريقنا',accent:'بشأن عملية النقل.',call:'اتصلوا بنا'}}[language];
 return <section id="contact" className="contact-section"><div className="site-container"><Reveal className="contact-layout"><div><p className="eyebrow">{c.label}</p><h2>{c.title}<br/><em>{c.accent}</em></h2></div><div className="contact-actions"><span>{c.call}</span><a href="tel:+21624190486" className="contact-phone" dir="ltr" aria-label={`${c.call} +216 24 190 486`}><PhoneCall size={18}/><strong>24 190 486</strong><ArrowUpRight size={18}/></a><a href={`https://wa.me/21624190486?text=${encodeURIComponent(t.quote.whatsappPrefilledMsg)}`} target="_blank" rel="noopener noreferrer" className="contact-whatsapp"><MessageCircle size={18}/>WhatsApp<ArrowUpRight size={15}/></a></div></Reveal></div></section>;
}

'use client';
import Image from 'next/image';
import {useState} from 'react';
import {Menu,X,ArrowUpRight} from 'lucide-react';
import {motion,useScroll,useReducedMotion} from 'motion/react';
import {useLanguage} from '@/lib/LanguageContext';
import {Language} from '@/lib/i18n';
export default function Header({t}:{t:any}) {
 const {language,setLanguage}=useLanguage(); const [open,setOpen]=useState(false);const {scrollYProgress}=useScroll(); const reduced=useReducedMotion();
 const journeyLabel=language==='fr'?'Le voyage':language==='en'?'The journey':'الرحلة';
 const coverageLabel=language==='fr'?'Couverture':language==='en'?'Coverage':'التغطية';
 const links=[{name:t.nav.services,href:'#services'},{name:journeyLabel,href:'#journey'},{name:coverageLabel,href:'#coverage'},{name:t.nav.advantages,href:'#advantages'},{name:t.nav.contact,href:'#contact'}];
 const langButtons=<div className="language-switch" dir="ltr">{(['fr','ar','en'] as Language[]).map(l=><button key={l} aria-pressed={language===l} onClick={()=>{setLanguage(l);setOpen(false)}}>{l.toUpperCase()}</button>)}</div>;
 const label=language==='fr'?'Mon devis gratuit':language==='en'?'Get a free quote':'عرض سعر مجاني';
 return <header className="site-header"><div className="site-container header-inner"><a href="#home" className="brand-logo" aria-label="MOVINGO"><Image src="/movingo-logo-transparent.png" alt="MOVINGO — Déménagement & Transport" width={1774} height={887} sizes="150px" priority/></a><nav className="desktop-nav" aria-label={t.nav.home}>{links.map(link=><a key={link.href} href={link.href}>{link.name}</a>)}</nav><div className="desktop-actions">{langButtons}<a href="#quote" className="button-small">{label}<ArrowUpRight size={16}/></a></div><button className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open?'Fermer le menu':'Ouvrir le menu'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>{open&&<nav id="mobile-nav" className="mobile-nav">{links.map(link=><a key={link.href} href={link.href} onClick={()=>setOpen(false)}>{link.name}</a>)}<a href="#quote" onClick={()=>setOpen(false)}>{label}</a>{langButtons}</nav>}{!reduced&&<motion.div className="scroll-progress" style={{scaleX:scrollYProgress}}/>}</header>;
}

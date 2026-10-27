import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/i18n';

export default function FloatingWhatsApp() {
  const { language } = useLanguage();
  const t = translations[language];
  const whatsappUrl = `https://wa.me/21624190486?text=${encodeURIComponent(t.quote.whatsappPrefilledMsg)}`;
  const label = language === 'fr' ? 'Contacter MOVINGO sur WhatsApp' : language === 'ar' ? 'تواصلوا مع موفينجو عبر واتساب' : 'Contact MOVINGO on WhatsApp';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float group"
      aria-label={label}
    >
      <MessageCircle size={23} />
      {/* Optional tooltip */}
      <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-bold py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
        Besoin d&apos;aide ?
      </span>
    </a>
  );
}

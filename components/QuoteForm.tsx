"use client";

import React, { useState } from 'react';
import { Send, MessageCircle, AlertCircle, CheckCircle2, PhoneCall, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { furnitureServices, roomOptions, roomLabel } from '@/lib/quote-options';
import { motion } from 'motion/react';

export default function QuoteForm({ t }: { t: any }) {
  const { dir, language } = useLanguage();
  const copy = {
    fr: { label: 'DEVIS DE DÉMÉNAGEMENT', title: 'Votre demande', accent: 'de devis.', intro: 'Indiquez les détails du déménagement pour recevoir une estimation adaptée aux prestations souhaitées.', note: 'Devis gratuit et sans engagement. Nous vous contacterons pour préciser votre demande.', help: 'Vous préférez un échange direct ?', phoneLabel: 'Appeler MOVINGO au +216 24 190 486', privacy: 'Vos informations servent uniquement à vous recontacter au sujet de votre demande.' },
    en: { label: 'MOVING QUOTE', title: 'Request a quote', accent: 'for your move.', intro: 'Share a few details so we can estimate the services you need.', note: 'Free and without obligation. We’ll contact you to confirm your request.', help: 'Prefer to speak with us?', phoneLabel: 'Call MOVINGO at +216 24 190 486', privacy: 'Your details are used only to follow up on your request.' },
    ar: { label: 'عرض سعر للنقل', title: 'طلبكم', accent: 'لعرض السعر.', intro: 'أدخلوا تفاصيل عملية النقل للحصول على تقدير مناسب للخدمات المطلوبة.', note: 'عرض سعر مجاني ودون التزام. سنتصل بكم لتأكيد التفاصيل.', help: 'تفضلون التواصل مباشرة؟', phoneLabel: 'اتصلوا بموفينجو على الرقم +216 24 190 486', privacy: 'نستخدم معلوماتكم للرد على طلبكم فقط.' }
  }[language];
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    departure: '',
    arrival: '',
    type: t.quote.typeOptions[0],
    rooms: '',
    furnitureService: '',
    date: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Here you would integrate with your serverless function
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      
      setStatus('success');
      setFormData({
        name: '', phone: '', departure: '', arrival: '', type: t.quote.typeOptions[0], date: '', rooms: '', furnitureService: '', message: ''
      });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const buildWhatsappFallbackUrl = () => {
    const text = `Nouvelle demande de déménagement\n\nNom: ${formData.name}\nTéléphone: ${formData.phone}\nDépart: ${formData.departure}\nArrivée: ${formData.arrival}\nType: ${formData.type}\nLogement: ${roomLabel(formData.rooms)}\nMontage / démontage: ${furnitureServices[formData.furnitureService as keyof typeof furnitureServices] || ""}\nDate: ${formData.date}\nMessage: ${formData.message}`;
    return `https://wa.me/21624190486?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="quote" className="quote-section section-space">
      <div className="site-container quote-layout" dir={dir}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="quote-intro"
        >
          <p className="eyebrow">{copy.label}</p><h2>{copy.title}<br/><em>{copy.accent}</em></h2><p className="section-intro">{copy.intro}</p><p className="quote-note">{copy.note}</p><div className="quote-help"><span>{copy.help}</span><a className="quote-call-button" href="tel:+21624190486" dir="ltr" aria-label={copy.phoneLabel}><PhoneCall size={16}/>24 190 486<ArrowUpRight size={15}/></a></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="quote-panel"
        >
          
          {status === 'success' ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-[#1F2933] mb-4">Succès !</h3>
              <p className="text-lg text-gray-600">{t.quote.success}</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 px-6 py-3 bg-gray-100 text-[#1F2933] font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Nouvelle demande
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6"><h3 className="form-title">{t.quote.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="quote-name" className="block text-sm font-bold text-gray-700 mb-2">{t.quote.name}</label>
                  <input 
                    type="text" required id="quote-name" name="name" value={formData.name} onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none transition-all" 
                    placeholder={t.quote.namePlaceholder} 
                  />
                </div>
                <div>
                  <label htmlFor="quote-phone" className="block text-sm font-bold text-gray-700 mb-2">{t.quote.phone}</label>
                  <input 
                    type="tel" required id="quote-phone" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none transition-all" 
                    placeholder={t.quote.phonePlaceholder} 
                    dir="ltr"
                  />
                </div>
                <div>
                  <label htmlFor="quote-departure" className="block text-sm font-bold text-gray-700 mb-2">{t.quote.departure}</label>
                  <input 
                    type="text" required id="quote-departure" name="departure" value={formData.departure} onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none transition-all" 
                    placeholder={t.quote.departurePlaceholder} 
                  />
                </div>
                <div>
                  <label htmlFor="quote-arrival" className="block text-sm font-bold text-gray-700 mb-2">{t.quote.arrival}</label>
                  <input 
                    type="text" required id="quote-arrival" name="arrival" value={formData.arrival} onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none transition-all" 
                    placeholder={t.quote.arrivalPlaceholder} 
                  />
                </div>
                <div>
                  <label htmlFor="quote-type" className="block text-sm font-bold text-gray-700 mb-2">{t.quote.type}</label>
                  <select 
                    required id="quote-type" name="type" value={formData.type} onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none transition-all bg-white"
                  >
                    {t.quote.typeOptions.map((opt: string) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="quote-date" className="block text-sm font-bold text-gray-700 mb-2">{t.quote.date}</label>
                  <input 
                    type="date" required id="quote-date" name="date" value={formData.date} onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label htmlFor="quote-rooms" className="block text-sm font-bold text-gray-700 mb-2">{t.quote.rooms}</label>
                  <select id="quote-rooms" required name="rooms" value={formData.rooms} onChange={handleChange} aria-describedby="quote-rooms-hint"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none transition-all bg-white">
                    <option value="" disabled>{t.quote.selectPlaceholder}</option>
                    {roomOptions.map(value => <option key={value} value={value}>{value === 'other' ? t.quote.otherRooms : value === 'not-applicable' ? t.quote.notApplicable : value}</option>)}
                  </select>
                  <p id="quote-rooms-hint" className="mt-2 text-sm text-gray-500">{t.quote.roomsHint}</p>
                </div>
                <div>
                  <label htmlFor="quote-furniture" className="block text-sm font-bold text-gray-700 mb-2">{t.quote.furnitureService}</label>
                  <select id="quote-furniture" required name="furnitureService" value={formData.furnitureService} onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none transition-all bg-white">
                    <option value="" disabled>{t.quote.selectPlaceholder}</option>
                    {Object.keys(furnitureServices).map(value => <option key={value} value={value}>{t.quote.furnitureOptions[value]}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="quote-message" className="block text-sm font-bold text-gray-700 mb-2">{t.quote.message}</label>
                <textarea 
                  rows={4} id="quote-message" name="message" value={formData.message} onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none transition-all resize-none" 
                  placeholder={t.quote.messagePlaceholder} 
                ></textarea>
              </div>

              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="p-4 bg-red-50 border-l-4 border-[#E30613] rounded-r-xl"
                >
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-[#E30613] mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-red-800 font-medium">{t.quote.error}</p>
                      <a 
                        href={buildWhatsappFallbackUrl()} 
                        target="_blank" rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-sm font-bold text-[#25D366] hover:underline"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {t.quote.whatsappFallback}
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-10 py-4 bg-[#E30613] text-white font-bold rounded-xl hover:bg-[#c20510] transition-colors shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className={dir === 'rtl' ? 'ml-2 w-5 h-5' : 'mr-2 w-5 h-5'} />
                    {t.quote.submit}
                  </>
                )}
              </button>
              <p className="form-privacy">{copy.privacy}</p>
            </form>
          )}

        </motion.div>
      </div>
    </section>
  );
}

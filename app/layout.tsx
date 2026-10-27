import type {Metadata} from 'next';
import { LanguageProvider } from '@/lib/LanguageContext';
import './globals.css';


export const metadata: Metadata = {
  title: 'Movingo | Déménagement professionnel en Tunisie',
  description: 'Movingo propose des services de déménagement, transport, montage, démontage et installation partout en Tunisie. Contact rapide par WhatsApp.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`bg-white text-gray-900 font-sans`} suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

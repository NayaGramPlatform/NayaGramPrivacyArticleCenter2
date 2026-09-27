import React, { useState } from 'react';
import { PrivacyContent, Language } from '../types/privacy';
import { Mail, Copy, Check, ExternalLink, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import { NGLogo } from './NGLogo';

// High-fidelity Real Brand SVGs
const TelegramIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"
      fill="currentColor"
    />
  </svg>
);

const YouTubeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface SocialDockProps {
  content: PrivacyContent;
  language: Language;
  onCopyEmail: (email: string) => void;
}

export const SocialDock: React.FC<SocialDockProps> = ({
  content,
  language,
  onCopyEmail,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('support.nayagram@gmail.com');
    setCopied(true);
    onCopyEmail('support.nayagram@gmail.com');
    setTimeout(() => setCopied(false), 2200);
  };

  const socialChannels = [
    {
      name: 'Telegram',
      handle: '@NayaGramPro',
      url: 'https://t.me/NayaGramPro',
      icon: TelegramIcon,
      badge: language === 'bn' ? 'অফিশিয়াল চ্যানেল' : 'Official Channel',
      cta: language === 'bn' ? 'যুক্ত হোন' : 'Join Channel',
      bgGradient: 'from-sky-500 to-blue-600',
      shadowColor: 'hover:shadow-sky-500/30',
      badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
      textColor: 'group-hover:text-sky-600',
      iconBg: 'bg-gradient-to-tr from-sky-500 to-blue-500 text-white',
      borderHover: 'hover:border-sky-400',
    },
    {
      name: 'YouTube',
      handle: '@NayaGramPro',
      url: 'https://www.youtube.com/@NayaGramPro',
      icon: YouTubeIcon,
      badge: language === 'bn' ? 'ভিডিও গাইড' : 'Video Guides',
      cta: language === 'bn' ? 'সাবস্ক্রাইব' : 'Subscribe',
      bgGradient: 'from-red-600 to-rose-700',
      shadowColor: 'hover:shadow-red-500/30',
      badgeBg: 'bg-red-100 text-red-800 border-red-200',
      textColor: 'group-hover:text-red-600',
      iconBg: 'bg-gradient-to-tr from-red-600 to-rose-600 text-white',
      borderHover: 'hover:border-red-400',
    },
    {
      name: 'Facebook',
      handle: 'NayaGramPro',
      url: 'https://facebook.com/NayaGramPro',
      icon: FacebookIcon,
      badge: language === 'bn' ? 'কমিউনিটি পেজ' : 'Community Page',
      cta: language === 'bn' ? 'ফলো করুন' : 'Follow Page',
      bgGradient: 'from-blue-600 to-indigo-700',
      shadowColor: 'hover:shadow-blue-500/30',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
      textColor: 'group-hover:text-blue-600',
      iconBg: 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white',
      borderHover: 'hover:border-blue-400',
    },
    {
      name: 'X (Twitter)',
      handle: '@NayaGramPro',
      url: 'https://x.com/NayaGramPro',
      icon: XIcon,
      badge: language === 'bn' ? 'লাইভ আপডেট' : 'Live Updates',
      cta: language === 'bn' ? 'ফলো করুন' : 'Follow on X',
      bgGradient: 'from-slate-900 to-zinc-900',
      shadowColor: 'hover:shadow-slate-900/30',
      badgeBg: 'bg-slate-200 text-slate-800 border-slate-300',
      textColor: 'group-hover:text-slate-950',
      iconBg: 'bg-gradient-to-tr from-slate-900 to-zinc-800 text-white',
      borderHover: 'hover:border-slate-500',
    },
  ];

  return (
    <footer className="mt-20 border-t border-slate-200/90 bg-gradient-to-b from-white via-slate-50/60 to-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Social Section Showcase Card with Glassmorphic Elegance */}
        <div className="relative overflow-hidden rounded-3xl border border-sky-100 bg-white/90 backdrop-blur-md p-6 sm:p-10 mb-12 shadow-xl shadow-slate-200/50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-100/50 to-transparent rounded-full blur-2xl pointer-events-none -z-0" />

          <div className="relative z-10 max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-xs font-bold text-sky-800 uppercase tracking-widest mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>{content.footer.officialChannels}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-serif tracking-tight">
              {language === 'bn'
                ? 'NayaGram অফিশিয়াল প্ল্যাটফর্ম ও সামাজিক যোগাযোগ'
                : 'Connect with NayaGram Official Channels'}
            </h3>
            <p className="text-sm sm:text-base font-semibold text-slate-700 mt-2">
              {language === 'bn'
                ? 'সরাসরি প্রোটোকল আপডেট, নিরাপত্তা বুলেটিন ও কমিউনিটি সহায়তার জন্য আমাদের নির্ভরযোগ্য অফিসিয়াল চ্যানেলে যুক্ত থাকুন।'
                : 'Follow our verified official channels for real-time protocol updates, security announcements, and community support.'}
            </p>
          </div>

          {/* Social Channels 3D Floating Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {socialChannels.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200/90 shadow-md ${item.shadowColor} ${item.borderHover} transition-all duration-300 hover:-translate-y-1.5 overflow-hidden`}
                >
                  {/* Subtle top brand line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.bgGradient} opacity-90 group-hover:h-1.5 transition-all`} />

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className={`p-3 rounded-xl ${item.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${item.badgeBg}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className={`text-lg font-bold text-slate-900 ${item.textColor} transition-colors flex items-center justify-between`}>
                      <span>{item.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-inherit group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h4>
                    <span className="text-xs font-mono font-bold text-slate-700 block mt-0.5">
                      {item.handle}
                    </span>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-700 group-hover:underline">
                        {item.cta}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-colors" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Official Email Communication Box (Ultra-Clear High Contrast) */}
          <div className="relative z-10 p-5 sm:p-6 bg-gradient-to-r from-sky-50/90 via-white to-blue-50/90 rounded-2xl border border-sky-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-sky-600 text-white shadow-md shadow-sky-500/25 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  {content.footer.supportEmailLabel}
                </span>
                <a
                  href="mailto:support.nayagram@gmail.com"
                  className="text-base sm:text-lg font-bold text-slate-950 hover:text-sky-700 transition-colors font-mono tracking-tight"
                >
                  support.nayagram@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 hover:border-slate-400 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span className="text-emerald-700 font-bold">
                      {language === 'bn' ? 'ইমেইল কপি হয়েছে!' : 'Email Copied!'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-600" />
                    <span>{language === 'bn' ? 'ইমেইল কপি করুন' : 'Copy Email Address'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar with Copyright & Verified Legal Status */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <NGLogo size={28} className="ring-2 ring-sky-200 rounded-full" />
            <span className="font-serif font-extrabold text-slate-950 text-sm">
              𝐍𝐚𝐲𝐚𝐆𝐫𝐚𝐦 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦
            </span>
            <span className="hidden sm:inline text-slate-400" aria-hidden="true">·</span>
            <span className="font-semibold text-slate-700">{content.footer.copyright}</span>
          </div>

          <p className="text-center md:text-right font-medium text-slate-600 max-w-md">
            {content.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

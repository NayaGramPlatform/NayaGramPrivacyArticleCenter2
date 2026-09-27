import React, { useState } from 'react';
import { Language } from '../types/privacy';
import { Globe, Share2, Printer, Menu, X, ShieldCheck, Copy, Check } from 'lucide-react';
import { NGLogo } from './NGLogo';

interface HeaderProps {
  language: Language;
  onLanguageToggle: (lang: Language) => void;
  onShareClick: () => void;
  onPrintClick: () => void;
  onNGStudioClick: () => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  readingProgress: number;
  onCopyPlayConsoleUrl?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageToggle,
  onShareClick,
  onPrintClick,
  onNGStudioClick,
  isMobileMenuOpen,
  onMobileMenuToggle,
  readingProgress,
  onCopyPlayConsoleUrl,
}) => {
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Hidden secret trigger: Click logo 5 times to open owner developer console
  const handleSecretLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (newCount >= 5) {
      setLogoClickCount(0);
      onNGStudioClick();
    }
  };

  const handleCopyUrl = () => {
    const url =
      typeof window !== 'undefined' && window.location.origin.includes('run.app')
        ? `${window.location.origin}/`
        : 'https://ais-pre-yesolrlvqlblrralsmt77y-639597377161.asia-southeast1.run.app/';
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    if (onCopyPlayConsoleUrl) onCopyPlayConsoleUrl();
    setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Dynamic Reading Progress Hairline */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 transition-all duration-150 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, readingProgress))}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark with official logo & secret owner trigger */}
        <div
          onClick={handleSecretLogoClick}
          className="cursor-pointer text-lg sm:text-xl font-bold tracking-tight text-slate-900 hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 select-none"
          title="NayaGram Platform (Click 5x for Developer Mode)"
        >
          <NGLogo className="w-8 h-8 drop-shadow-sm hover:scale-105 transition-transform" />
          <span className="font-serif tracking-normal text-slate-950 font-extrabold">
            𝐍𝐚𝐲𝐚𝐆𝐫𝐚𝐦 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦
          </span>
        </div>

        {/* Zone 2: Navigation Links (hidden on smaller viewports) with Bolder High-Contrast Typography */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-700">
          <a href="#welcome" className="hover:text-sky-600 transition-colors">
            {language === 'bn' ? 'সংক্ষিপ্তসার' : 'Overview'}
          </a>
          <a href="#architecture" className="hover:text-sky-600 transition-colors">
            {language === 'bn' ? 'আর্কিটেকচার' : 'Architecture'}
          </a>
          <a href="#data-not-collected" className="hover:text-sky-600 transition-colors">
            {language === 'bn' ? 'জিরো ডেটা' : 'Zero Data'}
          </a>
          <a href="#local-storage" className="hover:text-sky-600 transition-colors">
            {language === 'bn' ? 'লোকাল স্টোরেজ' : 'Sandbox'}
          </a>
          <a href="#regulatory-compliance" className="hover:text-sky-600 transition-colors">
            {language === 'bn' ? 'নীতিমালা' : 'Compliance'}
          </a>
          <a href="#contact-inquiries" className="hover:text-sky-600 transition-colors">
            {language === 'bn' ? 'যোগাযোগ' : 'Contact'}
          </a>
        </nav>

        {/* Zone 3: Primary Actions (Clean, Store-Ready, Quick-Copy URL) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Subtle Google Play Store URL Copy Action */}
          <button
            onClick={handleCopyUrl}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            title="Copy Official Google Play Store Privacy URL"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'bn' ? 'প্লে লিংক' : 'Play URL'}</span>
                <Copy className="w-3 h-3 text-emerald-600" />
              </>
            )}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-300">
            <button
              onClick={() => onLanguageToggle('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => onLanguageToggle('bn')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                language === 'bn'
                  ? 'bg-white text-sky-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="বাংলা"
            >
              বাংলা
            </button>
          </div>

          {/* Share Button */}
          <button
            onClick={onShareClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-950 rounded-lg transition-colors shadow-xs cursor-pointer"
            title="Share Policy"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline">{language === 'bn' ? 'শেয়ার' : 'Share'}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={onPrintClick}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-950 rounded-lg transition-colors shadow-xs cursor-pointer"
            title="Print Policy"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>{language === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Drawer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

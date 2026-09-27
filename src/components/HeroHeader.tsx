import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PrivacyContent } from '../types/privacy';
import { ShieldCheck, Calendar, Search, Sparkles, Send, Radio, Globe, Copy, Check } from 'lucide-react';
import { NGLogo } from './NGLogo';
import heroBannerImage from '../assets/images/nayagram_privacy_banner_1790444227770.jpg';

interface HeroHeaderProps {
  content: PrivacyContent;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  language: 'en' | 'bn';
  onCopyPlayConsoleUrl?: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  content,
  searchQuery,
  onSearchChange,
  language,
  onCopyPlayConsoleUrl,
}) => {
  const [imageError, setImageError] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyUrl = () => {
    const url =
      typeof window !== 'undefined' && window.location.origin.includes('run.app')
        ? `${window.location.origin}/`
        : 'https://ais-pre-yesolrlvqlblrralsmt77y-639597377161.asia-southeast1.run.app/';
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    if (onCopyPlayConsoleUrl) onCopyPlayConsoleUrl();
    setTimeout(() => setCopiedUrl(false), 2200);
  };

  return (
    <div id="welcome" className="relative pt-10 pb-12 overflow-hidden">
      {/* Dynamic ambient multi-color gradient glow mesh (Sky, Indigo, Emerald) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-200/50 via-indigo-100/30 to-transparent -z-10 blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        {/* Prominent Official Logo with Multi-Color Aura */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-6"
        >
          <div className="relative group">
            <div className="absolute -inset-3.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 animate-pulse" />
            <NGLogo size={104} className="relative z-10 transform transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl ring-4 ring-white" />
          </div>
        </motion.div>

        {/* Step 1: Subtitle at the very top of landing frame */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-100 via-indigo-50 to-emerald-50 border border-sky-300 text-xs font-extrabold tracking-widest text-sky-950 uppercase font-sans mb-4 shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-sky-700" />
          <span>{content.header.welcomeSubtitle}</span>
        </motion.div>

        {/* Step 2: Main title BIG with Royal Sapphire & Cyber Cyan Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight font-serif mb-3 drop-shadow-sm bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-700 bg-clip-text text-transparent"
        >
          {content.header.mainTitle}
        </motion.h1>

        {/* Tagline: The world of privacy with Vivid Emerald, Teal & Sky Colors */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-2xl sm:text-4xl font-serif font-extrabold tracking-wide mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent drop-shadow-xs"
        >
          {content.header.tagline}
        </motion.h2>

        {/* Telegram Client App Identity Pill with Clean Subtle Copy Action */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-50 border border-sky-200 rounded-full text-xs font-extrabold text-sky-950 shadow-xs">
            <Send className="w-3.5 h-3.5 text-sky-700" />
            <span>{language === 'bn' ? 'অফিশিয়াল Telegram MTProto ক্লায়েন্ট' : 'Official Telegram MTProto 2.0 Client App'}</span>
          </div>

          <button
            onClick={handleCopyUrl}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-full text-xs font-extrabold text-emerald-950 transition-all shadow-xs cursor-pointer active:scale-95"
            title="Copy Official Google Play Console Policy URL"
          >
            {copiedUrl ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                <span className="text-emerald-800 font-extrabold">{language === 'bn' ? 'লিংক কপি হয়েছে!' : 'URL Copied!'}</span>
              </>
            ) : (
              <>
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'bn' ? 'প্লে কনসোল পলিসি লিংক কপি করুন' : 'Copy Play Store Policy URL'}</span>
                <Copy className="w-3 h-3 text-emerald-600 ml-0.5" />
              </>
            )}
          </button>
        </motion.div>

        {/* Clean unboxed metadata with bold, readable typographic separators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-700 mb-8"
        >
          <span className="flex items-center gap-1.5 text-slate-900 font-extrabold">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse inline" />
            {content.header.quickStats.zeroData}
          </span>
          <span aria-hidden="true" className="text-slate-400 font-bold">·</span>
          <span className="flex items-center gap-1.5 text-slate-800">
            <Calendar className="w-3.5 h-3.5 text-slate-600" />
            <span>{language === 'bn' ? 'কার্যকর তারিখ:' : 'Effective:'}</span>
            <span className="text-slate-950 font-bold">{content.header.effectiveDate}</span>
          </span>
          <span aria-hidden="true" className="text-slate-400 font-bold">·</span>
          <span className="font-mono text-slate-800 font-bold bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-300">
            {language === 'bn' ? 'ভার্সন:' : 'Version:'} 2026.9
          </span>
        </motion.div>

        {/* Search Bar for immediate exploration */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-xl mx-auto mb-10"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 rounded-2xl blur-xs opacity-30 group-focus-within:opacity-60 transition-opacity" />
            <div className="relative bg-white rounded-xl shadow-sm border border-slate-300">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={content.header.searchPlaceholder}
                className="w-full pl-11 pr-14 py-3.5 bg-transparent rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-500 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600 hover:text-slate-900 px-2 py-0.5 rounded bg-slate-100 font-bold cursor-pointer"
                >
                  {language === 'bn' ? 'মুছুন' : 'Clear'}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* International-Grade Banner Card with Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/60 mb-8 group"
        >
          {!imageError ? (
            <div className="relative aspect-[16/7] w-full bg-slate-100 overflow-hidden">
              <img
                src={heroBannerImage}
                alt="NayaGram Platform Telegram Client Privacy Architecture"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.015] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Bottom text overlay on banner */}
              <div className="absolute bottom-5 left-6 right-6 text-left flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono font-extrabold tracking-wider uppercase text-emerald-300">
                      {language === 'bn' ? 'আর্কিটেকচারাল নিশ্চয়তা' : 'Architectural Promise'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight drop-shadow-sm">
                    {language === 'bn' ? 'জিরো-নলেজ সুরক্ষিত টেলিগ্রাম মেসেজিং' : 'Zero-Knowledge Client Telegram Architecture'}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 max-w-lg mt-1 line-clamp-2">
                    {language === 'bn'
                      ? 'সমস্ত চ্যাট, সেশন ও মিডিয়া সরাসরি অফিসিয়াল টেলিগ্রাম সার্ভারের সাথে সংযোগ স্থাপন করে; কোনো মধ্যবর্তী সার্ভার নেই।'
                      : 'All communication and cryptographic keys remain on-device, communicating directly with official Telegram MTProto infrastructure.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="px-3.5 py-1.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-300 stroke-[2.5]" />
                    <span>Audited & Verified</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50">
              <ShieldCheck className="w-12 h-12 text-sky-600 mx-auto mb-2" />
              <h3 className="font-serif font-bold text-slate-800 text-lg">
                {language === 'bn' ? 'জিরো-নলেজ সুরক্ষিত টেলিগ্রাম মেসেজিং' : 'Zero-Knowledge Client Telegram Architecture'}
              </h3>
              <p className="text-xs font-semibold text-slate-600 mt-1 max-w-md mx-auto">
                {language === 'bn'
                  ? 'সমস্ত চ্যাট ও সেশন সরাসরি টেলিগ্রাম সার্ভারের সাথে সংযুক্ত।'
                  : 'Direct client-to-server connection with no intermediaries.'}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Copy, Check, ShieldCheck, CheckCircle2, Globe, ExternalLink, Lock, FileText, Sparkles, Building2, Mail } from 'lucide-react';
import { Language } from '../types/privacy';
import { NGLogo } from './NGLogo';

interface PlayConsoleUrlBoxProps {
  language: Language;
  onCopied: () => void;
}

export const PlayConsoleUrlBox: React.FC<PlayConsoleUrlBoxProps> = ({ language, onCopied }) => {
  const [copied, setCopied] = useState(false);

  // Canonical public live URL for Google Play Console submission
  const playConsoleUrl =
    typeof window !== 'undefined' && window.location.origin.includes('run.app')
      ? `${window.location.origin}/`
      : 'https://ais-pre-yesolrlvqlblrralsmt77y-639597377161.asia-southeast1.run.app/';

  const handleCopy = () => {
    navigator.clipboard.writeText(playConsoleUrl);
    setCopied(true);
    onCopied();
    setTimeout(() => setCopied(false), 2600);
  };

  return (
    <section
      id="play-console-url"
      aria-label="Google Play Console Official Compliance URL"
      className="scroll-mt-24 mb-10 relative overflow-hidden rounded-2xl border border-sky-200/90 bg-white text-slate-900 shadow-lg shadow-sky-500/5 transition-all"
    >
      {/* Top Hairline Brand Accent Gradient */}
      <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500" />

      {/* Subtle ambient soft background glow for modern light theme */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-100/60 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="p-6 sm:p-8 relative z-10">
        {/* Header row: Real NayaGram logo + Google Play Compliance Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <NGLogo className="w-12 h-12 shadow-sm ring-2 ring-sky-100 rounded-full" />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white shadow-xs">
                <ShieldCheck className="w-3 h-3 stroke-[3]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Google Play Policy Ready
                </span>
                <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-sky-600" />
                  MTProto 2.0 Encrypted
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-950 mt-1">
                {language === 'bn'
                  ? 'গুগল প্লে কনসোল অফিসিয়াল প্রাইভেসি পলিসি লিংক'
                  : 'Official Google Play Console Privacy Policy URL'}
              </h3>
            </div>
          </div>

          <div className="self-start md:self-auto inline-flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2">
            <Building2 className="w-4 h-4 text-sky-600 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                {language === 'bn' ? 'প্লে কনসোল লোকেশন' : 'Play Console Location'}
              </span>
              <span className="font-medium text-slate-800">
                Policy &gt; App Content &gt; Privacy Policy
              </span>
            </div>
          </div>
        </div>

        {/* Clean URL Submission Box with 1-Click Copy Button */}
        <div className="bg-slate-50/90 border border-slate-200 rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs mb-6">
          <div className="flex items-center gap-2.5 px-2 overflow-x-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 ring-4 ring-emerald-100" />
            <code className="text-xs sm:text-sm font-mono text-sky-950 font-semibold select-all whitespace-nowrap">
              {playConsoleUrl}
            </code>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-400'
                  : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sky-500/20 active:scale-[0.98]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{language === 'bn' ? 'লিংক কপি হয়েছে!' : 'URL Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{language === 'bn' ? 'প্লে কনসোল লিংক কপি করুন' : 'Copy Play Console URL'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Official Google Play Store & Regulatory Audit Verification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-3 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">HTTPS Public Live</span>
              <span className="text-[11px] text-slate-500 leading-tight block">
                {language === 'bn' ? 'গুগল সার্ভারে ২৪/৭ সরাসরি অ্যাক্সেসিবল' : 'Direct public access with zero login wall'}
              </span>
            </div>
          </div>

          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Zero Data Collection</span>
              <span className="text-[11px] text-slate-500 leading-tight block">
                {language === 'bn' ? 'কোনো গোপন ট্র্যাকার বা থার্ড-পার্টি বিজ্ঞাপন নেই' : 'No telemetry SDKs or analytics trackers'}
              </span>
            </div>
          </div>

          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Account Deletion</span>
              <span className="text-[11px] text-slate-500 leading-tight block">
                {language === 'bn' ? '১ ক্লিকে অ্যাকাউন্ট মোছার স্বচ্ছ পদ্ধতি' : 'Full compliance with Play Store deletion policy'}
              </span>
            </div>
          </div>

          <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">COPPA & GDPR Article 13</span>
              <span className="text-[11px] text-slate-500 leading-tight block">
                {language === 'bn' ? 'শিশু সুরক্ষা ও আন্তর্জাতিক আইন সঙ্গত' : 'Rigorous international legal privacy standards'}
              </span>
            </div>
          </div>
        </div>

        {/* Official Publisher & Reviewer Transparency Note */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">
              {language === 'bn' ? 'অফিসিয়াল পাবলিশার:' : 'Verified Publisher:'}
            </span>
            <span className="font-mono text-slate-900 font-bold">NayaGram Platform</span>
            <span className="text-slate-300">·</span>
            <span className="font-mono text-slate-600">ID: nayagram.hq@gmail.com</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600">
            <Mail className="w-3.5 h-3.5 text-sky-600" />
            <span>Support: support.nayagram@gmail.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types/privacy';
import { ShieldCheck, Lock, EyeOff, Trash2, ArrowRight, Zap, CheckCircle2, ServerOff, Sparkles } from 'lucide-react';

interface MetaStylePillarsProps {
  language: Language;
  onNavigateSection: (sectionId: string) => void;
}

export const MetaStylePillars: React.FC<MetaStylePillarsProps> = ({
  language,
  onNavigateSection,
}) => {
  const pillars = [
    {
      id: 'architecture',
      title: language === 'bn' ? 'সরাসরি প্রোটোকল সংযোগ' : 'Direct MTProto Connection',
      subtitle: language === 'bn' ? 'জিরো ইন্টারমিডিয়ারি সার্ভার' : 'Zero Intermediary Relays',
      desc:
        language === 'bn'
          ? 'আপনার সমস্ত বার্তা, কল ও ফাইল হ্যান্ডসেট থেকে সরাসরি অফিসিয়াল টেলিগ্রাম ক্লাউডে পৌঁছায়। কোনো মধ্যবর্তী প্রক্সি বা লিসেনিং সার্ভার নেই।'
          : 'All communications transmit directly between your device and official Telegram datacenters. Zero middleman proxies or interceptors.',
      icon: Zap,
      accent: 'from-blue-600 to-sky-500',
      badge: language === 'bn' ? 'পিলার ০১' : 'Pillar 01',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      glow: 'group-hover:shadow-blue-500/20',
      borderHover: 'hover:border-blue-400',
      metric: '0 Middleman Servers',
    },
    {
      id: 'data-not-collected',
      title: language === 'bn' ? 'জিরো ট্র্যাকিং ও ডেটা মিনিমাইজেশন' : 'Zero Tracking Guarantee',
      subtitle: language === 'bn' ? 'কোনো বিজ্ঞাপন বা অ্যানালিটিক্স নেই' : 'No Advertising or Telemetry',
      desc:
        language === 'bn'
          ? 'আমরা বিশ্বাস করি: যা আমাদের কাছে নেই, তা কখনো ফাঁস হতে পারে না। কোনো ব্যাকগ্রাউন্ড ট্র্যাকার, মেটাডেটা হারভেস্টিং বা নজরদারি কোড নেই।'
          : 'What does not exist cannot be compromised. NayaGram embeds zero background telemetry SDKs, ad trackers, or behavioral profiling.',
      icon: EyeOff,
      accent: 'from-emerald-600 to-teal-500',
      badge: language === 'bn' ? 'পিলার ০২' : 'Pillar 02',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      glow: 'group-hover:shadow-emerald-500/20',
      borderHover: 'hover:border-emerald-400',
      metric: '0 Trackers Embedded',
    },
    {
      id: 'account-deletion',
      title: language === 'bn' ? 'ব্যবহারকারীর পূর্ণ নিয়ন্ত্রণ ও মুছে ফেলা' : 'Sovereign Control & Erasure',
      subtitle: language === 'bn' ? '১ ক্লিকে ক্যাশে ও একাউন্ট ধ্বংস' : '1-Click Complete Erasure',
      desc:
        language === 'bn'
          ? 'লগআউট বা আনইনস্টল করলেই ফোনের স্যান্ডবক্স থেকে সমস্ত সেশন কি সম্পূর্ণ ধ্বংস হয়ে যায়। এছাড়া টেলিগ্রামের ভেতর থেকে একাউন্ট অটো-ডিলিট সম্ভব।'
          : 'Instant right to erasure. Logging out wipes all cryptographic keys and local cache immediately. Self-destruct auto-delete timer supported.',
      icon: Trash2,
      accent: 'from-rose-600 to-pink-500',
      badge: language === 'bn' ? 'পিলার ০৩' : 'Pillar 03',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
      glow: 'group-hover:shadow-rose-500/20',
      borderHover: 'hover:border-rose-400',
      metric: '100% On-Device Sandbox',
    },
  ];

  return (
    <section aria-label="Core Privacy Architecture Pillars" className="mb-12 max-w-7xl mx-auto">
      {/* Meta/Apple Privacy Center Header Kicker */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-extrabold text-indigo-900 uppercase tracking-widest mb-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{language === 'bn' ? 'প্রাইভেসি আর্কিটেকচার ফ্রেমওয়ার্ক' : 'Enterprise Privacy Architecture'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-slate-950">
            {language === 'bn'
              ? 'NayaGram-এর ৩টি মূল গোপনীয়তা স্তম্ভ'
              : 'Our 3 Core Architectural Pillars'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-md">
          {language === 'bn'
            ? 'আন্তর্জাতিক টেক প্ল্যাটফর্মগুলোর সমকক্ষ সর্বোচ্চ স্বচ্ছতা ও আধুনিক সুরক্ষাব্যবস্থা।'
            : 'Engineered in compliance with strict international user-data minimization standards.'}
        </p>
      </div>

      {/* 3 Prominent Multi-Color Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pillars.map((pillar, pIdx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: pIdx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => onNavigateSection(pillar.id)}
              className={`group relative bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl ${pillar.glow} ${pillar.borderHover} transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden`}
            >
              {/* Top Accent Gradient Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pillar.accent}`} />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-tr ${pillar.accent} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className={`text-[11px] font-mono font-extrabold px-3 py-1 rounded-full border shadow-2xs ${pillar.badgeColor}`}>
                    {pillar.badge}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 font-serif group-hover:text-sky-700 transition-colors mt-0.5">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed mt-2.5">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {pillar.metric}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-sky-700 group-hover:translate-x-1 transition-transform">
                  <span>{language === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore'}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PrivacySection } from '../types/privacy';
import { Check, Info, ChevronDown, Clock, Sparkles } from 'lucide-react';
import { getSectionIcon, getSectionTheme } from '../utils/sectionIcons';

interface ArticleCardProps {
  section: PrivacySection;
  index: number;
  fontSize: 'normal' | 'large' | 'xLarge';
  language: 'en' | 'bn';
  progress: number; // 0 to 100
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isActive: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  section,
  index,
  fontSize,
  language,
  progress = 0,
  isCollapsed,
  onToggleCollapse,
  isActive,
}) => {
  const fontClass =
    fontSize === 'xLarge'
      ? 'text-lg leading-relaxed'
      : fontSize === 'large'
      ? 'text-base leading-relaxed'
      : 'text-sm leading-relaxed';

  // Helper to sanitize any raw formatting tokens that might leak
  const cleanText = (text: string) => {
    return text.replace(/__+/g, '').replace(/~~/g, '').trim();
  };

  const SectionIcon = getSectionIcon(section.id);
  const theme = getSectionTheme(section.id);
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));
  const isCompleted = clampedProgress >= 95;

  // Dynamic estimated 'minutes to read' calculation based on depth of content
  const totalWords = [
    section.title,
    section.summary,
    ...section.content,
    ...(section.keyHighlights?.map(h => `${h.label} ${h.description}`) || []),
    ...(section.technicalDetails?.map(t => `${t.label} ${t.value}`) || []),
    section.securityNote || '',
  ].join(' ').split(/\s+/).filter(Boolean).length;

  const estimatedMinutes = Math.max(1, Math.round(totalWords / 160));
  const readTimeText =
    language === 'bn'
      ? `${estimatedMinutes} মিনিট পাঠ`
      : `${estimatedMinutes} min read`;

  // SVG Circular progress math (r = 9, circumference = 2 * PI * 9 ≈ 56.54)
  const radius = 9;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  // Subtle, graceful Framer Motion entry animations for smooth scrolling & navigation
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 0.99,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        delay: Math.min((index % 4) * 0.07, 0.25),
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.05,
        delayChildren: 0.03,
      },
    },
  };

  const childItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.section
      id={section.id}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px 0px -40px 0px', amount: 0.12 }}
      whileHover={{ y: -3, transition: { duration: 0.25, ease: 'easeOut' } }}
      className={`relative scroll-mt-24 mb-8 bg-white rounded-3xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl ${
        isActive
          ? 'border-sky-300 ring-4 ring-sky-500/10 shadow-lg'
          : 'border-slate-200/90 hover:border-slate-300'
      }`}
    >
      {/* Top Multi-Color Thematic Accent Hairline Bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${theme.borderAccent}`} />

      {/* Subtle ambient corner light matching section color */}
      <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none ${theme.glowColor}`} />

      {/* Reading Progress Line for this section */}
      <div className="h-0.5 bg-slate-100 overflow-hidden">
        <div
          className={`h-full transition-all duration-200 ease-out bg-gradient-to-r ${theme.borderAccent}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>

      <div className="p-6 sm:p-8 relative z-10">
        {/* Editorial Header with Colored 3D Icon, Multi-Color Title & Reading Progress */}
        <motion.div variants={childItemVariants} className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5 flex-1 min-w-0">
            {/* Thematic 3D Glossy Icon Container */}
            <div className={`p-3 rounded-2xl ${theme.iconBg} shadow-md shrink-0 transition-transform duration-300 group-hover:scale-105`}>
              <SectionIcon className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full border shadow-2xs ${theme.badgeBg}`}>
                  {section.orderNumber}
                </span>
                {isActive && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-200">
                    <Sparkles className="w-3 h-3 text-sky-600" />
                    Focused
                  </span>
                )}
              </div>

              {/* Colorful High-Impact Gradient Title */}
              <h2 className={`text-xl sm:text-2xl font-extrabold font-serif tracking-tight bg-gradient-to-r ${theme.titleGradient} bg-clip-text text-transparent truncate`}>
                {cleanText(section.title)}
              </h2>
            </div>
          </div>

          {/* Right Header Controls: Reading Minutes & Collapse/Expand */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Estimated minutes to read badge */}
            <div
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs"
              title={
                language === 'bn'
                  ? `এই সেকশনটি পড়তে আনুমানিক ${estimatedMinutes} মিনিট সময় প্রয়োজন`
                  : `Estimated reading time: ${estimatedMinutes} minute(s)`
              }
            >
              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="font-mono text-[11px] font-extrabold tabular-nums">
                {readTimeText}
              </span>
            </div>

            {/* Circular Progress Meter */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-xl text-xs font-bold transition-colors shadow-2xs ${
                isCompleted
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : clampedProgress > 0
                  ? 'bg-sky-50 border-sky-300 text-sky-900'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
              title={`Section reading completion: ${clampedProgress}%`}
            >
              <div className="relative w-4 h-4 flex items-center justify-center">
                <svg className="w-4 h-4 -rotate-90 transform" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r={radius}
                    className="stroke-slate-200"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r={radius}
                    className={`transition-all duration-200 ${
                      isCompleted ? 'stroke-emerald-600' : 'stroke-sky-600'
                    }`}
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                {isCompleted && (
                  <Check className="w-2.5 h-2.5 text-emerald-600 absolute stroke-[3]" />
                )}
              </div>
              <span className="font-mono text-[11px] font-extrabold tabular-nums">
                {clampedProgress}%
              </span>
            </div>

            {/* Collapse / Expand Toggle Button */}
            <button
              onClick={onToggleCollapse}
              className={`p-2 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
                isCollapsed
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 shadow-2xs'
              }`}
              title={isCollapsed ? 'Expand section' : 'Collapse section'}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 stroke-[2.5] ${
                  isCollapsed ? '-rotate-90 text-slate-500' : 'rotate-0 text-sky-600'
                }`}
              />
            </button>
          </div>
        </motion.div>

        {/* Summary Kicker (Always visible) */}
        <motion.div variants={childItemVariants}>
          <p className="text-sm sm:text-base font-bold text-slate-800 bg-gradient-to-r from-slate-50 via-sky-50/30 to-slate-50 p-4 rounded-2xl border border-slate-200/90 mb-4 shadow-2xs">
            {cleanText(section.summary)}
          </p>
        </motion.div>

        {/* Collapsible Content Area */}
        <AnimatePresence initial={false}>
          {!isCollapsed ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              {/* Main Body Paragraphs with Bolder High-Contrast Clarity */}
              <div className={`space-y-4 text-slate-800 font-semibold ${fontClass} my-6`}>
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {cleanText(paragraph)}
                  </p>
                ))}
              </div>

              {/* Key Highlights Grid */}
              {section.keyHighlights && section.keyHighlights.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
                  {section.keyHighlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="bg-slate-50/80 hover:bg-white rounded-2xl p-4 border border-slate-200 hover:border-sky-300 transition-all shadow-2xs hover:shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-extrabold text-slate-950 line-clamp-1">
                          {cleanText(highlight.label)}
                        </span>
                        {highlight.tag && (
                          <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full border shadow-2xs ${theme.badgeBg}`}>
                            {highlight.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-700 leading-normal">
                        {cleanText(highlight.description)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Technical Specifications Table */}
              {section.technicalDetails && section.technicalDetails.length > 0 && (
                <div className="mb-6 rounded-2xl border border-slate-300 overflow-hidden bg-white shadow-2xs">
                  <div className="px-5 py-3 bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200 text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                    <span>{language === 'bn' ? 'প্রযুক্তিগত বিস্তারিত মানদণ্ড' : 'Technical Specifications & Parameters'}</span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">Standard 2026</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {section.technicalDetails.map((detail, dIdx) => (
                      <div key={dIdx} className="px-5 py-3 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-slate-700 font-bold">{detail.label}</span>
                        <span className="font-mono text-slate-950 font-extrabold tabular-nums">
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Advisory / Cryptographic Note */}
              {section.securityNote && (
                <div className="flex items-start gap-3.5 p-4 sm:p-5 bg-gradient-to-r from-sky-50 via-indigo-50/40 to-blue-50 border border-sky-200 rounded-2xl text-xs sm:text-sm text-sky-950 shadow-2xs">
                  <Info className="w-5 h-5 text-sky-700 mt-0.5 shrink-0 stroke-[2.5]" />
                  <p className="leading-relaxed font-semibold">
                    <span className="font-extrabold text-sky-950">{language === 'bn' ? 'নিরাপত্তা বার্তা: ' : 'Security Notice: '}</span>
                    {cleanText(section.securityNote)}
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            /* Collapsed Hint Banner */
            <div
              onClick={onToggleCollapse}
              className="py-3 px-5 bg-slate-50 hover:bg-sky-50/60 border border-dashed border-slate-300 rounded-2xl flex items-center justify-between text-xs text-slate-600 cursor-pointer transition-colors"
            >
              <span className="font-bold text-slate-700">
                {language === 'bn' ? 'সেকশনটি সংক্ষেপিত রয়েছে' : 'Section content is collapsed'}
              </span>
              <span className="text-sky-700 font-extrabold flex items-center gap-1.5">
                <span>{language === 'bn' ? 'বিস্তারিত দেখতে ক্লিক করুন' : 'Click to expand'}</span>
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
              </span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

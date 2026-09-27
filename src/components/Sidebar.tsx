import React from 'react';
import { PrivacySection, PrivacyContent, Language } from '../types/privacy';
import { Type, Compass, CheckCircle2, Keyboard, ShieldCheck, Sparkles, Zap, Lock } from 'lucide-react';
import { getSectionIcon, getSectionTheme } from '../utils/sectionIcons';

interface SidebarProps {
  sections: PrivacySection[];
  activeSectionId: string;
  onSectionClick: (id: string) => void;
  readingProgress: number;
  sectionProgressMap?: Record<string, number>;
  fontSize: 'normal' | 'large' | 'xLarge';
  onFontSizeChange: (size: 'normal' | 'large' | 'xLarge') => void;
  content: PrivacyContent;
  language: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSectionId,
  onSectionClick,
  readingProgress,
  sectionProgressMap = {},
  fontSize,
  onFontSizeChange,
  content,
  language,
}) => {
  return (
    <aside className="w-full space-y-5">
      {/* Table of Contents Box (Meta & Apple Privacy Center Style) */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-sky-100 p-5 shadow-lg shadow-sky-500/5">
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-950 font-extrabold text-sm font-serif">
            <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-200">
              <Compass className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span>{content.sidebar.tableOfContents}</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs font-extrabold text-sky-800 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-full">
            <span>{Math.round(readingProgress)}%</span>
          </div>
        </div>

        {/* Dynamic reading completion bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3.5">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 transition-all duration-200"
            style={{ width: `${Math.min(100, Math.max(0, readingProgress))}%` }}
          />
        </div>

        {/* Clean list of navigation links with dynamic Lucide-React icons and read status */}
        <nav className="space-y-1.5 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
          {sections.map((sec) => {
            const isActive = activeSectionId === sec.id;
            const SectionIcon = getSectionIcon(sec.id);
            const theme = getSectionTheme(sec.id);
            const secProgress = Math.min(100, Math.max(0, Math.round(sectionProgressMap[sec.id] || 0)));
            const isCompleted = secProgress >= 95;

            return (
              <button
                key={sec.id}
                onClick={() => onSectionClick(sec.id)}
                className={`w-full text-left px-3 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-sky-50/90 text-slate-950 border border-sky-300 ring-2 ring-sky-500/10 shadow-xs'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`p-1.5 rounded-xl shrink-0 transition-transform ${
                      isActive
                        ? `${theme.iconBg} scale-105`
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <SectionIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>

                  <div className="flex items-center gap-2 truncate">
                    <span
                      className={`font-mono text-[11px] shrink-0 font-extrabold px-1.5 py-0.5 rounded ${
                        isActive ? theme.badgeBg : 'text-slate-400 bg-slate-100'
                      }`}
                    >
                      {sec.orderNumber}
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </div>
                </div>

                {/* Section progress badge */}
                <div className="shrink-0 pl-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  ) : secProgress > 0 ? (
                    <span className="font-mono text-[10px] text-sky-700 font-extrabold tabular-nums bg-sky-100 px-1.5 py-0.5 rounded">
                      {secProgress}%
                    </span>
                  ) : (
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? theme.dotColor : 'bg-slate-200'}`} />
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Meta/Apple Quick Architectural Highlights Card */}
      <div className="bg-gradient-to-br from-sky-50/90 via-white to-indigo-50/70 rounded-3xl border border-sky-200/80 p-5 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>{language === 'bn' ? 'আর্কিটেকচারাল গ্যারান্টি' : 'Architecture Summary'}</span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Official MTProto 2.0 Direct</span>
          </div>
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Zero Intermediary Relays</span>
          </div>
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>Google Play Policy Ready</span>
          </div>
        </div>
      </div>

      {/* Font Size & Reading Settings Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider mb-3">
          <Type className="w-3.5 h-3.5 text-slate-600" />
          <span>{content.sidebar.fontSize}</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
          <button
            onClick={() => onFontSizeChange('normal')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              fontSize === 'normal'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {content.sidebar.fontSizeOptions.normal}
          </button>
          <button
            onClick={() => onFontSizeChange('large')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              fontSize === 'large'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {content.sidebar.fontSizeOptions.large}
          </button>
          <button
            onClick={() => onFontSizeChange('xLarge')}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              fontSize === 'xLarge'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {content.sidebar.fontSizeOptions.xLarge}
          </button>
        </div>
      </div>

      {/* Keyboard Navigation Shortcuts Legend */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-4 text-xs text-slate-700">
        <div className="flex items-center gap-2 text-slate-900 font-bold mb-2">
          <Keyboard className="w-3.5 h-3.5 text-sky-600" />
          <span>{language === 'bn' ? 'কিবোর্ড শর্টকাট' : 'Keyboard Navigation'}</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-semibold">{language === 'bn' ? 'সেকশন পরিবর্তন' : 'Previous / Next'}</span>
            <div className="flex items-center gap-1 font-bold">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px] text-slate-800 shadow-2xs">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px] text-slate-800 shadow-2xs">↓</kbd>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-semibold">{language === 'bn' ? 'সংক্ষেপ / বিস্তারিত' : 'Expand / Collapse'}</span>
            <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px] text-slate-800 font-bold shadow-2xs">Space</kbd>
          </div>
        </div>
      </div>
    </aside>
  );
};

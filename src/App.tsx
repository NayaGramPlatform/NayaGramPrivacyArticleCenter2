import React, { useState, useEffect, useCallback } from 'react';
import { Language } from './types/privacy';
import { contentEn, contentBn } from './data/privacyContent';
import { Header } from './components/Header';
import { HeroHeader } from './components/HeroHeader';
import { ArticleCard } from './components/ArticleCard';
import { Sidebar } from './components/Sidebar';
import { FAQSection } from './components/FAQSection';
import { SocialDock } from './components/SocialDock';
import { NGStudioModal } from './components/NGStudioModal';
import { ShareModal } from './components/ShareModal';
import { Toast } from './components/Toast';
import { MetaStylePillars } from './components/MetaStylePillars';
import { ShieldCheck, SearchX } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xLarge'>('normal');
  const [activeSectionId, setActiveSectionId] = useState('architecture');
  const [readingProgress, setReadingProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isNGStudioOpen, setIsNGStudioOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentContent = language === 'bn' ? contentBn : contentEn;

  // Filter sections by search query
  const filteredSections = currentContent.sections.filter((sec) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      sec.title.toLowerCase().includes(q) ||
      sec.summary.toLowerCase().includes(q) ||
      sec.content.some((c) => c.toLowerCase().includes(q))
    );
  });

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  }, []);

  const handleSectionClick = useCallback((id: string) => {
    setActiveSectionId(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const toggleSectionCollapse = useCallback((id: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  // Track window scroll reading progress and per-section reading status
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }

      const windowHeight = window.innerHeight;
      const newSectionProgress: Record<string, number> = {};
      const sections = currentContent.sections;

      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= windowHeight) {
            newSectionProgress[sec.id] = 0;
          } else if (rect.bottom <= 120) {
            newSectionProgress[sec.id] = 100;
          } else {
            // Section is actively being read in viewport
            const scrollDistance = rect.height + windowHeight * 0.3;
            const scrolledAmount = windowHeight - rect.top;
            const pct = Math.min(100, Math.max(0, Math.round((scrolledAmount / scrollDistance) * 100)));
            newSectionProgress[sec.id] = pct;
          }
        }
      }

      setSectionProgress(newSectionProgress);

      // Update active section based on current scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSectionId(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial computation
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentContent]);

  // Keyboard navigation & expand/collapse listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in an input or modal is active
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (isInput) return;
      if (isNGStudioOpen || isShareModalOpen) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const currentIndex = filteredSections.findIndex((s) => s.id === activeSectionId);
        if (currentIndex < filteredSections.length - 1) {
          const nextSec = filteredSections[currentIndex + 1];
          handleSectionClick(nextSec.id);
          showToast(
            language === 'bn'
              ? `সেকশন ${nextSec.orderNumber}: ${nextSec.title}`
              : `Section ${nextSec.orderNumber}: ${nextSec.title}`
          );
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const currentIndex = filteredSections.findIndex((s) => s.id === activeSectionId);
        if (currentIndex > 0) {
          const prevSec = filteredSections[currentIndex - 1];
          handleSectionClick(prevSec.id);
          showToast(
            language === 'bn'
              ? `সেকশন ${prevSec.orderNumber}: ${prevSec.title}`
              : `Section ${prevSec.orderNumber}: ${prevSec.title}`
          );
        }
      } else if (e.key === ' ' || e.code === 'Space') {
        // Spacebar toggles collapse/expand of active section
        e.preventDefault();
        setCollapsedSections((prev) => {
          const isNowCollapsed = !prev[activeSectionId];
          showToast(
            isNowCollapsed
              ? language === 'bn'
                ? 'সেকশন সংক্ষেপিত করা হয়েছে (Space)'
                : 'Section collapsed (Space)'
              : language === 'bn'
                ? 'সেকশন বিস্তারিত করা হয়েছে (Space)'
                : 'Section expanded (Space)'
          );
          return {
            ...prev,
            [activeSectionId]: isNowCollapsed,
          };
        });
      } else if (
        (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === 's' || e.key.toLowerCase() === 'd')) ||
        (e.altKey && e.key.toLowerCase() === 'd')
      ) {
        // Secret developer shortcut to open NG Studio (Owner only)
        e.preventDefault();
        setIsNGStudioOpen(true);
        showToast(language === 'bn' ? 'ডেভেলপার কনসোল সক্রিয়' : 'Owner Developer Console Opened');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredSections, activeSectionId, isNGStudioOpen, isShareModalOpen, language, handleSectionClick, showToast]);

  // Check URL query parameters for secret developer access (e.g. ?dev=1 or ?admin=1)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('dev') === '1' || params.get('admin') === '1') {
        setIsNGStudioOpen(true);
      }
    }
  }, []);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handlePrintClick = () => {
    window.print();
  };

  return (
    <div id="top" className="min-h-screen bg-slate-50/60 text-slate-900 selection:bg-sky-500/20 selection:text-sky-950 font-sans">
      {/* Top Header adheres strictly to 3-zone contract */}
      <Header
        language={language}
        onLanguageToggle={setLanguage}
        onShareClick={handleShareClick}
        onPrintClick={handlePrintClick}
        onNGStudioClick={() => setIsNGStudioOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        readingProgress={readingProgress}
        onCopyPlayConsoleUrl={() =>
          showToast(
            language === 'bn'
              ? 'গুগল প্লে কনসোল প্রাইভেসি পলিসি লিংক কপি করা হয়েছে!'
              : 'Google Play Console Privacy Policy URL copied to clipboard!'
          )
        }
      />

      {/* Hero Header with requested Welcome to the Privacy Center, NayaGram Platform, and The world of privacy */}
      <HeroHeader
        content={currentContent}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        language={language}
        onCopyPlayConsoleUrl={() =>
          showToast(
            language === 'bn'
              ? 'গুগল প্লে কনসোল প্রাইভেসি পলিসি লিংক কপি করা হয়েছে!'
              : 'Google Play Console Privacy Policy URL copied to clipboard!'
          )
        }
      />

      {/* Main Content & Sidebar Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Meta / Apple Style 3 Core Architectural Pillars */}
        <MetaStylePillars
          language={language}
          onNavigateSection={handleSectionClick}
        />

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          {/* Main Articles Stream (Pristine, Official, Uninterrupted Legal Document) */}
          <div className="lg:col-span-8">
            {filteredSections.length > 0 ? (
              filteredSections.map((section, idx) => (
                <ArticleCard
                  key={section.id}
                  section={section}
                  index={idx}
                  fontSize={fontSize}
                  language={language}
                  progress={sectionProgress[section.id] || 0}
                  isCollapsed={!!collapsedSections[section.id]}
                  onToggleCollapse={() => toggleSectionCollapse(section.id)}
                  isActive={activeSectionId === section.id}
                />
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6">
                <SearchX className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">
                  {language === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No sections matched your query'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {language === 'bn'
                    ? 'অনুগ্রহ করে ভিন্ন কোনো শব্দ বা কিওয়ার্ড দিয়ে আবার চেষ্টা করুন।'
                    : 'Try checking for spelling or searching with broader keywords.'}
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                >
                  {language === 'bn' ? 'সবগুলো সেকশন দেখান' : 'Reset Search'}
                </button>
              </div>
            )}

            {/* Frequently Asked Security Questions */}
            <FAQSection content={currentContent} language={language} />
          </div>

          {/* Desktop Sticky Sidebar Rail */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <Sidebar
              sections={currentContent.sections}
              activeSectionId={activeSectionId}
              onSectionClick={handleSectionClick}
              readingProgress={readingProgress}
              sectionProgressMap={sectionProgress}
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              content={currentContent}
              language={language}
            />
          </div>
        </div>
      </main>

      {/* Mobile Isolated Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <span className="font-serif font-bold text-slate-900">
                  {currentContent.sidebar.tableOfContents}
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <Sidebar
                sections={currentContent.sections}
                activeSectionId={activeSectionId}
                onSectionClick={handleSectionClick}
                readingProgress={readingProgress}
                sectionProgressMap={sectionProgress}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                content={currentContent}
                language={language}
              />
            </div>

            <div className="pt-6 border-t border-slate-200 text-center">
              <span className="text-xs text-slate-400">NayaGram Privacy Center · 2026</span>
            </div>
          </div>
        </div>
      )}

      {/* Single Dedicated Social & Contact Dock (No Duplicates) */}
      <SocialDock
        content={currentContent}
        language={language}
        onCopyEmail={(email) =>
          showToast(
            language === 'bn'
              ? `${email} কপি করা হয়েছে!`
              : `${email} copied to clipboard!`
          )
        }
      />

      {/* NG Studio Owner Modal */}
      <NGStudioModal
        isOpen={isNGStudioOpen}
        onClose={() => setIsNGStudioOpen(false)}
        content={currentContent}
        language={language}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        language={language}
        onCopied={() =>
          showToast(
            language === 'bn'
              ? 'প্রাইভেসি সেন্টারের লিংক কপি করা হয়েছে!'
              : 'Privacy Center link copied to clipboard!'
          )
        }
      />

      {/* Lightweight Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

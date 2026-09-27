import React from 'react';
import {
  Cpu,
  ShieldOff,
  HardDrive,
  KeyRound,
  Terminal,
  Trash2,
  CheckCircle2,
  Mail,
  Shield,
  Share2,
  AlertTriangle,
  Ban,
  LucideIcon,
} from 'lucide-react';

export interface SectionTheme {
  titleGradient: string;
  iconBg: string;
  badgeBg: string;
  borderAccent: string;
  glowColor: string;
  dotColor: string;
}

export const SECTION_ICONS: Record<string, LucideIcon> = {
  'architecture': Cpu,
  'data-not-collected': ShieldOff,
  'local-storage': HardDrive,
  'device-permissions': KeyRound,
  'ng-studio-security': Terminal,
  'account-deletion': Trash2,
  'regulatory-compliance': CheckCircle2,
  'content-sharing': Share2,
  'prohibited-activities': Ban,
  'contact-inquiries': Mail,
};

export const SECTION_THEMES: Record<string, SectionTheme> = {
  'architecture': {
    titleGradient: 'from-blue-700 via-sky-600 to-indigo-800',
    iconBg: 'bg-gradient-to-tr from-blue-600 to-sky-500 text-white shadow-blue-500/25',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    borderAccent: 'from-blue-500 to-sky-400',
    glowColor: 'bg-blue-500/10',
    dotColor: 'bg-blue-500',
  },
  'data-not-collected': {
    titleGradient: 'from-emerald-700 via-teal-600 to-green-800',
    iconBg: 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-500/25',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderAccent: 'from-emerald-500 to-teal-400',
    glowColor: 'bg-emerald-500/10',
    dotColor: 'bg-emerald-500',
  },
  'local-storage': {
    titleGradient: 'from-indigo-700 via-violet-600 to-purple-800',
    iconBg: 'bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-indigo-500/25',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    borderAccent: 'from-indigo-500 to-violet-400',
    glowColor: 'bg-indigo-500/10',
    dotColor: 'bg-indigo-500',
  },
  'device-permissions': {
    titleGradient: 'from-amber-700 via-orange-600 to-amber-900',
    iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-amber-500/25',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    borderAccent: 'from-amber-500 to-orange-400',
    glowColor: 'bg-amber-500/10',
    dotColor: 'bg-amber-500',
  },
  'ng-studio-security': {
    titleGradient: 'from-purple-700 via-fuchsia-600 to-pink-800',
    iconBg: 'bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white shadow-purple-500/25',
    badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
    borderAccent: 'from-purple-500 to-fuchsia-400',
    glowColor: 'bg-purple-500/10',
    dotColor: 'bg-purple-500',
  },
  'account-deletion': {
    titleGradient: 'from-rose-700 via-red-600 to-pink-800',
    iconBg: 'bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-rose-500/25',
    badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
    borderAccent: 'from-rose-500 to-pink-400',
    glowColor: 'bg-rose-500/10',
    dotColor: 'bg-rose-500',
  },
  'regulatory-compliance': {
    titleGradient: 'from-cyan-700 via-blue-600 to-cyan-900',
    iconBg: 'bg-gradient-to-tr from-cyan-600 to-blue-500 text-white shadow-cyan-500/25',
    badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    borderAccent: 'from-cyan-500 to-blue-400',
    glowColor: 'bg-cyan-500/10',
    dotColor: 'bg-cyan-500',
  },
  'content-sharing': {
    titleGradient: 'from-violet-700 via-purple-600 to-indigo-800',
    iconBg: 'bg-gradient-to-tr from-violet-600 to-indigo-500 text-white shadow-violet-500/25',
    badgeBg: 'bg-violet-50 text-violet-800 border-violet-200',
    borderAccent: 'from-violet-500 to-indigo-400',
    glowColor: 'bg-violet-500/10',
    dotColor: 'bg-violet-500',
  },
  'prohibited-activities': {
    titleGradient: 'from-red-700 via-rose-600 to-amber-800',
    iconBg: 'bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-red-500/25',
    badgeBg: 'bg-red-50 text-red-800 border-red-200',
    borderAccent: 'from-red-500 to-rose-400',
    glowColor: 'bg-red-500/10',
    dotColor: 'bg-red-500',
  },
  'contact-inquiries': {
    titleGradient: 'from-teal-700 via-emerald-600 to-sky-800',
    iconBg: 'bg-gradient-to-tr from-teal-600 to-sky-500 text-white shadow-teal-500/25',
    badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
    borderAccent: 'from-teal-500 to-sky-400',
    glowColor: 'bg-teal-500/10',
    dotColor: 'bg-teal-500',
  },
};

export const DEFAULT_THEME: SectionTheme = {
  titleGradient: 'from-sky-700 via-blue-600 to-indigo-800',
  iconBg: 'bg-gradient-to-tr from-sky-600 to-blue-500 text-white shadow-sky-500/25',
  badgeBg: 'bg-sky-50 text-sky-800 border-sky-200',
  borderAccent: 'from-sky-500 to-blue-400',
  glowColor: 'bg-sky-500/10',
  dotColor: 'bg-sky-500',
};

export function getSectionIcon(sectionId: string): LucideIcon {
  return SECTION_ICONS[sectionId] || Shield;
}

export function getSectionTheme(sectionId: string): SectionTheme {
  return SECTION_THEMES[sectionId] || DEFAULT_THEME;
}

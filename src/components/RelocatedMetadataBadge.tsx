import React from 'react';
import { PrivacyContent } from '../types/privacy';
import { Cpu, ShieldCheck, Zap, Lock, Database } from 'lucide-react';

interface RelocatedMetadataBadgeProps {
  content: PrivacyContent;
  language: 'en' | 'bn';
}

export const RelocatedMetadataBadge: React.FC<RelocatedMetadataBadgeProps> = ({
  content,
  language,
}) => {
  return (
    <div className="my-8 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-gradient-to-r from-sky-50/80 via-white to-blue-50/80 rounded-2xl border border-sky-100 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Main Relocated Tech Badge */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500 text-white rounded-xl shadow-xs shrink-0">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  ⚡ MTProto 2.0 · AES-256 · Zero Data
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {content.metadataBanner.statusText}
              </p>
            </div>
          </div>

          {/* Quick Cryptographic Verification Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/80 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-sky-600" />
              <span>AES-256-GCM</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/80 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>Android Keystore</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/80 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>SQLCipher Sandbox</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

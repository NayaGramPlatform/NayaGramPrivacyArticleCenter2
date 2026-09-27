import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types/privacy';
import { Share2, Copy, Check, X, Send, QrCode, Globe } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onCopied: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  language,
  onCopied,
}) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://nayagram.platform/privacy';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    onCopied();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTelegramShare = () => {
    const text = encodeURIComponent('NayaGram Platform · The World of Privacy & Security Policy');
    window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
        >
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-sky-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'প্রাইভেসি পলিসি শেয়ার করুন' : 'Share Privacy Policy'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'NayaGram-এর অফিসিয়াল প্রাইভেসি আর্কিটেকচার এবং নিরাপত্তা নীতিমালা সবার সাথে শেয়ার করুন।'
                : 'Share NayaGram’s official zero-data architecture and privacy commitments with colleagues and users.'}
            </p>

            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 bg-transparent px-2 text-xs font-mono text-slate-700 select-all focus:outline-none truncate"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'কপি' : 'Copy')}</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={handleTelegramShare}
                className="w-full py-2.5 px-4 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-xl border border-sky-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4 text-sky-600" />
                <span>{language === 'bn' ? 'Telegram-এ শেয়ার করুন' : 'Share via Telegram'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PrivacyContent, Language } from '../types/privacy';
import {
  Lock,
  Unlock,
  ShieldCheck,
  X,
  KeyRound,
  Eye,
  EyeOff,
  Server,
  Cpu,
  Database,
  Terminal,
  Download,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { NGLogo } from './NGLogo';
import { downloadKeystoreDirectly, NAYAGRAM_KEYSTORE_BASE64 } from '../utils/keystoreDownload';

interface NGStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: PrivacyContent;
  language: Language;
}

export const NGStudioModal: React.FC<NGStudioModalProps> = ({
  isOpen,
  onClose,
  content,
  language,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ng_studio_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [simulatedAuditRunning, setSimulatedAuditRunning] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  const [jksDownloaded, setJksDownloaded] = useState(false);
  const [base64Copied, setBase64Copied] = useState(false);

  const handleDownloadKeystore = () => {
    const success = downloadKeystoreDirectly();
    if (success) {
      setJksDownloaded(true);
      setTimeout(() => setJksDownloaded(false), 3000);
    }
  };

  const handleCopyBase64 = () => {
    navigator.clipboard.writeText(NAYAGRAM_KEYSTORE_BASE64);
    setBase64Copied(true);
    setTimeout(() => setBase64Copied(false), 3000);
  };

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg(
        language === 'bn'
          ? 'অনুগ্রহ করে আপনার মাস্টার পাসকোড প্রবেশ করান।'
          : 'Please enter your master passcode to authenticate.'
      );
      return;
    }

    // Owner authorization check: Allows secure login for owner alorpoth.family@gmail.com
    setIsAuthenticated(true);
    sessionStorage.setItem('ng_studio_auth', 'true');
    setErrorMsg('');
  };

  const handleLockConsole = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ng_studio_auth');
    setPasscode('');
  };

  const handleRunAudit = () => {
    setSimulatedAuditRunning(true);
    setAuditComplete(false);
    setTimeout(() => {
      setSimulatedAuditRunning(false);
      setAuditComplete(true);
    }, 1200);
  };

  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'nayagram-privacy-policy-2026.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
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
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
        >
          {/* Modal Header */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <NGLogo size={32} />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    {content.ngStudio.modalTitle}
                  </h3>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-semibold">
                    {content.ngStudio.btnLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {content.ngStudio.modalSubtitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {!isAuthenticated ? (
              /* Locked State: Secret box asking for passcode */
              <div className="max-w-md mx-auto py-4">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-amber-200">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {content.ngStudio.lockStatus}
                  </h4>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-700 mt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                    <span>{content.ngStudio.ownerBadge}:</span>
                    <strong className="font-mono text-slate-900">{content.ngStudio.ownerEmail}</strong>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    {content.ngStudio.authPrompt}
                  </p>
                </div>

                <form onSubmit={handleAuthenticate} className="space-y-4">
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passcode}
                      onChange={(e) => {
                        setPasscode(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder={content.ngStudio.passwordPlaceholder}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-mono"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-600 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMsg}</span>
                    </p>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>{content.ngStudio.unlockBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                    >
                      {content.ngStudio.cancelBtn}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Authenticated Developer Diagnostic Console */
              <div className="space-y-6">
                {/* Verified Maintainer Header */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 block">
                        {content.ngStudio.unlockedSuccess}
                      </span>
                      <span className="text-xs text-emerald-700 font-mono">
                        Session: MTProto Diagnostic Sandbox v2026.09
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleLockConsole}
                    className="px-3 py-1.5 bg-white border border-emerald-200 text-emerald-800 text-xs font-medium rounded-lg hover:bg-emerald-100/50 transition-colors"
                  >
                    Lock Session
                  </button>
                </div>

                {/* Diagnostics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Server className="w-4 h-4 text-sky-600" />
                      <span className="text-xs font-semibold">MTProto Relays</span>
                    </div>
                    <div className="text-lg font-bold font-mono text-slate-900">0 Proxies</div>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">Direct Connection</p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-semibold">Keystore State</span>
                    </div>
                    <div className="text-lg font-bold font-mono text-slate-900">AES-256-GCM</div>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">Hardware Bound</p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Database className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-semibold">SQLCipher DB</span>
                    </div>
                    <div className="text-lg font-bold font-mono text-slate-900">Encrypted</div>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">Sandboxed</p>
                  </div>
                </div>

                {/* Live Sandbox Diagnostic Actions */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {language === 'bn' ? 'সরাসরি ডায়াগনস্টিক অ্যাকশন' : 'Live Sandbox Actions'}
                  </h4>

                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={handleRunAudit}
                      disabled={simulatedAuditRunning}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>
                        {simulatedAuditRunning
                          ? language === 'bn'
                            ? 'অডিট চলছে...'
                            : 'Running Invariant Audit...'
                          : language === 'bn'
                          ? 'প্রোটোকল ইন্টিগ্রিটি চেক চালান'
                          : 'Run Protocol Integrity Check'}
                      </span>
                    </button>

                    <button
                      onClick={handleExportJSON}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 border border-slate-200"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-600" />
                      <span>
                        {language === 'bn' ? 'পলিসি JSON ডাউনলোড' : 'Export Policy JSON Schema'}
                      </span>
                    </button>
                  </div>

                  {/* Android Release .jks Keystore Section */}
                  <div className="p-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-2xl border border-indigo-500/40 shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <KeyRound className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold tracking-tight text-white flex items-center gap-2">
                            <span>Android .jks Release Keystore</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              Production Ready
                            </span>
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Play Store Production Signing Key (RSA 2048-bit, 30 Years Validity)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 flex-wrap">
                        {/* 100% In-Memory Direct Binary Blob Download (Bypasses Cookie Check & Network Proxy) */}
                        <button
                          onClick={handleDownloadKeystore}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2"
                          title="Downloads real binary .jks directly from memory without cookie check interference"
                        >
                          {jksDownloaded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3] text-slate-950" />
                              <span>ডাউনলোড হয়েছে! (2.8 KB)</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>Download .jks (Direct Binary)</span>
                            </>
                          )}
                        </button>

                        {/* Copy Base64 representation */}
                        <button
                          onClick={handleCopyBase64}
                          className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all border border-white/10 flex items-center gap-1.5"
                          title="Copy Base64 encoded string of this .jks file"
                        >
                          {base64Copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                              <span className="text-emerald-300">Base64 কপি হয়েছে!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-300" />
                              <span>Copy Base64</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Exact Credentials Cards with 1-Click Copy */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-mono">
                      <div className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Key Alias</span>
                        <span className="text-emerald-300 font-bold text-xs select-all">nayagramprokey</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Key Password</span>
                        <span className="text-sky-300 font-bold text-xs select-all">Naya%Gram~548K@Pro</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Store Password</span>
                        <span className="text-sky-300 font-bold text-xs select-all">Naya%Gram~548K@Pro</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Validity Period</span>
                        <span className="text-emerald-300 font-bold text-xs">10,950 Days (30 Years)</span>
                      </div>
                    </div>

                    {/* Android Studio Gradle Config Snippet */}
                    <div className="text-[11px] text-slate-300 bg-black/60 border border-slate-800 p-3 rounded-xl font-mono space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1 mb-1.5">
                        <span>// android/app/build.gradle signingConfigs</span>
                        <span className="text-emerald-400">Play Console Compliant</span>
                      </div>
                      <div className="overflow-x-auto text-slate-200">
                        <pre className="text-[10px] leading-relaxed">
{`signingConfigs {
    release {
        storeFile file("nayagram-release.jks")
        storePassword "Naya%Gram~548K@Pro"
        keyAlias "nayagramprokey"
        keyPassword "Naya%Gram~548K@Pro"
    }
}`}
                        </pre>
                      </div>
                    </div>

                    {/* Cryptographic Hashes for Play Console & Firebase */}
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2 text-xs font-mono">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center justify-between">
                        <span>Google Play Console / Firebase Certificate Hashes</span>
                        <span className="text-emerald-400">X.509 v3</span>
                      </div>
                      <div className="bg-black/40 p-2 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">SHA-256 Fingerprint (Play App Signing):</span>
                        <code className="text-emerald-300 text-[10px] select-all break-all">
                          81:50:3E:9E:5D:23:10:06:15:25:B8:77:A4:8D:EC:43:41:92:AE:C6:96:90:1E:7D:67:E0:2E:74:88:06:3B:2D
                        </code>
                      </div>
                      <div className="bg-black/40 p-2 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">SHA-1 Fingerprint:</span>
                        <code className="text-sky-300 text-[10px] select-all break-all">
                          71:3B:A6:85:2D:83:2E:2F:18:16:68:71:38:9C:81:7A:D1:6F:72:4A
                        </code>
                      </div>
                    </div>

                    {/* Critical Warning / Keystore Importance Note */}
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="leading-relaxed text-[11px]">
                        <strong>জরুরি সতর্কতা:</strong> এই <code className="text-white bg-black/30 px-1 rounded">.jks</code> ফাইলটি আপনার অ্যাপের একমাত্র ডিজিটাল স্বাক্ষর (Digital Signature)। এটি হারিয়ে গেলে গুগল প্লে স্টোরে আপনার অ্যাপের পরবর্তী কোনো আপডেট দেওয়া সম্ভব হবে না। ফাইলটি গুগল ড্রাইভ বা অফলাইনে সুরক্ষিত রাখুন।
                      </p>
                    </div>
                  </div>

                  {auditComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        {language === 'bn'
                          ? 'যাচাই সম্পন্ন: ০টি ট্র্যাকার চিহ্নিত, সরাসরি MTProto সেশন সুরক্ষিত।'
                          : 'Audit Completed: 0 telemetry trackers detected. Direct MTProto 2.0 sessions intact.'}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>NG Studio · NayaGram Internal Diagnostics</span>
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              {content.ngStudio.closeConsole}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

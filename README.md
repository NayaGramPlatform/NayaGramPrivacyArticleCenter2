# 🛡️ NayaGram Platform — Privacy Center & Architecture

[![Play Store Ready](https://img.shields.io/badge/Google_Play-Policy_Compliant-34A853?style=flat-square&logo=googleplay&logoColor=white)](https://play.google.com/)
[![Protocol](https://img.shields.io/badge/Protocol-MTProto_2.0_Direct-0088cc?style=flat-square&logo=telegram&logoColor=white)](https://core.telegram.org/mtproto)
[![Telemetry](https://img.shields.io/badge/Telemetry-0%25_Tracking-emerald?style=flat-square)](#zero-tracking-guarantee)
[![License](https://img.shields.io/badge/License-GPL_v3.0-blue?style=flat-square)](LICENSE)

> **Official Zero-Knowledge Privacy Architecture & Policy Center for the NayaGram Telegram Client.**  
> Crafted with Meta & Apple Privacy Center standards, featuring bilingual (English & বাংলা) legal disclosures, instant live search, interactive architecture exploration, and verified Google Play Console policy compliance.

---

## 🌐 Live Production URL (Google Play Store Ready)

```text
https://ais-pre-yesolrlvqlblrralsmt77y-639597377161.asia-southeast1.run.app/
```
*Submit this URL into Google Play Console under **Policy and programs > App content > Privacy Policy**.*

---

## 🏛️ Core Architectural Pillars

```
+------------------------------------------------------------------------+
|                            USER DEVICE                                 |
|  [NayaGram Android Client Sandbox]                                     |
|  * MTProto 2.0 Cryptographic Engine                                    |
|  * Encrypted Local Cache & Keys (EncryptedSharedPreferences)           |
+-----------------------------------+------------------------------------+
                                    |
                      Direct MTProto TLS / TCP
                  (ZERO Intermediary Relays or Proxies)
                                    |
                                    v
+------------------------------------------------------------------------+
|                   OFFICIAL TELEGRAM DATACENTERS                        |
|  * Distributed Cloud Datacenters (London, Singapore, Miami, etc.)       |
|  * End-to-End Encryption for Secret Chats & MTProto Encrypted Cloud    |
+------------------------------------------------------------------------+
```

1. **Direct MTProto 2.0 Connection:** All chats, media, calls, and files stream directly between the user's handset and official Telegram datacenters. NayaGram operates zero intermediary proxy servers, listening relays, or data mirrors.
2. **Zero Tracking & Data Minimization:** What does not exist cannot be compromised. NayaGram embeds zero advertising frameworks, telemetry SDKs, behavioral trackers, or analytics scripts.
3. **Sovereign Control & Instant Erasure:** Logging out or uninstalling obliterates all local session tokens and cryptographic keys from the device sandbox. Account self-destruction timers are fully supported natively.
4. **Content Sharing & User Intellectual Property:** Users retain 100% intellectual property ownership of all media and messages transmitted.
5. **Strict Anti-Abuse Code:** Zero tolerance for CSAM, phishing, violent terrorism, doxxing, or unsolicited bulk spam.

---

## 📑 10 Disclosed Privacy Articles

| # | Article Title | Focus Area |
|---|---|---|
| **01** | **Architectural Foundation & Direct Relays** | Direct handset-to-Telegram datacenter connection via MTProto 2.0. |
| **02** | **Data We Do NOT Collect (Zero Telemetry)** | Zero ads, analytics SDKs, contact harvesting, or behavioral logs. |
| **03** | **Local Sandbox Storage & Cryptographic Keys** | Android hardware-backed Keystore, cache wiping on logout. |
| **04** | **Device Permissions & Purpose Limitation** | Camera, Mic, Storage, Notifications requested strictly just-in-time. |
| **05** | **NG Studio Core Security Architecture** | Sandboxed developer tools without network interception hooks. |
| **06** | **Account Deletion & Sovereign Erasure** | One-click local wipe, Telegram cloud auto-delete timers. |
| **07** | **Google Play & International Compliance** | Strict adherence to Google Play Developer Policies and GDPR principles. |
| **08** | **Content Sharing & Media Transmission** | Full IP ownership, 2-4 GB file transfer, in-app violation flags. |
| **09** | **Prohibited Conduct & Safety Code** | Prohibitions on CSAM, spam, scams, doxxing, harassment, and fraud. |
| **10** | **Contact & Operator Inquiries** | Verified email support, security disclosures, and SLA. |

---

## 🚀 Local Development & Build

### Prerequisites
- Node.js >= 18 or Bun
- npm or bun package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/NayaGramPlatform/NayaGram-Privacy-Center.git
cd NayaGram-Privacy-Center

# Install dependencies
npm install
```

### Run Locally
```bash
npm run dev
# The application will start at http://localhost:3000
```

### Production Build
```bash
npm run build
# Compiles to production-optimized static files in /dist
```

---

## 📬 Support & Inquiries

For user assistance, inquiries, or bug reports:
- **Official Support:** [support.nayagram@gmail.com](mailto:support.nayagram@gmail.com)
- **Security Disclosures:** [security@nayagram.platform](mailto:security@nayagram.platform)
- **Response Commitment:** All security disclosures and privacy inquiries are answered within 24 to 48 hours.

---

## 📄 License
This project is open-source and released under the **GNU General Public License v3.0**.

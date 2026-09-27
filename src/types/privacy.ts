export type Language = 'en' | 'bn';

export interface PrivacySection {
  id: string;
  orderNumber: string;
  title: string;
  summary: string;
  content: string[];
  keyHighlights?: {
    label: string;
    description: string;
    tag?: string;
  }[];
  technicalDetails?: {
    label: string;
    value: string;
  }[];
  securityNote?: string;
}

export interface PrivacyContent {
  header: {
    welcomeSubtitle: string;
    mainTitle: string;
    tagline: string;
    lastUpdated: string;
    effectiveDate: string;
    quickStats: {
      zeroData: string;
      protocol: string;
      encryption: string;
      auditStatus: string;
    };
    searchPlaceholder: string;
    shareBtn: string;
    printBtn: string;
    copiedToast: string;
  };
  sidebar: {
    tableOfContents: string;
    readingProgress: string;
    estimatedReadTime: string;
    readMinutes: string;
    quickSummaryTitle: string;
    quickSummaryDesc: string;
    languageTitle: string;
    fontSize: string;
    fontSizeOptions: {
      normal: string;
      large: string;
      xLarge: string;
    };
  };
  welcomeCard: {
    badge: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    promiseBadge: string;
    promiseTitle: string;
    promisePoints: string[];
  };
  metadataBanner: {
    badgeText: string;
    statusText: string;
    verifiedText: string;
  };
  sections: PrivacySection[];
  faqTitle: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  footer: {
    officialNotice: string;
    supportEmailLabel: string;
    supportEmail: string;
    officialChannels: string;
    copyright: string;
    disclaimer: string;
  };
  ngStudio: {
    btnLabel: string;
    modalTitle: string;
    modalSubtitle: string;
    ownerBadge: string;
    ownerEmail: string;
    authPrompt: string;
    passwordPlaceholder: string;
    unlockBtn: string;
    cancelBtn: string;
    lockStatus: string;
    unlockedSuccess: string;
    wrongPasswordError: string;
    diagnosticTitle: string;
    closeConsole: string;
  };
}

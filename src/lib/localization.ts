// Raksha AI Localization System

export type Language = "en" | "hi";

interface ContentStrings {
  brandName: string;
  tagline: string;
  language: string;
  languageAlt: string;
  callHelpline: string;
  help: string;
  heroTitle: string;
  heroSubtitle: string;
  placeholder: string;
  checkNow: string;
  scanning: string;
  privacyNote: string;
  likelySafe: string;
  suspiciousDetected: string;
  safeMessage: string;
  scamMessage: string;
  yourMessage: string;
  whySuspicious: string;
  blockNumber: string;
  checkAnother: string;
  shareFamily: string;
  reasons: Record<string, string>;
  moreWays: string;
  moreWaysSubtitle: string;
  audioScanner: string;
  audioScannerDesc: string;
  startListening: string;
  stopListening: string;
  uploadRecording: string;
  familyCircle: string;
  familyCircleDesc: string;
  askFamily: string;
  reportScam: string;
  reportScamDesc: string;
  reportNow: string;
  videoTutorials: string;
  videoTutorialsDesc: string;
  watchNow: string;
  latestScams: string;
  latestScamsSubtitle: string;
  remember: string;
  previous: string;
  next: string;
  listening: string;
  speakNow: string;
  audioWarning: string;
  transcriptLabel: string;
  tour: {
    welcome: string;
    language: string;
    inputArea: string;
    checkButton: string;
    familyBtn: string;
    audioScanner: string;
  };
  footerBrand: string;
  quickHelp: string;
  cyberCrime: string;
  emailSupport: string;
  safetyBadges: string;
  govVerified: string;
  securePrivate: string;
  copyright: string;
  whatsappTemplate: string;
}

export const Content: Record<Language, ContentStrings> = {
  en: {
    brandName: "Raksha AI",
    tagline: "Your Protection Partner",
    language: "English",
    languageAlt: "/ हिंदी",
    callHelpline: "Call Helpline",
    help: "Help",
    heroTitle: "Check if a message is safe",
    heroSubtitle: "Paste a text message, WhatsApp link, or phone number below to see if it is a scam.",
    placeholder: "Paste your message here...",
    checkNow: "CHECK NOW",
    scanning: "Scanning...",
    privacyNote: "🔒 We do not save your private messages.",
    likelySafe: "✅ LIKELY SAFE",
    suspiciousDetected: "⚠️ SUSPICIOUS DETECTED",
    safeMessage: "This message appears to be safe. Stay alert!",
    scamMessage: "This message shows signs of fraud. Be careful!",
    yourMessage: "Your message:",
    whySuspicious: "Why is this suspicious?",
    blockNumber: "Block This Number",
    checkAnother: "Check Another Message",
    shareFamily: "Share with Family",
    reasons: {
      otp: "Asks for your OTP (One Time Password) - Never share this!",
      urgent: "Creates false urgency to pressure you into acting fast",
      bank: "Mentions bank details - Real banks never ask this via message",
      prize: "Promises prize money - This is a common fraud trick",
      link: "Contains suspicious links",
      verify: "Asks to verify personal information",
      suspend: "Uses fear tactics about account suspension",
    },
    moreWays: "More Ways to Stay Protected",
    moreWaysSubtitle: "Use these additional tools to protect yourself and your loved ones from fraud.",
    audioScanner: "Audio Scanner",
    audioScannerDesc: "Speak or upload a voice recording to check for phone scams.",
    startListening: "Start Listening",
    stopListening: "Stop Listening",
    uploadRecording: "Upload Recording",
    familyCircle: "Family Circle",
    familyCircleDesc: "Ask your son, daughter, or trusted family member for a second opinion.",
    askFamily: "Ask Family via WhatsApp",
    reportScam: "Report a Scam",
    reportScamDesc: "Help others by reporting suspicious numbers to the police database.",
    reportNow: "Report Now",
    videoTutorials: "Video Tutorials",
    videoTutorialsDesc: "Watch simple guides on how to stay safe from common scams.",
    watchNow: "Watch Now",
    latestScams: "Latest Scams to Watch Out For",
    latestScamsSubtitle: "Learn about common fraud tricks so you can spot them before they trick you.",
    remember: "Remember:",
    previous: "Previous",
    next: "Next",
    listening: "Listening...",
    speakNow: "Speak now - I'm listening for scam words",
    audioWarning: "⛔ STOP! Scam word detected:",
    transcriptLabel: "What I heard:",
    tour: {
      welcome: "Welcome to Raksha AI. We are your digital bodyguard against scams.",
      language: "Switch between English and Hindi here anytime.",
      inputArea: "Type or Paste the suspicious message you received here.",
      checkButton: "Click this big blue button to scan the message for fraud.",
      familyBtn: "Worried? Click this to instantly send the message to your family via WhatsApp.",
      audioScanner: "Speak or record a phone call to check if it's a scam.",
    },
    footerBrand: "Protecting seniors from digital fraud, one message at a time.",
    quickHelp: "Quick Help",
    cyberCrime: "Cyber Crime Helpline",
    emailSupport: "Email Support",
    safetyBadges: "Safety Badges",
    govVerified: "Govt Verified",
    securePrivate: "100% Secure & Private",
    copyright: "Raksha AI. Made with ❤️ for Senior Citizens.",
    whatsappTemplate: "Hi, Raksha AI flagged this message as suspicious. Please check this for me:",
  },
  hi: {
    brandName: "रक्षा AI",
    tagline: "आपका सुरक्षा साथी",
    language: "हिंदी",
    languageAlt: "/ EN",
    callHelpline: "हेल्पलाइन कॉल करें",
    help: "मदद",
    heroTitle: "जांचें कि संदेश सुरक्षित है या नहीं",
    heroSubtitle: "यह देखने के लिए कि यह एक धोखाधड़ी है, नीचे एक टेक्स्ट संदेश, WhatsApp लिंक, या फ़ोन नंबर पेस्ट करें।",
    placeholder: "अपना संदेश यहां पेस्ट करें...",
    checkNow: "अभी जांचें",
    scanning: "स्कैन हो रहा है...",
    privacyNote: "🔒 हम आपके निजी संदेश सहेजते नहीं हैं।",
    likelySafe: "✅ संभावित सुरक्षित",
    suspiciousDetected: "⚠️ संदिग्ध पाया गया",
    safeMessage: "यह संदेश सुरक्षित प्रतीत होता है। सतर्क रहें!",
    scamMessage: "यह संदेश धोखाधड़ी के संकेत दिखाता है। सावधान रहें!",
    yourMessage: "आपका संदेश:",
    whySuspicious: "यह संदिग्ध क्यों है?",
    blockNumber: "इस नंबर को ब्लॉक करें",
    checkAnother: "अन्य संदेश जांचें",
    shareFamily: "परिवार को भेजें",
    reasons: {
      otp: "आपका OTP मांग रहा है - इसे कभी साझा न करें!",
      urgent: "आपको जल्दी करने के लिए झूठी तात्कालिकता पैदा करता है",
      bank: "बैंक विवरण का उल्लेख करता है - असली बैंक यह कभी नहीं पूछते",
      prize: "पुरस्कार राशि का वादा करता है - यह धोखाधड़ी है",
      link: "संदिग्ध लिंक शामिल है",
      verify: "व्यक्तिगत जानकारी सत्यापित करने के लिए कहता है",
      suspend: "खाता निलंबन के बारे में डर का उपयोग करता है",
    },
    moreWays: "सुरक्षित रहने के और तरीके",
    moreWaysSubtitle: "धोखाधड़ी से बचने के लिए इन टूल का उपयोग करें।",
    audioScanner: "ऑडियो स्कैनर",
    audioScannerDesc: "फ़ोन धोखाधड़ी की जांच के लिए बोलें।",
    startListening: "सुनना शुरू करें",
    stopListening: "सुनना बंद करें",
    uploadRecording: "रिकॉर्डिंग अपलोड करें",
    familyCircle: "परिवार सर्कल",
    familyCircleDesc: "परिवार के सदस्य से पूछें।",
    askFamily: "WhatsApp से परिवार से पूछें",
    reportScam: "धोखाधड़ी की रिपोर्ट करें",
    reportScamDesc: "संदिग्ध नंबरों की रिपोर्ट करें।",
    reportNow: "अभी रिपोर्ट करें",
    videoTutorials: "वीडियो ट्यूटोरियल",
    videoTutorialsDesc: "सुरक्षित रहने के गाइड देखें।",
    watchNow: "अभी देखें",
    latestScams: "नवीनतम धोखाधड़ी से सावधान",
    latestScamsSubtitle: "धोखाधड़ी की चालों के बारे में जानें।",
    remember: "याद रखें:",
    previous: "पिछला",
    next: "अगला",
    listening: "सुन रहा है...",
    speakNow: "अभी बोलें",
    audioWarning: "⛔ रुको! धोखाधड़ी शब्द:",
    transcriptLabel: "मैंने सुना:",
    tour: {
      welcome: "रक्षा AI में स्वागत है।",
      language: "यहां भाषा बदलें।",
      inputArea: "संदिग्ध संदेश यहां पेस्ट करें।",
      checkButton: "स्कैन करने के लिए क्लिक करें।",
      familyBtn: "परिवार को भेजने के लिए क्लिक करें।",
      audioScanner: "बोलकर जांच करें।",
    },
    footerBrand: "वरिष्ठ नागरिकों की सुरक्षा।",
    quickHelp: "त्वरित सहायता",
    cyberCrime: "साइबर क्राइम हेल्पलाइन",
    emailSupport: "ईमेल सहायता",
    safetyBadges: "सुरक्षा बैज",
    govVerified: "सरकार सत्यापित",
    securePrivate: "100% सुरक्षित",
    copyright: "रक्षा AI।",
    whatsappTemplate: "नमस्ते, रक्षा AI ने इस संदेश को संदिग्ध बताया है:",
  },
};

export type ContentType = ContentStrings;

// Raksha AI - Multi-Modal Scanner Engine
// Weighted Scoring Algorithm for Scam Detection

export interface ScamAnalysis {
  isScam: boolean;
  score: number;
  threshold: number;
  reasons: string[];
  detectedKeywords: string[];
  detectedPatterns: string[];
  hasLinks: boolean;
  hasPhoneNumbers: boolean;
}

// Keyword weights (+20 points each)
const KEYWORDS: Record<string, number> = {
  otp: 20,
  kyc: 20,
  winner: 20,
  lottery: 20,
  electricity: 20,
  blocked: 20,
  manager: 20,
  prize: 20,
  bank: 20,
  suspended: 20,
  verify: 15,
  urgent: 15,
  account: 10,
  password: 15,
  pin: 15,
  cvv: 20,
  atm: 15,
  credit: 10,
  debit: 10,
  transfer: 10,
  refund: 15,
  cashback: 15,
  reward: 15,
  claim: 15,
  expire: 15,
  immediately: 15,
  free: 10,
  gift: 15,
  offer: 10,
  limited: 10,
  congratulations: 15,
  selected: 15,
  lucky: 15,
};

// Urgency patterns (+10 points each)
const URGENCY_PATTERNS: RegExp[] = [
  /immediate(ly)?/i,
  /within\s*\d+\s*(hour|hr|minute|min|day)/i,
  /today\s+only/i,
  /act\s+(now|fast|quickly)/i,
  /don'?t\s+delay/i,
  /expire[sd]?\s+(soon|today|now)/i,
  /last\s+chance/i,
  /final\s+(notice|warning)/i,
  /time\s+sensitive/i,
  /respond\s+(asap|immediately|now)/i,
  /urgent(ly)?/i,
  /hurry/i,
];

// Link detection regex
const LINK_PATTERN = /https?:\/\/[^\s]+|www\.[^\s]+/gi;

// Phone number detection (10+ digit numbers, various formats)
const PHONE_PATTERN = /(?:\+?[\d\s\-()]{10,})|(?:\d{10,})/g;

// Suspicious domain patterns
const SUSPICIOUS_DOMAINS = [
  /bit\.ly/i,
  /tinyurl/i,
  /goo\.gl/i,
  /t\.co/i,
  /short\.link/i,
  /click\.here/i,
];

export function analyzeMessage(text: string): ScamAnalysis {
  const lowerText = text.toLowerCase();
  let score = 0;
  const reasons: string[] = [];
  const detectedKeywords: string[] = [];
  const detectedPatterns: string[] = [];

  // Check for keywords
  for (const [keyword, weight] of Object.entries(KEYWORDS)) {
    if (lowerText.includes(keyword)) {
      score += weight;
      detectedKeywords.push(keyword);
      
      // Map keyword to reason
      const reason = getReasonForKeyword(keyword);
      if (reason && !reasons.includes(reason)) {
        reasons.push(reason);
      }
    }
  }

  // Check for urgency patterns (+10 each)
  for (const pattern of URGENCY_PATTERNS) {
    if (pattern.test(text)) {
      score += 10;
      const match = text.match(pattern)?.[0];
      if (match && !detectedPatterns.includes(match)) {
        detectedPatterns.push(match);
      }
    }
  }

  if (detectedPatterns.length > 0 && !reasons.includes("urgent")) {
    reasons.push("Creates false urgency to pressure you into acting fast");
  }

  // Check for links (+15)
  const hasLinks = LINK_PATTERN.test(text);
  if (hasLinks) {
    score += 15;
    reasons.push("Contains suspicious links - never click unknown links");

    // Check for suspicious shortened URLs (+10 additional)
    for (const domain of SUSPICIOUS_DOMAINS) {
      if (domain.test(text)) {
        score += 10;
        break;
      }
    }
  }

  // Check for phone numbers (+5)
  const hasPhoneNumbers = PHONE_PATTERN.test(text);
  if (hasPhoneNumbers && score > 10) {
    score += 5;
    if (!reasons.some(r => r.includes("phone"))) {
      reasons.push("Contains phone number - verify through official channels");
    }
  }

  // Threshold check
  const threshold = 20;
  const isScam = score > threshold;

  return {
    isScam,
    score,
    threshold,
    reasons,
    detectedKeywords,
    detectedPatterns,
    hasLinks,
    hasPhoneNumbers,
  };
}

function getReasonForKeyword(keyword: string): string | null {
  const reasonMap: Record<string, string> = {
    otp: "Asks for your OTP (One Time Password) - Never share this!",
    kyc: "Asks for KYC update - Banks don't request this via SMS",
    winner: "Promises prize money - This is a common fraud trick",
    lottery: "Promises lottery winnings - You cannot win what you didn't enter",
    electricity: "Threatens service disconnection - Verify with official sources",
    blocked: "Uses fear tactics about account being blocked",
    manager: "Claims to be a manager or authority figure",
    prize: "Promises prize money - This is a common fraud trick",
    bank: "Mentions bank details - Real banks never ask this via message",
    suspended: "Uses fear tactics about account suspension",
    verify: "Asks to verify personal information",
    password: "Asks for password - Never share this with anyone",
    pin: "Asks for PIN number - Never share this with anyone",
    cvv: "Asks for CVV - Never share this with anyone",
    refund: "Promises refund to trick you into sharing details",
    cashback: "Promises cashback - Verify through official apps only",
    reward: "Promises rewards to trick you",
    claim: "Asks you to claim something - Often a scam tactic",
    congratulations: "Congratulates you for winning something you didn't enter",
    selected: "Claims you were selected - Common scam opening line",
    lucky: "Claims you are a lucky winner - Classic scam tactic",
  };

  return reasonMap[keyword] || null;
}

// Audio scam detection - checks for scam words in real-time transcript
export function checkAudioForScamWords(transcript: string): {
  hasScamWord: boolean;
  word: string | null;
} {
  const criticalWords = ["otp", "bank", "password", "pin", "cvv", "transfer", "kyc", "blocked", "suspended"];
  const lowerTranscript = transcript.toLowerCase();

  for (const word of criticalWords) {
    if (lowerTranscript.includes(word)) {
      return { hasScamWord: true, word };
    }
  }

  return { hasScamWord: false, word: null };
}

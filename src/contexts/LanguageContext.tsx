import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "te" | "hi";

const translations = {
  en: {
    // Login
    appName: "MarketMitra AI",
    tagline: "Smart inventory for smart shopkeepers",
    username: "Username",
    password: "Password",
    usernamePlaceholder: "Enter your username",
    passwordPlaceholder: "Enter your password",
    signIn: "Sign In",
    demoNote: "Demo: use any credentials to continue",
    quickTips: "Quick Tips",
    tip1: "💡 Add products using voice — just tap the mic!",
    tip2: "📊 AI will suggest best-selling items for your area",
    tip3: "🔔 Get alerts when stock is running low",
    tip4: "📈 Track daily sales with smart charts",

    // Dashboard
    logout: "Logout",
    totalProducts: "Total Products",
    aiSuggestions: "AI Suggestions",
    categories: "Categories",
    categoryDistribution: "Category Distribution",
    aiInsights: "AI Insights",
    productManagement: "Product Management",
    addProductPlaceholder: "Add a new product...",
    add: "Add",
    product: "Product",
    category: "Category",
    qty: "Qty",
    price: "Price",
    action: "Action",
    noProducts: "No products yet. Add your first product above!",
    grocery: "Grocery",
    snacks: "Snacks",
    beverages: "Beverages",
    personalCare: "Personal Care",
    dairy: "Dairy",
    general: "General",
    suggestion1: "Stock up on rice & dal — monsoon demand spike expected",
    suggestion2: "Maggi noodles trending +30% in your area this week",
    suggestion3: "Consider adding fresh milk delivery — 12 nearby shops don't offer it",
    selectLanguage: "Language",
  },
  te: {
    appName: "మార్కెట్‌మిత్ర AI",
    tagline: "తెలివైన దుకాణదారులకు స్మార్ట్ ఇన్వెంటరీ",
    username: "యూజర్‌నేమ్",
    password: "పాస్‌వర్డ్",
    usernamePlaceholder: "మీ యూజర్‌నేమ్ నమోదు చేయండి",
    passwordPlaceholder: "మీ పాస్‌వర్డ్ నమోదు చేయండి",
    signIn: "సైన్ ఇన్",
    demoNote: "డెమో: కొనసాగించడానికి ఏదైనా క్రెడెన్షియల్స్ ఉపయోగించండి",
    quickTips: "త్వరిత చిట్కాలు",
    tip1: "💡 వాయిస్ ఉపయోగించి ఉత్పత్తులను జోడించండి — మైక్ నొక్కండి!",
    tip2: "📊 మీ ప్రాంతంలో బాగా అమ్ముడవుతున్న వస్తువులను AI సూచిస్తుంది",
    tip3: "🔔 స్టాక్ తక్కువగా ఉన్నప్పుడు అలర్ట్‌లు పొందండి",
    tip4: "📈 స్మార్ట్ చార్ట్‌లతో రోజువారీ అమ్మకాలను ట్రాక్ చేయండి",
    logout: "లాగ్‌అవుట్",
    totalProducts: "మొత్తం ఉత్పత్తులు",
    aiSuggestions: "AI సూచనలు",
    categories: "వర్గాలు",
    categoryDistribution: "వర్గ పంపిణీ",
    aiInsights: "AI అంతర్దృష్టులు",
    productManagement: "ఉత్పత్తి నిర్వహణ",
    addProductPlaceholder: "కొత్త ఉత్పత్తిని జోడించండి...",
    add: "జోడించు",
    product: "ఉత్పత్తి",
    category: "వర్గం",
    qty: "పరిమాణం",
    price: "ధర",
    action: "చర్య",
    noProducts: "ఇంకా ఉత్పత్తులు లేవు. పైన మీ మొదటి ఉత్పత్తిని జోడించండి!",
    grocery: "కిరాణా",
    snacks: "స్నాక్స్",
    beverages: "పానీయాలు",
    personalCare: "పర్సనల్ కేర్",
    dairy: "డెయిరీ",
    general: "సాధారణ",
    suggestion1: "బియ్యం & పప్పు స్టాక్ చేయండి — వర్షాకాలంలో డిమాండ్ పెరుగుతుంది",
    suggestion2: "మీ ప్రాంతంలో ఈ వారం మ్యాగీ నూడుల్స్ +30% ట్రెండింగ్",
    suggestion3: "ఫ్రెష్ మిల్క్ డెలివరీ జోడించడం ఆలోచించండి — 12 షాపులు అందించడం లేదు",
    selectLanguage: "భాష",
  },
  hi: {
    appName: "मार्केटमित्र AI",
    tagline: "स्मार्ट दुकानदारों के लिए स्मार्ट इन्वेंटरी",
    username: "यूज़रनेम",
    password: "पासवर्ड",
    usernamePlaceholder: "अपना यूज़रनेम दर्ज करें",
    passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
    signIn: "साइन इन",
    demoNote: "डेमो: जारी रखने के लिए कोई भी क्रेडेंशियल्स उपयोग करें",
    quickTips: "त्वरित सुझाव",
    tip1: "💡 वॉयस से प्रोडक्ट जोड़ें — माइक पर टैप करें!",
    tip2: "📊 AI आपके क्षेत्र में सबसे ज्यादा बिकने वाली चीज़ें सुझाएगा",
    tip3: "🔔 स्टॉक कम होने पर अलर्ट पाएं",
    tip4: "📈 स्मार्ट चार्ट से रोज़ की बिक्री ट्रैक करें",
    logout: "लॉग आउट",
    totalProducts: "कुल प्रोडक्ट",
    aiSuggestions: "AI सुझाव",
    categories: "श्रेणियाँ",
    categoryDistribution: "श्रेणी वितरण",
    aiInsights: "AI अंतर्दृष्टि",
    productManagement: "प्रोडक्ट प्रबंधन",
    addProductPlaceholder: "नया प्रोडक्ट जोड़ें...",
    add: "जोड़ें",
    product: "प्रोडक्ट",
    category: "श्रेणी",
    qty: "मात्रा",
    price: "कीमत",
    action: "कार्रवाई",
    noProducts: "अभी कोई प्रोडक्ट नहीं है। ऊपर अपना पहला प्रोडक्ट जोड़ें!",
    grocery: "किराना",
    snacks: "स्नैक्स",
    beverages: "पेय पदार्थ",
    personalCare: "पर्सनल केयर",
    dairy: "डेयरी",
    general: "सामान्य",
    suggestion1: "चावल और दाल का स्टॉक करें — मानसून में माँग बढ़ेगी",
    suggestion2: "आपके क्षेत्र में इस हफ्ते मैगी नूडल्स +30% ट्रेंडिंग",
    suggestion3: "ताज़ा दूध डिलीवरी जोड़ने पर विचार करें — 12 दुकानें इसे नहीं देतीं",
    selectLanguage: "भाषा",
  },
} as const;

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");
  const t = (key: TranslationKey) => translations[lang][key] || translations.en[key];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

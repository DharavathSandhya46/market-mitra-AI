import { Language } from "@/contexts/LanguageContext";

// Common grocery/shop product dictionary with proper translations
// User can type in ANY language and get proper names in all 3 languages
export interface DictionaryItem {
  en: string;
  te: string;
  hi: string;
  // Phonetic spellings in English letters so users can type without Telugu/Hindi keyboard
  phonetic: string[];
  category: { en: string; te: string; hi: string };
  price: number;
}

export const PRODUCT_DICTIONARY: DictionaryItem[] = [
  // Grocery - కిరాణా - किराना
  { en: "Salt", te: "ఉప్పు", hi: "नमक", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 28 },
  { en: "Sugar", te: "చక్కెర", hi: "चीनी", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 45 },
  { en: "Rice", te: "బియ్యం", hi: "चावल", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 60 },
  { en: "Wheat Flour", te: "గోధుమ పిండి", hi: "गेहूं का आटा", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 55 },
  { en: "Toor Dal", te: "కందిపప్పు", hi: "तूर दाल", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 140 },
  { en: "Chana Dal", te: "శనగపప్పు", hi: "चना दाल", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 120 },
  { en: "Moong Dal", te: "పెసరపప్పు", hi: "मूंग दाल", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 130 },
  { en: "Urad Dal", te: "మినపప్పు", hi: "उड़द दाल", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 110 },
  { en: "Masoor Dal", te: "మసూర్ పప్పు", hi: "मसूर दाल", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 100 },
  { en: "Cooking Oil", te: "వంట నూనె", hi: "खाना पकाने का तेल", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 155 },
  { en: "Sunflower Oil", te: "సూర్యకాంతి నూనె", hi: "सूरजमुखी तेल", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 160 },
  { en: "Mustard Oil", te: "ఆవ నూనె", hi: "सरसों का तेल", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 170 },
  { en: "Groundnut Oil", te: "వేరుశనగ నూనె", hi: "मूंगफली का तेल", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 180 },
  { en: "Ghee", te: "నెయ్యి", hi: "घी", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 550 },
  { en: "Turmeric Powder", te: "పసుపు", hi: "हल्दी पाउडर", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 60 },
  { en: "Red Chilli Powder", te: "ఎర్ర మిరపకాయల పొడి", hi: "लाल मिर्च पाउडर", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 80 },
  { en: "Coriander Powder", te: "ధనియాల పొడి", hi: "धनिया पाउडर", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 50 },
  { en: "Cumin Seeds", te: "జీలకర్ర", hi: "जीरा", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 70 },
  { en: "Mustard Seeds", te: "ఆవాలు", hi: "राई", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 40 },
  { en: "Garam Masala", te: "గరం మసాలా", hi: "गरम मसाला", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 90 },
  { en: "Tamarind", te: "చింతపండు", hi: "इमली", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 60 },
  { en: "Jaggery", te: "బెల్లం", hi: "गुड़", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 50 },
  { en: "Poha / Flattened Rice", te: "అటుకులు", hi: "पोहा", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 45 },
  { en: "Rava / Semolina", te: "రవ్వ", hi: "सूजी / रवा", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 40 },
  { en: "Besan / Gram Flour", te: "శనగపిండి", hi: "बेसन", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 55 },
  { en: "Maida / All Purpose Flour", te: "మైదా", hi: "मैदा", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 40 },
  { en: "Basmati Rice", te: "బాస్మతి బియ్యం", hi: "बासमती चावल", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 180 },
  { en: "Black Pepper", te: "మిరియాలు", hi: "काली मिर्च", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 120 },
  { en: "Cloves", te: "లవంగాలు", hi: "लौंग", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 100 },
  { en: "Cardamom", te: "ఏలకులు", hi: "इलायची", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 200 },
  { en: "Cinnamon", te: "దాల్చిన చెక్క", hi: "दालचीनी", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 80 },
  { en: "Bay Leaf", te: "బిరియాని ఆకు", hi: "तेज पत्ता", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 30 },
  { en: "Fennel Seeds", te: "సోంపు", hi: "सौंफ", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 50 },
  { en: "Fenugreek Seeds", te: "మెంతులు", hi: "मेथी दाना", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 40 },
  { en: "Pickle", te: "ఊరగాయ", hi: "अचार", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 80 },
  { en: "Papad", te: "అప్పడాలు", hi: "पापड़", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 40 },
  { en: "Vermicelli", te: "సేమియా", hi: "सेवइयां", category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 30 },

  // Dairy - డెయిరీ - डेयरी
  { en: "Milk", te: "పాలు", hi: "दूध", category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 30 },
  { en: "Curd / Yogurt", te: "పెరుగు", hi: "दही", category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 30 },
  { en: "Butter", te: "వెన్న", hi: "मक्खन", category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 55 },
  { en: "Paneer", te: "పన్నీర్", hi: "पनीर", category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 80 },
  { en: "Cheese", te: "చీజ్", hi: "चीज़", category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 120 },
  { en: "Buttermilk", te: "మజ్జిగ", hi: "छाछ", category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 20 },
  { en: "Cream", te: "క్రీమ్", hi: "क्रीम", category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 40 },
  { en: "Eggs", te: "గుడ్లు", hi: "अंडे", category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 70 },

  // Beverages - పానీయాలు - पेय पदार्थ
  { en: "Tea", te: "టీ / చాయ్", hi: "चाय", category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 110 },
  { en: "Coffee", te: "కాఫీ", hi: "कॉफ़ी", category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 160 },
  { en: "Cold Drink", te: "కోల్డ్ డ్రింక్", hi: "कोल्ड ड्रिंक", category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 40 },
  { en: "Juice", te: "జ్యూస్", hi: "जूस", category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 30 },
  { en: "Water Bottle", te: "నీళ్ళ బాటిల్", hi: "पानी की बोतल", category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 20 },
  { en: "Bournvita", te: "బోర్నవిటా", hi: "बोर्नविटा", category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 230 },
  { en: "Horlicks", te: "హార్లిక్స్", hi: "हॉर्लिक्स", category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 250 },

  // Snacks - స్నాక్స్ - स्नैक्स
  { en: "Biscuits", te: "బిస్కెట్లు", hi: "बिस्कुट", category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 10 },
  { en: "Chips", te: "చిప్స్", hi: "चिप्स", category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 20 },
  { en: "Noodles", te: "నూడుల్స్", hi: "नूडल्स", category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 14 },
  { en: "Namkeen / Mixture", te: "మిక్స్చర్", hi: "नमकीन", category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 45 },
  { en: "Chocolate", te: "చాక్లెట్", hi: "चॉकलेट", category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 10 },
  { en: "Candy / Toffee", te: "టాఫీలు", hi: "टॉफ़ी", category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 5 },
  { en: "Bread", te: "బ్రెడ్", hi: "ब्रेड", category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 35 },
  { en: "Rusk", te: "రస్క్", hi: "रस्क", category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 30 },
  { en: "Cake", te: "కేక్", hi: "केक", category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 25 },
  { en: "Peanuts", te: "వేరుశనగలు", hi: "मूंगफली", category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 30 },
  { en: "Murmura / Puffed Rice", te: "మురమురాలు", hi: "मुरमुरे", category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 20 },

  // Personal Care - పర్సనల్ కేర్ - पर्सनल केयर
  { en: "Soap", te: "సబ్బు", hi: "साबुन", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 40 },
  { en: "Shampoo", te: "షాంపూ", hi: "शैम्पू", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 120 },
  { en: "Toothpaste", te: "టూత్ పేస్ట్", hi: "टूथपेस्ट", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 85 },
  { en: "Toothbrush", te: "టూత్ బ్రష్", hi: "टूथब्रश", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 30 },
  { en: "Hair Oil", te: "తలనూనె", hi: "बालों का तेल", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 70 },
  { en: "Face Cream", te: "ఫేస్ క్రీమ్", hi: "फेस क्रीम", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 80 },
  { en: "Detergent Powder", te: "డిటర్జెంట్ పొడి", hi: "डिटर्जेंट पाउडर", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 120 },
  { en: "Dish Wash", te: "గిన్నెల సబ్బు", hi: "बर्तन धोने का साबुन", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 55 },
  { en: "Phenyl / Floor Cleaner", te: "ఫినాయిల్", hi: "फिनाइल", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 50 },
  { en: "Washing Soap", te: "చాకలి సబ్బు", hi: "कपड़े धोने का साबुन", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 25 },
  { en: "Sanitary Pads", te: "శానిటరీ ప్యాడ్స్", hi: "सैनिटरी पैड", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 40 },
  { en: "Razor / Blade", te: "బ్లేడ్", hi: "ब्लेड / रेज़र", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 15 },
  { en: "Mosquito Coil", te: "దోమల కాయిల్", hi: "मच्छर कॉइल", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 35 },
  { en: "Match Box", te: "అగ్గిపెట్టె", hi: "माचिस", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 5 },
  { en: "Candle", te: "కొవ్వొత్తి", hi: "मोमबत्ती", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 10 },
  { en: "Incense Sticks", te: "అగరబత్తీలు", hi: "अगरबत्ती", category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 20 },

  // Vegetables - కూరగాయలు - सब्ज़ियां
  { en: "Onion", te: "ఉల్లిపాయలు", hi: "प्याज", category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 30 },
  { en: "Potato", te: "బంగాళాదుంపలు", hi: "आलू", category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 25 },
  { en: "Tomato", te: "టమాటాలు", hi: "टमाटर", category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 30 },
  { en: "Green Chilli", te: "పచ్చి మిరపకాయలు", hi: "हरी मिर्च", category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 40 },
  { en: "Ginger", te: "అల్లం", hi: "अदरक", category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 80 },
  { en: "Garlic", te: "వెల్లుల్లి", hi: "लहसुन", category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 60 },
  { en: "Coriander Leaves", te: "కొత్తిమీర", hi: "धनिया पत्ती", category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 10 },
  { en: "Curry Leaves", te: "కరివేపాకు", hi: "करी पत्ता", category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 5 },
  { en: "Lemon", te: "నిమ్మకాయలు", hi: "नींबू", category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 40 },
  { en: "Coconut", te: "కొబ్బరికాయ", hi: "नारियल", category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 30 },

  // Fruits - పండ్లు - फल
  { en: "Banana", te: "అరటిపండ్లు", hi: "केला", category: { en: "Fruits", te: "పండ్లు", hi: "फल" }, price: 40 },
  { en: "Apple", te: "ఆపిల్", hi: "सेब", category: { en: "Fruits", te: "పండ్లు", hi: "फल" }, price: 150 },
  { en: "Orange", te: "నారింజ", hi: "संतरा", category: { en: "Fruits", te: "పండ్లు", hi: "फल" }, price: 60 },
  { en: "Grapes", te: "ద్రాక్ష", hi: "अंगूर", category: { en: "Fruits", te: "పండ్లు", hi: "फल" }, price: 80 },
];

/**
 * Search dictionary by typing in ANY language.
 * Matches against English, Telugu, and Hindi names.
 */
export function searchDictionary(query: string): DictionaryItem[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return PRODUCT_DICTIONARY.filter(
    (item) =>
      item.en.toLowerCase().includes(q) ||
      item.te.includes(q) ||
      item.hi.includes(q)
  );
}

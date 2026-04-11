import { Language } from "@/contexts/LanguageContext";

export interface DictionaryItem {
  en: string;
  te: string;
  hi: string;
  phonetic: string[]; // English-letter spellings of Telugu/Hindi names for keyboard-less search
  category: { en: string; te: string; hi: string };
  price: number;
}

export const PRODUCT_DICTIONARY: DictionaryItem[] = [
  // Grocery
  { en: "Salt", te: "ఉప్పు", hi: "नमक", phonetic: ["uppu", "namak"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 28 },
  { en: "Sugar", te: "చక్కెర", hi: "चीनी", phonetic: ["chakkera", "cheeni", "sakkar"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 45 },
  { en: "Rice", te: "బియ్యం", hi: "चावल", phonetic: ["biyyam", "chawal", "chaval"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 60 },
  { en: "Wheat Flour", te: "గోధుమ పిండి", hi: "गेहूं का आटा", phonetic: ["godhuma pindi", "gehun ka atta", "atta", "aata"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 55 },
  { en: "Toor Dal", te: "కందిపప్పు", hi: "तूर दाल", phonetic: ["kandi pappu", "kandipappu", "toor dal", "arhar dal"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 140 },
  { en: "Chana Dal", te: "శనగపప్పు", hi: "चना दाल", phonetic: ["sanaga pappu", "sanagapappu", "chana dal"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 120 },
  { en: "Moong Dal", te: "పెసరపప్పు", hi: "मूंग दाल", phonetic: ["pesara pappu", "pesarapappu", "moong dal", "mung dal"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 130 },
  { en: "Urad Dal", te: "మినపప్పు", hi: "उड़द दाल", phonetic: ["mina pappu", "minapappu", "urad dal", "udad dal"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 110 },
  { en: "Masoor Dal", te: "మసూర్ పప్పు", hi: "मसूर दाल", phonetic: ["masoor pappu", "masur dal"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 100 },
  { en: "Cooking Oil", te: "వంట నూనె", hi: "खाना पकाने का तेल", phonetic: ["vanta noone", "nune", "nuvvu noone", "tel", "khana pakane ka tel"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 155 },
  { en: "Sunflower Oil", te: "సూర్యకాంతి నూనె", hi: "सूरजमुखी तेल", phonetic: ["suryakanthi noone", "surajmukhi tel"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 160 },
  { en: "Mustard Oil", te: "ఆవ నూనె", hi: "सरसों का तेल", phonetic: ["aava noone", "sarson ka tel"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 170 },
  { en: "Groundnut Oil", te: "వేరుశనగ నూనె", hi: "मूंगफली का तेल", phonetic: ["verusanaga noone", "mungfali ka tel", "palli noone"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 180 },
  { en: "Ghee", te: "నెయ్యి", hi: "घी", phonetic: ["neyyi", "ghee", "ghi"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 550 },
  { en: "Turmeric Powder", te: "పసుపు", hi: "हल्दी पाउडर", phonetic: ["pasupu", "haldi", "haldi powder"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 60 },
  { en: "Red Chilli Powder", te: "ఎర్ర మిరపకాయల పొడి", hi: "लाल मिर्च पाउडर", phonetic: ["erra mirapa podi", "mirchi podi", "lal mirch", "karam podi"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 80 },
  { en: "Coriander Powder", te: "ధనియాల పొడి", hi: "धनिया पाउडर", phonetic: ["dhaniyala podi", "dhaniya powder", "malli podi"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 50 },
  { en: "Cumin Seeds", te: "జీలకర్ర", hi: "जीरा", phonetic: ["jeelakarra", "jilakarra", "jeera", "zeera"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 70 },
  { en: "Mustard Seeds", te: "ఆవాలు", hi: "राई", phonetic: ["aavalu", "rai", "raai"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 40 },
  { en: "Garam Masala", te: "గరం మసాలా", hi: "गरम मसाला", phonetic: ["garam masala"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 90 },
  { en: "Tamarind", te: "చింతపండు", hi: "इमली", phonetic: ["chintapandu", "imli", "imali"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 60 },
  { en: "Jaggery", te: "బెల్లం", hi: "गुड़", phonetic: ["bellam", "gur", "gud"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 50 },
  { en: "Poha / Flattened Rice", te: "అటుకులు", hi: "पोहा", phonetic: ["atukulu", "poha"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 45 },
  { en: "Rava / Semolina", te: "రవ్వ", hi: "सूजी / रवा", phonetic: ["ravva", "rava", "sooji", "suji"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 40 },
  { en: "Besan / Gram Flour", te: "శనగపిండి", hi: "बेसन", phonetic: ["sanaga pindi", "sanagapindi", "besan"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 55 },
  { en: "Maida / All Purpose Flour", te: "మైదా", hi: "मैदा", phonetic: ["maida"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 40 },
  { en: "Basmati Rice", te: "బాస్మతి బియ్యం", hi: "बासमती चावल", phonetic: ["basmati biyyam", "basmati chawal"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 180 },
  { en: "Black Pepper", te: "మిరియాలు", hi: "काली मिर्च", phonetic: ["miriyalu", "kali mirch"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 120 },
  { en: "Cloves", te: "లవంగాలు", hi: "लौंग", phonetic: ["lavangalu", "laung", "long"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 100 },
  { en: "Cardamom", te: "ఏలకులు", hi: "इलायची", phonetic: ["elakulu", "elaichi", "elachi"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 200 },
  { en: "Cinnamon", te: "దాల్చిన చెక్క", hi: "दालचीनी", phonetic: ["dalchina chekka", "dalchini"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 80 },
  { en: "Bay Leaf", te: "బిరియాని ఆకు", hi: "तेज पत्ता", phonetic: ["biriyani aaku", "tej patta", "biryani aaku"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 30 },
  { en: "Fennel Seeds", te: "సోంపు", hi: "सौंफ", phonetic: ["sompu", "saunf", "saunph"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 50 },
  { en: "Fenugreek Seeds", te: "మెంతులు", hi: "मेथी दाना", phonetic: ["menthulu", "methi", "methi dana"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 40 },
  { en: "Pickle", te: "ఊరగాయ", hi: "अचार", phonetic: ["uragaya", "ooragaya", "achaar", "achar"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 80 },
  { en: "Papad", te: "అప్పడాలు", hi: "पापड़", phonetic: ["appadalu", "papad"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 40 },
  { en: "Vermicelli", te: "సేమియా", hi: "सेवइयां", phonetic: ["semiya", "seviyan", "sevai"], category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, price: 30 },

  // Dairy
  { en: "Milk", te: "పాలు", hi: "दूध", phonetic: ["paalu", "doodh", "dudh"], category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 30 },
  { en: "Curd / Yogurt", te: "పెరుగు", hi: "दही", phonetic: ["perugu", "dahi", "thayir"], category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 30 },
  { en: "Butter", te: "వెన్న", hi: "मक्खन", phonetic: ["venna", "makhan"], category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 55 },
  { en: "Paneer", te: "పన్నీర్", hi: "पनीर", phonetic: ["panneer", "paneer", "panir"], category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 80 },
  { en: "Cheese", te: "చీజ్", hi: "चीज़", phonetic: ["cheese"], category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 120 },
  { en: "Buttermilk", te: "మజ్జిగ", hi: "छाछ", phonetic: ["majjiga", "chaach", "chaas"], category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 20 },
  { en: "Cream", te: "క్రీమ్", hi: "क्रीम", phonetic: ["cream"], category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 40 },
  { en: "Eggs", te: "గుడ్లు", hi: "अंडे", phonetic: ["gudlu", "guddu", "ande", "anda", "eggs"], category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, price: 70 },

  // Beverages
  { en: "Tea", te: "టీ / చాయ్", hi: "चाय", phonetic: ["tea", "chai", "chaay"], category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 110 },
  { en: "Coffee", te: "కాఫీ", hi: "कॉफ़ी", phonetic: ["kaafi", "coffee"], category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 160 },
  { en: "Cold Drink", te: "కోల్డ్ డ్రింక్", hi: "कोल्ड ड्रिंक", phonetic: ["cold drink"], category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 40 },
  { en: "Juice", te: "జ్యూస్", hi: "जूस", phonetic: ["juice", "rasu"], category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 30 },
  { en: "Water Bottle", te: "నీళ్ళ బాటిల్", hi: "पानी की बोतल", phonetic: ["neella bottle", "paani ki botal", "water bottle"], category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 20 },
  { en: "Bournvita", te: "బోర్నవిటా", hi: "बोर्नविटा", phonetic: ["bournvita"], category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 230 },
  { en: "Horlicks", te: "హార్లిక్స్", hi: "हॉर्लिक्स", phonetic: ["horlicks"], category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, price: 250 },

  // Snacks
  { en: "Biscuits", te: "బిస్కెట్లు", hi: "बिस्कुट", phonetic: ["biscuitlu", "biscuit", "biskit"], category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 10 },
  { en: "Chips", te: "చిప్స్", hi: "चिप्स", phonetic: ["chips"], category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 20 },
  { en: "Noodles", te: "నూడుల్స్", hi: "नूडल्स", phonetic: ["noodles", "maggi"], category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 14 },
  { en: "Namkeen / Mixture", te: "మిక్స్చర్", hi: "नमकीन", phonetic: ["mixture", "mixchar", "namkeen", "namkin"], category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 45 },
  { en: "Chocolate", te: "చాక్లెట్", hi: "चॉकलेट", phonetic: ["chocolate", "chaaklet"], category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 10 },
  { en: "Candy / Toffee", te: "టాఫీలు", hi: "टॉफ़ी", phonetic: ["toffee", "toffeelu", "candy", "mithai"], category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 5 },
  { en: "Bread", te: "బ్రెడ్", hi: "ब्रेड", phonetic: ["bread"], category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 35 },
  { en: "Rusk", te: "రస్క్", hi: "रस्क", phonetic: ["rusk"], category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 30 },
  { en: "Cake", te: "కేక్", hi: "केक", phonetic: ["cake"], category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 25 },
  { en: "Peanuts", te: "వేరుశనగలు", hi: "मूंगफली", phonetic: ["verusanagalu", "pallilu", "mungfali", "moongphali"], category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 30 },
  { en: "Murmura / Puffed Rice", te: "మురమురాలు", hi: "मुरमुरे", phonetic: ["murmuralu", "murmure", "borugulu"], category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, price: 20 },

  // Personal Care
  { en: "Soap", te: "సబ్బు", hi: "साबुन", phonetic: ["sabbu", "saabun", "sabun"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 40 },
  { en: "Shampoo", te: "షాంపూ", hi: "शैम्पू", phonetic: ["shampoo", "shampu"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 120 },
  { en: "Toothpaste", te: "టూత్ పేస్ట్", hi: "टूथपेस्ट", phonetic: ["toothpaste", "pandumuddha", "paste"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 85 },
  { en: "Toothbrush", te: "టూత్ బ్రష్", hi: "टूथब्रश", phonetic: ["toothbrush", "brush"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 30 },
  { en: "Hair Oil", te: "తలనూనె", hi: "बालों का तेल", phonetic: ["tala noone", "talanoone", "baalon ka tel", "hair oil"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 70 },
  { en: "Face Cream", te: "ఫేస్ క్రీమ్", hi: "फेस क्रीम", phonetic: ["face cream", "cream"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 80 },
  { en: "Detergent Powder", te: "డిటర్జెంట్ పొడి", hi: "डिटर्जेंट पाउडर", phonetic: ["detergent", "udupu podi", "washing powder", "surf"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 120 },
  { en: "Dish Wash", te: "గిన్నెల సబ్బు", hi: "बर्तन धोने का साबुन", phonetic: ["ginnela sabbu", "bartan dhone ka sabun", "vim", "dish wash"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 55 },
  { en: "Phenyl / Floor Cleaner", te: "ఫినాయిల్", hi: "फिनाइल", phonetic: ["phenyl", "finayil", "floor cleaner"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 50 },
  { en: "Washing Soap", te: "చాకలి సబ్బు", hi: "कपड़े धोने का साबुन", phonetic: ["chaakali sabbu", "kapde dhone ka sabun", "washing soap"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 25 },
  { en: "Sanitary Pads", te: "శానిటరీ ప్యాడ్స్", hi: "सैनिटरी पैड", phonetic: ["sanitary pads", "whisper", "stayfree"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 40 },
  { en: "Razor / Blade", te: "బ్లేడ్", hi: "ब्लेड / रेज़र", phonetic: ["blade", "razor"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 15 },
  { en: "Mosquito Coil", te: "దోమల కాయిల్", hi: "मच्छर कॉइल", phonetic: ["domala coil", "machar coil", "good knight", "allout"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 35 },
  { en: "Match Box", te: "అగ్గిపెట్టె", hi: "माचिस", phonetic: ["aggipette", "machis", "match box"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 5 },
  { en: "Candle", te: "కొవ్వొత్తి", hi: "मोमबत्ती", phonetic: ["kovvotthi", "mombatti", "candle"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 10 },
  { en: "Incense Sticks", te: "అగరబత్తీలు", hi: "अगरबत्ती", phonetic: ["agarabatteelu", "agarbatti", "dhoop"], category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, price: 20 },

  // Vegetables
  { en: "Onion", te: "ఉల్లిపాయలు", hi: "प्याज", phonetic: ["ullipayalu", "ulli", "pyaaz", "pyaj"], category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 30 },
  { en: "Potato", te: "బంగాళాదుంపలు", hi: "आलू", phonetic: ["bangaladumpalu", "bangala", "aloo", "aaloo"], category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 25 },
  { en: "Tomato", te: "టమాటాలు", hi: "टमाटर", phonetic: ["tamatalu", "tamatar", "tomato"], category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 30 },
  { en: "Green Chilli", te: "పచ్చి మిరపకాయలు", hi: "हरी मिर्च", phonetic: ["pacchi mirapakayalu", "mirchi", "hari mirch", "mirapa"], category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 40 },
  { en: "Ginger", te: "అల్లం", hi: "अदरक", phonetic: ["allam", "adrak"], category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 80 },
  { en: "Garlic", te: "వెల్లుల్లి", hi: "लहसुन", phonetic: ["vellulli", "lahsun", "lahsan"], category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 60 },
  { en: "Coriander Leaves", te: "కొత్తిమీర", hi: "धनिया पत्ती", phonetic: ["kothimeera", "kottimeera", "dhaniya patti"], category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 10 },
  { en: "Curry Leaves", te: "కరివేపాకు", hi: "करी पत्ता", phonetic: ["karivepaku", "kari patta", "curry leaves"], category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 5 },
  { en: "Lemon", te: "నిమ్మకాయలు", hi: "नींबू", phonetic: ["nimmakayalu", "nimbu", "neebu"], category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 40 },
  { en: "Coconut", te: "కొబ్బరికాయ", hi: "नारियल", phonetic: ["kobbarikaya", "nariyal", "kobbari"], category: { en: "Vegetables", te: "కూరగాయలు", hi: "सब्ज़ियां" }, price: 30 },

  // Fruits
  { en: "Banana", te: "అరటిపండ్లు", hi: "केला", phonetic: ["aratipandlu", "kela", "banana"], category: { en: "Fruits", te: "పండ్లు", hi: "फल" }, price: 40 },
  { en: "Apple", te: "ఆపిల్", hi: "सेब", phonetic: ["apple", "seb"], category: { en: "Fruits", te: "పండ్లు", hi: "फल" }, price: 150 },
  { en: "Orange", te: "నారింజ", hi: "संतरा", phonetic: ["narinja", "santra", "orange"], category: { en: "Fruits", te: "పండ్లు", hi: "फल" }, price: 60 },
  { en: "Grapes", te: "ద్రాక్ష", hi: "अंगूर", phonetic: ["draksha", "angoor", "angur", "grapes"], category: { en: "Fruits", te: "పండ్లు", hi: "फल" }, price: 80 },
];

/**
 * Search dictionary — matches English name, Telugu/Hindi text, AND phonetic spellings.
 * Type "uppu" → finds ఉప్పు (Salt). Type "pasupu" → finds పసుపు (Turmeric).
 */
export function searchDictionary(query: string): DictionaryItem[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return PRODUCT_DICTIONARY.filter(
    (item) =>
      item.en.toLowerCase().includes(q) ||
      item.te.includes(q) ||
      item.hi.includes(q) ||
      item.phonetic.some((p) => p.toLowerCase().includes(q))
  );
}

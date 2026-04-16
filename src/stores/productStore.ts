import { create } from "zustand";
import { Language } from "@/contexts/LanguageContext";

export interface CatalogProduct {
  id: number;
  name: Record<Language, string>;
  category: Record<Language, string>;
  qty: number;
  price: number;
  sales: number;
}

const INITIAL_PRODUCTS: CatalogProduct[] = [
  { id: 1, name: { en: "Tata Salt (1kg)", te: "టాటా ఉప్పు (1kg)", hi: "टाटा नमक (1kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, qty: 24, price: 28, sales: 120 },
  { id: 2, name: { en: "Amul Butter (500g)", te: "అముల్ వెన్న (500g)", hi: "अमूल मक्खन (500g)" }, category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, qty: 12, price: 270, sales: 45 },
  { id: 3, name: { en: "Maggi Noodles (4-pack)", te: "మ్యాగీ నూడుల్స్ (4-ప్యాక్)", hi: "मैगी नूडल्स (4-पैक)" }, category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, qty: 48, price: 56, sales: 200 },
  { id: 4, name: { en: "Surf Excel (1kg)", te: "సర్ఫ్ ఎక్సెల్ (1kg)", hi: "सर्फ एक्सेल (1kg)" }, category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, qty: 15, price: 199, sales: 30 },
  { id: 5, name: { en: "Aashirvaad Atta (5kg)", te: "ఆశీర్వాద్ ఆటా (5kg)", hi: "आशीर्वाद आटा (5kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, qty: 20, price: 295, sales: 80 },
  { id: 6, name: { en: "Parle-G Biscuits", te: "పార్లే-జి బిస్కెట్లు", hi: "पार्ले-जी बिस्कुट" }, category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, qty: 60, price: 10, sales: 300 },
  { id: 7, name: { en: "Brooke Bond Tea (250g)", te: "బ్రూక్ బాండ్ టీ (250g)", hi: "ब्रुक बॉन्ड चाय (250g)" }, category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, qty: 30, price: 110, sales: 95 },
  { id: 8, name: { en: "Fortune Oil (1L)", te: "ఫార్చ్యూన్ ఆయిల్ (1L)", hi: "फॉर्च्यून तेल (1L)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, qty: 18, price: 155, sales: 60 },
  { id: 9, name: { en: "Amul Milk (500ml)", te: "అముల్ పాలు (500ml)", hi: "अमूल दूध (500ml)" }, category: { en: "Dairy", te: "డెయిరీ", hi: "डेयरी" }, qty: 8, price: 30, sales: 150 },
  { id: 10, name: { en: "Colgate MaxFresh", te: "కోల్‌గేట్ మ్యాక్స్‌ఫ్రెష్", hi: "कोलगेट मैक्सफ्रेश" }, category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, qty: 22, price: 85, sales: 55 },
  { id: 11, name: { en: "Haldiram Namkeen (200g)", te: "హల్దీరామ్ నమ్‌కీన్ (200g)", hi: "हल्दीराम नमकीन (200g)" }, category: { en: "Snacks", te: "స్నాక్స్", hi: "स्नैक्स" }, qty: 35, price: 45, sales: 70 },
  { id: 12, name: { en: "Coca-Cola (750ml)", te: "కోకా-కోలా (750ml)", hi: "कोका-कोला (750ml)" }, category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, qty: 5, price: 40, sales: 85 },
  { id: 13, name: { en: "India Gate Basmati (1kg)", te: "ఇండియా గేట్ బాస్మతి (1kg)", hi: "इंडिया गेट बासमती (1kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, qty: 16, price: 180, sales: 40 },
  { id: 14, name: { en: "Dettol Soap (75g)", te: "డెట్టాల్ సబ్బు (75g)", hi: "डेटॉल साबुन (75g)" }, category: { en: "Personal Care", te: "పర్సనల్ కేర్", hi: "पर्सनल केयर" }, qty: 3, price: 42, sales: 90 },
  { id: 15, name: { en: "Nescafe Classic (50g)", te: "నెస్కేఫ్ క్లాసిక్ (50g)", hi: "नेस्कैफे क्लासिक (50g)" }, category: { en: "Beverages", te: "పానీయాలు", hi: "पेय पदार्थ" }, qty: 14, price: 160, sales: 50 },
  { id: 16, name: { en: "Sugar (1kg)", te: "చక్కెర (1kg)", hi: "चीनी (1kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, qty: 30, price: 45, sales: 110 },
  { id: 17, name: { en: "Toor Dal (1kg)", te: "కందిపప్పు (1kg)", hi: "तूर दाल (1kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, qty: 4, price: 140, sales: 75 },
  { id: 18, name: { en: "Rice (5kg)", te: "బియ్యం (5kg)", hi: "चावल (5kg)" }, category: { en: "Grocery", te: "కిరాణా", hi: "किराना" }, qty: 15, price: 320, sales: 65 },
];

interface ProductStore {
  products: CatalogProduct[];
  addProduct: (product: CatalogProduct) => void;
  removeProduct: (id: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: INITIAL_PRODUCTS,
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeProduct: (id) => set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
}));

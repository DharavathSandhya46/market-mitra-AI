import { Language } from "@/contexts/LanguageContext";

// Phonetic English-to-Telugu/Hindi transliteration maps
const teluguMap: Record<string, string> = {
  ksh: "క్ష", gn: "గ్న", tr: "ట్ర", pr: "ప్ర", br: "బ్ర", kr: "క్ర", gr: "గ్ర", dr: "డ్ర", fr: "ఫ్ర",
  sh: "శ", ch: "చ", th: "త", ph: "ఫ", bh: "భ", dh: "ధ", gh: "ఘ", jh: "ఝ", kh: "ఖ",
  ng: "ంగ", nk: "ంక", nd: "ండ", nt: "ంట", mp: "ంప", mb: "ంబ",
  aa: "ా", ee: "ీ", ii: "ీ", oo: "ూ", uu: "ూ", ai: "ై", au: "ౌ", ou: "ౌ",
  a: "అ", b: "బ", c: "క", d: "డ", e: "ఎ", f: "ఫ", g: "గ", h: "హ",
  i: "ఇ", j: "జ", k: "క", l: "ల", m: "మ", n: "న", o: "ఒ", p: "ప",
  q: "క్", r: "ర", s: "స", t: "ట", u: "ఉ", v: "వ", w: "వ",
  x: "క్స", y: "య", z: "జ",
};

const hindiMap: Record<string, string> = {
  ksh: "क्ष", gn: "ज्ञ", tr: "ट्र", pr: "प्र", br: "ब्र", kr: "क्र", gr: "ग्र", dr: "ड्र", fr: "फ्र",
  sh: "श", ch: "च", th: "थ", ph: "फ", bh: "भ", dh: "ध", gh: "घ", jh: "झ", kh: "ख",
  ng: "ंग", nk: "ंक", nd: "ंड", nt: "ंट", mp: "ंप", mb: "ंब",
  aa: "ा", ee: "ी", ii: "ी", oo: "ू", uu: "ू", ai: "ै", au: "ौ", ou: "ौ",
  a: "अ", b: "ब", c: "क", d: "ड", e: "ए", f: "फ", g: "ग", h: "ह",
  i: "इ", j: "ज", k: "क", l: "ल", m: "म", n: "न", o: "ओ", p: "प",
  q: "क़", r: "र", s: "स", t: "ट", u: "उ", v: "व", w: "व",
  x: "क्स", y: "य", z: "ज़",
};

function transliterateWord(word: string, map: Record<string, string>): string {
  let result = "";
  let i = 0;
  const lower = word.toLowerCase();

  while (i < lower.length) {
    // Try 3-char, 2-char, then 1-char matches
    if (i + 2 < lower.length && map[lower.substring(i, i + 3)]) {
      result += map[lower.substring(i, i + 3)];
      i += 3;
    } else if (i + 1 < lower.length && map[lower.substring(i, i + 2)]) {
      result += map[lower.substring(i, i + 2)];
      i += 2;
    } else if (map[lower[i]]) {
      result += map[lower[i]];
      i += 1;
    } else {
      // Keep non-alpha characters (numbers, spaces, punctuation) as-is
      result += word[i];
      i += 1;
    }
  }
  return result;
}

export function transliterate(text: string, lang: Language): string {
  if (lang === "en") return text;

  const map = lang === "te" ? teluguMap : hindiMap;

  return text
    .split(/(\s+)/)
    .map((segment) => {
      if (/^\s+$/.test(segment)) return segment;
      // Check if it's already in native script (non-ASCII) — don't re-transliterate
      if (/[^\x00-\x7F]/.test(segment)) return segment;
      return transliterateWord(segment, map);
    })
    .join("");
}

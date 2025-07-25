type Options = {
  mode: "string" | "decimal";
  withDecimal?: boolean;
};

export function formatPersianCurrency(price: number, options?: Options) {
  if (options?.mode === "string") {
    // Fully spelled-out
    const abs = Math.abs(price);
    const sign = price < 0 ? "-" : "";
    const spelledOut = numberToPersianWords(abs);
    return `${sign}${spelledOut} `;
  }

  const number = price.toString().split(".");
  let integer = number[0];
  const decimal = number[1];
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!options?.withDecimal) return integer;
  return decimal ? `${integer.replace("0", "")}.${decimal}` : integer;
}

const ones = [
  "",
  "یک",
  "دو",
  "سه",
  "چهار",
  "پنج",
  "شش",
  "هفت",
  "هشت",
  "نه",
  "ده",
  "یازده",
  "دوازده",
  "سیزده",
  "چهارده",
  "پانزده",
  "شانزده",
  "هفده",
  "هجده",
  "نوزده",
];
const tens = [
  "",
  "",
  "بیست",
  "سی",
  "چهل",
  "پنجاه",
  "شصت",
  "هفتاد",
  "هشتاد",
  "نود",
];
const hundreds = [
  "",
  "صد",
  "دویست",
  "سیصد",
  "چهارصد",
  "پانصد",
  "ششصد",
  "هفتصد",
  "هشتصد",
  "نهصد",
];
const scales = ["", "هزار", "میلیون", "میلیارد", "تریلیون"];
/**
 * Converts a numeric value to fully spelled-out Persian words.
 *
 * @example
 * const spelledOut = numberToPersianWords(100210500000);
 * // returns "صد میلیارد و دویست و ده هزار و پانصد"
 */
function numberToPersianWords(value: number) {
  if (value === 0) return "صفر";

  const sign = value < 0 ? "منفی " : "";
  let absValue = Math.abs(value);

  // Break the number into chunks of 3 digits
  const chunks = [];
  while (absValue > 0) {
    chunks.push(absValue % 1000);
    absValue = Math.floor(absValue / 1000);
  }

  // Converts a 3-digit chunk to Persian words
  function chunkToWords(num: number) {
    if (num === 0) return "";

    let result = "";
    const h = Math.floor(num / 100);
    const remainder = num % 100;
    const t = Math.floor(remainder / 10);
    const o = remainder % 10;

    // hundreds
    if (h > 0) {
      result += hundreds[h];
      if (remainder > 0) result += " و ";
    }

    // tens + ones
    if (remainder < 20 && remainder > 0) {
      result += ones[remainder];
    } else if (remainder >= 20) {
      result += tens[t];
      if (o > 0) {
        result += " و " + ones[o];
      }
    }

    return result.trim();
  }

  const wordsArray = [];
  for (let i = 0; i < chunks.length; i++) {
    const part = chunkToWords(chunks[i]);
    if (part) {
      wordsArray.push(part + (scales[i] ? " " + scales[i] : ""));
    }
  }

  return sign + wordsArray.reverse().join(" و ").trim();
}

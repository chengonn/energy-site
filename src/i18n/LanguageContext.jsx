import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from 'react';
import english from './en.json';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'heng-language';

function readLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'zh-Hant';
  } catch {
    return 'zh-Hant';
  }
}

// 保留資料中的 ID、圖示與欄位設定，只翻譯內容文字。
function translateContent(value, translate) {
  if (typeof value === 'string') return translate(value);
  if (Array.isArray(value)) return value.map((item) => translateContent(item, translate));
  if (value && typeof value === 'object' && !value.$$typeof) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        translateContent(item, translate),
      ]),
    );
  }
  return value;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readLanguage);
  const t = useCallback(
    (text) => (language === 'en' ? (english[text] ?? text) : text),
    [language],
  );
  const localize = useCallback((content) => translateContent(content, t), [t]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === 'en'
        ? 'HENG Energy | Business Energy Assessment'
        : '衡能 HENG｜企業節能';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        language === 'en'
          ? 'Explore business energy opportunities with HENG. Understand your facility and plan your next assessment.'
          : '衡能企業節能服務：看清用能盲點，建立改善路線。',
      );
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* 儲存受限時仍可在當頁切換。 */
    }
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t, localize }),
    [language, t, localize],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

import {
  translations,
  defaultLocale,
  type Locale,
  locales,
} from './translations';

export function getLocale(currentLocale: string | undefined): Locale {
  if (currentLocale && locales.includes(currentLocale as Locale)) {
    return currentLocale as Locale;
  }
  return defaultLocale;
}

export function t(
  locale: Locale,
  key: string,
  params?: Record<string, string>
): string {
  let text = translations[locale][key] ?? translations[defaultLocale][key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, v);
    }
  }
  return text;
}

export function getLocalizedPath(locale: Locale, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) {
    return cleanPath;
  }
  return `/${locale}${cleanPath}`;
}

export function getDateLocale(locale: Locale): string {
  const map: Record<Locale, string> = {
    ja: 'ja-JP',
    en: 'en-US',
    es: 'es-ES',
    hi: 'hi-IN',
  };
  return map[locale];
}

export function stripLocalePrefix(pathname: string): string {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
    if (pathname === `/${locale}`) {
      return '/';
    }
  }
  return pathname;
}

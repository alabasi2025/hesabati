/**
 * ثوابت التطبيق المشتركة
 */
export const APP_CONSTANTS = {
  LOCALE: {
    DEFAULT: 'ar-YE',
    AMOUNT: 'ar-SA',
  },
  CURRENCY: {
    SYMBOL: 'ر.ي',
  },
  API: {
    BASE_URL: '/api',
    AUTH_URL: '/api/auth',
  },
  STORAGE_KEYS: {
    TOKEN: 'hesabati_token',
    USER: 'hesabati_user',
    BIZ: 'hesabati_biz',
    THEME: 'hesabati_theme',
  },
  TIMEOUTS: {
    HEALTH_CHECK: 30000,
    AUTO_REFRESH: 30000,
    RECONNECT: 3000,
    MESSAGE_SUCCESS: 4000,
    MESSAGE_ERROR: 5000,
  },
} as const;

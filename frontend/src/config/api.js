const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
  },
  TRANSACTIONS: {
    BASE: `${API_BASE_URL}/api/transactions`,
    DASHBOARD: `${API_BASE_URL}/api/transactions/dashboard`,
  },
  CATEGORIES: {
    BASE: `${API_BASE_URL}/api/categories`,
  },
  REPORTS: {
    WEEKLY: `${API_BASE_URL}/api/reports/weekly`,
    MONTHLY: `${API_BASE_URL}/api/reports/monthly`,
    YEARLY: `${API_BASE_URL}/api/reports/yearly`,
    EXPORT_CSV: `${API_BASE_URL}/api/reports/export/csv`,
    EMAIL: `${API_BASE_URL}/api/reports/email`,
  },
  USER: {
    PROFILE: `${API_BASE_URL}/api/user/profile`,
  },
}

export default API_BASE_URL

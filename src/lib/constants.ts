export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:4000',
} as const

export const QUERY_KEYS = {
  HEALTH: ['health'],
  REQUESTS: ['requests'],
} as const


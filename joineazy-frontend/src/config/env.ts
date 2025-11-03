// src/config/env.ts
export function getEnv() {
  return {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
    useMSW: import.meta.env.VITE_USE_MSW === 'true',
    appName: import.meta.env.VITE_APP_NAME ?? 'Joineazy AMS'
  }
}

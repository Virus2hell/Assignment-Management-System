// src/api/http.ts
import axios from 'axios'
import { getEnv } from '../config/env'
import { useAuthStore } from '../store/auth.store'

const http = axios.create({
  baseURL: getEnv().apiBaseUrl
})

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default http

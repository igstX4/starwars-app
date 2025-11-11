import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { globalSemaphore, sleep } from './limiter'
import { API_BASE_URL } from '@/shared/config/env'

interface RetryConfig extends AxiosRequestConfig {
  __retryCount?: number
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
})

api.interceptors.request.use(async (config) => {
  await globalSemaphore.acquire()
  return config
})

api.interceptors.response.use(
  (response) => {
    globalSemaphore.release()
    return response
  },
  async (error) => {
    const status = error?.response?.status
    const config = error.config as RetryConfig | undefined
    
    if ((status === 429 || status === 503) && config) {
      const attempt = config.__retryCount ?? 0
      if (attempt < 2) {
        config.__retryCount = attempt + 1
        const delay = Math.min(1000 * 2 ** attempt, 4000)
        await sleep(delay)
        return api.request(config)
      }
    }
    
    globalSemaphore.release()
    const message = error?.response?.data?.message || error?.message || 'Network error'
    return Promise.reject(new Error(message))
  },
)
import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
})

apiClient.interceptors.request.use(
  async (config) => {

    let headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    }

    return {
      ...config,
      headers,
    }
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  async (response) => response.data,
  async (error) => Promise.reject(error)
)

const { get, post, put, patch, delete: destroy } = apiClient

export { get, post, put, patch, destroy }
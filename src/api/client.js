// @ts-check
import ky from 'ky'

// Currently only available in local mode
const API_URL = 'http://localhost:8080/api'

export const apiClient = ky.extend({
  prefixUrl: API_URL
})

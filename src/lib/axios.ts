import axios from 'axios'
import { base } from '../shared/api.routes'

export default axios.create({
  baseURL: base,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from './LinkInterface'
import { Manga2 } from './Manga2Interface'

export interface MangaList {
  current_page: number
  data: Manga2[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url?: any
  path: string
  per_page: number
  prev_page_url?: any
  to: number
  total: number
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from './LinkInterface'

export interface Datum {
  id: number
  title: string
  chapter: string
  user_id: number
  manga_over_view_id: number
  created_at: Date
  updated_at: Date
}

export interface ChapterList {
  current_page: number
  data: Datum[]
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

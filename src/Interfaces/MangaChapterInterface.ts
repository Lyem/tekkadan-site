import { MangaPage } from './MangaPageInterface'

export interface MangaChapter {
  id: number
  title: string
  chapter: string
  user_id: number
  manga_over_view_id: number
  created_at: Date
  updated_at: Date
  manga_pages: MangaPage[]
}

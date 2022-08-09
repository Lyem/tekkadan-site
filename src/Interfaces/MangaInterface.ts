import { Format } from './FormatInterface'
import { Status } from './StatusInterface'
import { Category } from './CategoryInterface'
import { Person } from './PersonInterface'

export interface Manga {
  id: number
  photo: string
  background_photo: string
  name: string
  synopsis: string
  views: number
  score: string
  created_at: Date
  updated_at: Date
  format: Format
  status: Status
  categories: Category[]
  people: Person[]
}

import { Pivot2 } from './Pivot2Interface'

export interface Person {
  id: number
  photo: string
  background_photo: string
  name: string
  birth?: any
  gender: string
  about: string
  twitter?: any
  facebook?: any
  instagram?: any
  anilist?: any
  myanimelist?: any
  youtube?: any
  website?: any
  created_at: Date
  updated_at: Date
  pivot: Pivot2
}

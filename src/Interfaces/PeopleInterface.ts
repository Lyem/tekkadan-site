export interface People {
  id: number
  photo: string
  background_photo: string
  name: string
  birth?: string | null
  gender: string
  about: string
  twitter?: string | null
  facebook?: string | null
  instagram?: string | null
  anilist?: string | null
  myanimelist?: string | null
  youtube?: string | null
  website?: string | null
  created_at: Date
  updated_at: Date
}

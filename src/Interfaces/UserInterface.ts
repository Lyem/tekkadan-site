export interface UserInterface {
  id: number
  name: string
  profile_photo: string
  background_photo: string
  about: string
  balance: number
  exp: number
  banned: boolean
  owner: boolean
  created_at: Date
  updated_at: Date
}

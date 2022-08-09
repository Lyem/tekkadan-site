import { Pivot } from './PivotInterface'

export interface Category {
  id: number
  name: string
  created_at: Date
  updated_at: Date
  pivot: Pivot
}

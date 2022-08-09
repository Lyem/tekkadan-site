import { AxiosResponse } from 'axios'
import { Category2 } from '../../Interfaces/Category2Interface'

export interface CategoryRepositoryInterface {
  getAllCategory(): Promise<AxiosResponse<Category2[]>>
  getCategoryById(id: number): Promise<AxiosResponse<Category2>>
  createCategory(name: string): Promise<AxiosResponse<Category2>>
  updateCategory(id: number, name: string): Promise<AxiosResponse<Category2>>
  delete(id: number): Promise<AxiosResponse>
}

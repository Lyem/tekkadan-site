import { AxiosResponse } from 'axios'
import { Category2 } from '../Interfaces/Category2Interface'
import axios from '../lib/axios'
import { category } from '../shared/api.routes'
import { CategoryRepositoryInterface } from './Contracts/CategoryRepositoryInterface'

export class CategoryRepository implements CategoryRepositoryInterface {
  getAllCategory(): Promise<AxiosResponse<Category2[]>> {
    return axios.get(category)
  }
  getCategoryById(id: number): Promise<AxiosResponse<Category2>> {
    return axios.get(`${category}/${id}`)
  }
  createCategory(name: string): Promise<AxiosResponse<Category2>> {
    return axios.post(category, { name: name })
  }
  updateCategory(id: number, name: string): Promise<AxiosResponse<Category2>> {
    return axios.put(`${category}/${id}`, { name: name })
  }
  delete(id: number): Promise<AxiosResponse> {
    return axios.delete(`${category}/${id}`)
  }
}

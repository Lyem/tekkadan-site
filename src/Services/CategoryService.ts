import axios from '../lib/axios'
import { csrfCookie } from '../shared/api.routes'
import { CategoryRepository } from '../Repositories/CategoryRepository'

export class CategoryService {
  private categoryRepository = new CategoryRepository()

  async getAllCategory() {
    await axios.get(csrfCookie)
    return await this.categoryRepository.getAllCategory()
  }

  async getCategoryById(id: number) {
    await axios.get(csrfCookie)
    return await this.categoryRepository.getCategoryById(id)
  }

  async createCategory(name: string) {
    await axios.get(csrfCookie)
    return await this.categoryRepository.createCategory(name)
  }

  async updateCategory(id: number, name: string) {
    await axios.get(csrfCookie)
    return await this.categoryRepository.updateCategory(id, name)
  }

  async deleteCategory(id: number) {
    await axios.get(csrfCookie)
    return await this.categoryRepository.delete(id)
  }
}

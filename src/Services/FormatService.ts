import axios from '../lib/axios'
import { csrfCookie } from '../shared/api.routes'
import { FormatRepository } from '../Repositories/FormatRepository'

export class FormatService {
  private formatRepository = new FormatRepository()

  async getAllFormat() {
    await axios.get(csrfCookie)
    return await this.formatRepository.getAllFormat()
  }

  async getFormatById(id: number) {
    await axios.get(csrfCookie)
    return await this.formatRepository.getFormatById(id)
  }

  async createFormat(name: string) {
    await axios.get(csrfCookie)
    return await this.formatRepository.createFormat(name)
  }

  async updateFormat(id: number, name: string) {
    await axios.get(csrfCookie)
    return await this.formatRepository.updateFormat(id, name)
  }

  async deleteFormat(id: number) {
    await axios.get(csrfCookie)
    return await this.formatRepository.delete(id)
  }
}

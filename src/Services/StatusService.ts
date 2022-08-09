import axios from '../lib/axios'
import { csrfCookie } from '../shared/api.routes'
import { StatusRepository } from '../Repositories/StatusRepository'

export class StatusService {
  private statusRepository = new StatusRepository()

  async getAllStatus() {
    await axios.get(csrfCookie)
    return await this.statusRepository.getAllStatus()
  }

  async getStatusById(id: number) {
    await axios.get(csrfCookie)
    return await this.statusRepository.getStatusById(id)
  }

  async createStatus(name: string) {
    await axios.get(csrfCookie)
    return await this.statusRepository.createStatus(name)
  }

  async updateStatus(id: number, name: string) {
    await axios.get(csrfCookie)
    return await this.statusRepository.updateStatus(id, name)
  }

  async deleteStatus(id: number) {
    await axios.get(csrfCookie)
    return await this.statusRepository.delete(id)
  }
}

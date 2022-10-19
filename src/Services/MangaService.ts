import { MangaRepository } from '../Repositories/MangaRepository'
import axios from '../lib/axios'
import { csrfCookie } from '../shared/api.routes'

export class MangaService {
  private mangaRepository = new MangaRepository()

  async createManga(
    name: string,
    categories: [],
    status: string,
    format: string,
    staffs: [],
    synopsis: string,
    alternativeName: string,
    background_photo: [],
    photo: []
  ) {
    await axios.get(csrfCookie)
    return await this.mangaRepository.createManga(
      name,
      categories,
      status,
      format,
      staffs,
      synopsis,
      alternativeName,
      background_photo,
      photo
    )
  }

  async plusView(id: number) {
    await axios.get(csrfCookie)
    await this.mangaRepository.plusViews(id)
  }

  async getAll(page?: number) {
    await axios.get(csrfCookie)
    return await this.mangaRepository.getAllManga(page)
  }

  async getAllMangaIds() {
    await axios.get(csrfCookie)
    return await this.mangaRepository.getAllMangaIds()
  }

  async getMangabyId(id: number) {
    await axios.get(csrfCookie)
    return await this.mangaRepository.getMangabyId(id)
  }

  async deleteMangabyId(id: number) {
    await axios.get(csrfCookie)
    return await this.mangaRepository.deleteManga(id)
  }
}

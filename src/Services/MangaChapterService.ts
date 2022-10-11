import axios from '../lib/axios'
import { MangaChapterRepository } from '../Repositories/MangaChapterRepository'
import { csrfCookie } from '../shared/api.routes'

export class MangaChapterService {
  private mangaChapterRepository = new MangaChapterRepository()

  async uploadCap(
    mangaId: number,
    pages: [],
    chapter: string,
    title?: string | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    progress?: (progressEvent: any) => void
  ) {
    await axios.get(csrfCookie)
    return await this.mangaChapterRepository.uploadCap(
      mangaId,
      pages,
      chapter,
      title,
      progress
    )
  }
  async getMangaLastsChapters() {
    await axios.get(csrfCookie)
    return await this.mangaChapterRepository.getLastsChapters()
  }
  async getIds() {
    await axios.get(csrfCookie)
    return await this.mangaChapterRepository.getCapsIds()
  }
  async getCapById(id: number) {
    await axios.get(csrfCookie)
    return await this.mangaChapterRepository.getCapById(id)
  }
  async getMangaCapsById(id: number) {
    await axios.get(csrfCookie)
    return await this.mangaChapterRepository.getMangaCapsById(id)
  }
  async getMangaAllCapsById(id: number) {
    await axios.get(csrfCookie)
    return await this.mangaChapterRepository.getMangaAllCapsById(id)
  }
  async delete(id: number) {
    await axios.get(csrfCookie)
    return await this.mangaChapterRepository.delete(id)
  }
}

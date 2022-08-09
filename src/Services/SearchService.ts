import axios from '../lib/axios'
import { SearchRepository } from '../Repositories/SearchRepository'
import { csrfCookie } from '../shared/api.routes'

export class SearchService {
  private searchRepository = new SearchRepository()

  async MangaSearch(query: string) {
    await axios.get(csrfCookie)
    return await this.searchRepository.searchManga(query)
  }

  async MangaAndUserSearch(query: string) {
    await axios.get(csrfCookie)
    return await this.searchRepository.searchMangaAndUser(query)
  }
}

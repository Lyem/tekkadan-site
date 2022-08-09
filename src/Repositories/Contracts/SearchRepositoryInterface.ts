import { AxiosResponse } from 'axios'
import { Manga2 } from '../../Interfaces/Manga2Interface'
import { Search } from '../../Interfaces/SearchInterface'

export interface SearchRepositoryInterface {
  searchManga(query: string): Promise<AxiosResponse<Manga2[]>>
  searchMangaAndUser(query: string): Promise<AxiosResponse<Search>>
}

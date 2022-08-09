import { AxiosResponse } from 'axios'
import { Manga2 } from '../Interfaces/Manga2Interface'
import { Search } from '../Interfaces/SearchInterface'
import axios from '../lib/axios'
import { search, searchManga } from '../shared/api.routes'
import { SearchRepositoryInterface } from './Contracts/SearchRepositoryInterface'

export class SearchRepository implements SearchRepositoryInterface {
  searchManga(query: string): Promise<AxiosResponse<Manga2[]>> {
    return axios.get(`${searchManga}/${query}`)
  }
  searchMangaAndUser(query: string): Promise<AxiosResponse<Search>> {
    return axios.get(`${search}/${query}`)
  }
}

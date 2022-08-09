import { AxiosResponse } from 'axios'
import { Id } from '../../Interfaces/IdInterface'
import { Manga } from '../../Interfaces/MangaInterface'
import { MangaList } from '../../Interfaces/MangaListInterface'

export interface MangaRepositoryInterface {
  getMangabyId(id: number): Promise<AxiosResponse<Manga>>
  getAllManga(): Promise<AxiosResponse<MangaList>>
  getAllMangaIds(): Promise<AxiosResponse<Id[]>>
  createManga(
    name: string,
    categories: [],
    status: string,
    format: string,
    staffs: [],
    synopsis: string,
    background_photo: [],
    photo: []
  ): Promise<AxiosResponse<Manga>>
}

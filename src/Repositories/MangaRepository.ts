/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Manga } from '../Interfaces/MangaInterface'
import { MangaRepositoryInterface } from './Contracts/MangaRepositoryInterface'
import axios from '../lib/axios'
import { manga, mangaIds } from '../shared/api.routes'
import { MangaList } from '../Interfaces/MangaListInterface'
import { AxiosResponse } from 'axios'
import { Id } from '../Interfaces/IdInterface'
import { DataURIToBlob } from '../shared/datauritoblob'

export class MangaRepository implements MangaRepositoryInterface {
  createManga(
    name: string,
    categories: [],
    status: string,
    format: string,
    staffs: [],
    synopsis: string,
    background_photo: [],
    photo: []
  ): Promise<AxiosResponse<Manga>> {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('format', format)
    formData.append('status', status)
    categories.map((category) => formData.append('categories[]', category))
    staffs.map((staff) => formData.append('staffs[]', staff))
    if (synopsis != '') {
      formData.append('synopsis', synopsis)
    }
    if (photo) {
      photo.map((photo) => {
        // @ts-ignore
        const file = DataURIToBlob(photo.base)
        // @ts-ignore
        formData.append('photo', file, `${photo.name}`)
      })
    }
    if (background_photo) {
      background_photo.map((background_photo) => {
        // @ts-ignore
        const file = DataURIToBlob(background_photo.base)
        // @ts-ignore
        formData.append('background_photo', file, `${background_photo.name}`)
      })
    }
    return axios.post(manga, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  getAllMangaIds(): Promise<AxiosResponse<Id[]>> {
    return axios.get(mangaIds)
  }
  getAllManga(): Promise<AxiosResponse<MangaList>> {
    return axios.get(manga)
  }
  getMangabyId(id: number): Promise<AxiosResponse<Manga>> {
    return axios.get(manga + `/${id}`).then()
  }
}

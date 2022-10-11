/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AxiosResponse } from 'axios'
import { Id } from '../Interfaces/IdInterface'
import { List } from '../Interfaces/ListInterface'
import { MangaChapter } from '../Interfaces/MangaChapterInterface'
import axios from '../lib/axios'
import {
  mangaChapter,
  mangaChapterIds,
  mangaChapters,
  mangaChaptersAll,
  mangaLastsChapters
} from '../shared/api.routes'
import { DataURIToBlob } from '../shared/datauritoblob'
import {
  chapterList,
  MangaChapterRepositoryInterface
} from './Contracts/MangaChapteRepositoryInterface'

export class MangaChapterRepository implements MangaChapterRepositoryInterface {
  getLastsChapters(): Promise<AxiosResponse<List<chapterList>>> {
    return axios.get(`${mangaLastsChapters}`)
  }
  getCapsIds(): Promise<AxiosResponse<Id[]>> {
    return axios.get(`${mangaChapterIds}`)
  }
  getMangaAllCapsById(id: number): Promise<AxiosResponse<MangaChapter[]>> {
    return axios.get(`${mangaChaptersAll}/${id}`)
  }
  uploadCap(
    mangaId: number,
    pages: [],
    chapter: string,
    title?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    progress?: (progressEvent: any) => void
  ): Promise<AxiosResponse<MangaChapter>> {
    const formData = new FormData()
    pages.map((page) => {
      // @ts-ignore
      const file = DataURIToBlob(page.base)
      // @ts-ignore
      formData.append('pages[]', file, `${page.name}`)
    })

    formData.append('chapter', chapter)
    formData.append('manga_id', `${mangaId}`)
    if (title) {
      formData.append('title', title)
    }
    return axios.post(mangaChapter, formData, {
      onUploadProgress: progress,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  getCapById(id: number): Promise<AxiosResponse<MangaChapter>> {
    return axios.get(`${mangaChapter}/${id}`)
  }
  getMangaCapsById(id: number): Promise<AxiosResponse<List<MangaChapter>>> {
    return axios.get(`${mangaChapters}/${id}`)
  }
  delete(id: number): Promise<AxiosResponse> {
    return axios.delete(`${mangaChapter}/${id}`)
  }
}

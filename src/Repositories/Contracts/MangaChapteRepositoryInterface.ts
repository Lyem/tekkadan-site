import { AxiosResponse } from 'axios'
import { Id } from '../../Interfaces/IdInterface'
import { List } from '../../Interfaces/ListInterface'
import { Manga2 } from '../../Interfaces/Manga2Interface'
import { MangaChapter } from '../../Interfaces/MangaChapterInterface'

export interface chapterList extends MangaChapter {
  manga_over_views: Manga2
}

export interface MangaChapterRepositoryInterface {
  uploadCap(
    mangaId: number,
    pages: [],
    chapter: string,
    title?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    progress?: (progressEvent: any) => void
  ): Promise<AxiosResponse<MangaChapter>>
  getCapById(id: number): Promise<AxiosResponse<MangaChapter>>
  getMangaCapsById(id: number): Promise<AxiosResponse<List<MangaChapter>>>
  getCapsIds(): Promise<AxiosResponse<Array<Id>>>
  getMangaAllCapsById(id: number): Promise<AxiosResponse<MangaChapter[]>>
  getLastsChapters(): Promise<AxiosResponse<List<chapterList>>>
  delete(id: number): Promise<AxiosResponse>
}

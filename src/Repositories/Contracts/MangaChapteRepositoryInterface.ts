import { AxiosResponse } from 'axios'
import { ChapterList } from '../../Interfaces/ChapterListInterface'
import { Id } from '../../Interfaces/IdInterface'
import { MangaChapter } from '../../Interfaces/MangaChapterInterface'

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
  getMangaCapsById(id: number): Promise<AxiosResponse<ChapterList>>
  getCapsIds(): Promise<AxiosResponse<Array<Id>>>
  getMangaAllCapsById(id: number): Promise<AxiosResponse<MangaChapter[]>>
  delete(id: number): Promise<AxiosResponse>
}

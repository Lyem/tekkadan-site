import { AxiosResponse } from 'axios'
import { Format } from '../../Interfaces/FormatInterface'

export interface FormatRepositoryInterface {
  getAllFormat(): Promise<AxiosResponse<Format[]>>
  getFormatById(id: number): Promise<AxiosResponse<Format>>
  createFormat(name: string): Promise<AxiosResponse<Format>>
  updateFormat(id: number, name: string): Promise<AxiosResponse<Format>>
  delete(id: number): Promise<AxiosResponse>
}

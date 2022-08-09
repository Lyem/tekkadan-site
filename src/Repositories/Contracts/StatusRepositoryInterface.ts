import { AxiosResponse } from 'axios'
import { Status } from '../../Interfaces/StatusInterface'

export interface StatusRepositoryInterface {
  getAllStatus(): Promise<AxiosResponse<Status[]>>
  getStatusById(id: number): Promise<AxiosResponse<Status>>
  createStatus(name: string): Promise<AxiosResponse<Status>>
  updateStatus(id: number, name: string): Promise<AxiosResponse<Status>>
  delete(id: number): Promise<AxiosResponse>
}

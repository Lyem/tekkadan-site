import { AxiosResponse } from 'axios'
import { Format } from '../Interfaces/FormatInterface'
import axios from '../lib/axios'
import { format } from '../shared/api.routes'
import { FormatRepositoryInterface } from './Contracts/FormatRepositoryInterface'

export class FormatRepository implements FormatRepositoryInterface {
  getAllFormat(): Promise<AxiosResponse<Format[]>> {
    return axios.get(format)
  }
  getFormatById(id: number): Promise<AxiosResponse<Format>> {
    return axios.get(`${format}/${id}`)
  }
  createFormat(name: string): Promise<AxiosResponse<Format>> {
    return axios.post(format, { name: name })
  }
  updateFormat(id: number, name: string): Promise<AxiosResponse<Format>> {
    return axios.put(`${format}/${id}`, { name: name })
  }
  delete(id: number): Promise<AxiosResponse> {
    return axios.delete(`${format}/${id}`)
  }
}

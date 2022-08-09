import { AxiosResponse } from 'axios'
import { Status } from '../Interfaces/StatusInterface'
import axios from '../lib/axios'
import { status } from '../shared/api.routes'
import { StatusRepositoryInterface } from './Contracts/StatusRepositoryInterface'

export class StatusRepository implements StatusRepositoryInterface {
  getAllStatus(): Promise<AxiosResponse<Status[]>> {
    return axios.get(status)
  }
  getStatusById(id: number): Promise<AxiosResponse<Status>> {
    return axios.get(`${status}/${id}`)
  }
  createStatus(name: string): Promise<AxiosResponse<Status>> {
    return axios.post(status, { name: name })
  }
  updateStatus(id: number, name: string): Promise<AxiosResponse<Status>> {
    return axios.put(`${status}/${id}`, { name: name })
  }
  delete(id: number): Promise<AxiosResponse> {
    return axios.delete(`${status}/${id}`)
  }
}

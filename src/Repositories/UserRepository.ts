import { UserInterface } from '../Interfaces/UserInterface'
import { UserRepositoryInterface } from './Contracts/UserRepositoryInterface'
import axios from '../lib/axios'
import { createUser, login, me } from '../shared/api.routes'
import { AxiosResponse } from 'axios'

export class UserRepository implements UserRepositoryInterface {
  Me(): Promise<AxiosResponse<UserInterface>> {
    return axios.get(me)
  }
  Logout(): Promise<AxiosResponse> {
    return axios.delete(login + '/12')
  }
  Login(
    email: string,
    password: string
  ): Promise<AxiosResponse<UserInterface>> {
    return axios.post(login, { email: email, password: password })
  }

  Register(
    name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<UserInterface>> {
    return axios.post(createUser, {
      name: name,
      email: email,
      password: password
    })
  }
}

import { UserInterface } from '../Interfaces/UserInterface'
import { UserRepositoryInterface } from './Contracts/UserRepositoryInterface'
import axios from '../lib/axios'
import { createUser, login } from '../shared/api.routes'
import { AxiosResponse } from 'axios'

export class UserRepository implements UserRepositoryInterface {
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

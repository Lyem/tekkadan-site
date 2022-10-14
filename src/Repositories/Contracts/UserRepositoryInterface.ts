import { AxiosResponse } from 'axios'
import { UserInterface } from '../../Interfaces/UserInterface'

export interface UserRepositoryInterface {
  Login(email: string, password: string): Promise<AxiosResponse<UserInterface>>
  Register(
    name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<UserInterface>>
  Logout(): Promise<AxiosResponse>
  Update(
    name?: string,
    tag?: string,
    about?: string,
    photo?: [],
    background?: []
  ): Promise<AxiosResponse<UserInterface>>
  Me(): Promise<AxiosResponse<UserInterface>>
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UserInterface } from '../Interfaces/UserInterface'
import { UserRepositoryInterface } from './Contracts/UserRepositoryInterface'
import axios from '../lib/axios'
import { createUser, login, me, userUpdate } from '../shared/api.routes'
import { AxiosResponse } from 'axios'
import { DataURIToBlob } from '../shared/datauritoblob'

export class UserRepository implements UserRepositoryInterface {
  Update(
    name?: string,
    tag?: string,
    about?: string,
    photo?: [],
    background?: []
  ): Promise<AxiosResponse<UserInterface>> {
    const formData = new FormData()
    if (name) {
      formData.append('name', name)
    }
    if (tag) {
      formData.append('tag', tag)
    }
    if (about) {
      formData.append('about', about)
    }
    if (photo) {
      photo.map((photo) => {
        // @ts-ignore
        const file = DataURIToBlob(photo.base)
        // @ts-ignore
        formData.append('profile_photo', file, `${photo.name}`)
      })
    }
    if (background) {
      background.map((background) => {
        // @ts-ignore
        const file = DataURIToBlob(background.base)
        // @ts-ignore
        formData.append('background_photo', file, `${background.name}`)
      })
    }
    return axios.post(userUpdate, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
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

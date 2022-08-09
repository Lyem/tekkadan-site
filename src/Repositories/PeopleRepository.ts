/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AxiosResponse } from 'axios'
import { People } from '../Interfaces/PeopleInterface'
import axios from '../lib/axios'
import { people, peopleUpdate } from '../shared/api.routes'
import { DataURIToBlob } from '../shared/datauritoblob'
import { PeopleRepositoryInterface } from './Contracts/PeopleRepositoryInterface'

export class PeopleRepository implements PeopleRepositoryInterface {
  getAllPeople(): Promise<AxiosResponse<People[]>> {
    return axios.get(people)
  }

  getPeopleById(id: number): Promise<AxiosResponse<People>> {
    return axios.get(`${people}/${id}`)
  }

  updatePeople(
    id: number,
    name: string,
    birth?: string,
    gender?: string,
    photo?: [],
    background_photo?: [],
    about?: string,
    twitter?: string,
    facebook?: string,
    instagram?: string,
    anilist?: string,
    myanimelist?: string,
    youtube?: string,
    website?: string
  ): Promise<AxiosResponse<People>> {
    const formData = new FormData()
    formData.append('name', name)
    if (birth) {
      formData.append('birth', birth)
    }
    if (gender) {
      formData.append('gender', gender)
    }
    if (photo) {
      photo.map((photo) => {
        // @ts-ignore
        const file = DataURIToBlob(photo.base)
        // @ts-ignore
        formData.append('photo', file, `${photo.name}`)
      })
    }
    if (background_photo) {
      background_photo.map((background_photo) => {
        // @ts-ignore
        const file = DataURIToBlob(background_photo.base)
        // @ts-ignore
        formData.append('background_photo', file, `${background_photo.name}`)
      })
    }
    if (about) {
      formData.append('about', about)
    }
    if (twitter) {
      formData.append('twitter', twitter)
    }
    if (facebook) {
      formData.append('facebook', facebook)
    }
    if (instagram) {
      formData.append('instagram', instagram)
    }
    if (anilist) {
      formData.append('anilist', anilist)
    }
    if (myanimelist) {
      formData.append('myanimelist', myanimelist)
    }
    if (youtube) {
      formData.append('youtube', youtube)
    }
    if (website) {
      formData.append('website', website)
    }
    return axios.post(`${peopleUpdate}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  createPeople(
    name: string,
    birth?: string,
    gender?: string,
    photo?: [],
    background_photo?: [],
    about?: string,
    twitter?: string,
    facebook?: string,
    instagram?: string,
    anilist?: string,
    myanimelist?: string,
    youtube?: string,
    website?: string
  ): Promise<AxiosResponse<People>> {
    const formData = new FormData()
    formData.append('name', name)
    if (birth) {
      formData.append('birth', birth)
    }
    if (gender) {
      formData.append('gender', gender)
    }
    if (photo) {
      photo.map((photo) => {
        // @ts-ignore
        const file = DataURIToBlob(photo.base)
        // @ts-ignore
        formData.append('photo', file, `${photo.name}`)
      })
    }
    if (background_photo) {
      background_photo.map((background_photo) => {
        // @ts-ignore
        const file = DataURIToBlob(background_photo.base)
        // @ts-ignore
        formData.append('background_photo', file, `${background_photo.name}`)
      })
    }
    if (about) {
      formData.append('about', about)
    }
    if (twitter) {
      formData.append('twitter', twitter)
    }
    if (facebook) {
      formData.append('facebook', facebook)
    }
    if (instagram) {
      formData.append('instagram', instagram)
    }
    if (anilist) {
      formData.append('anilist', anilist)
    }
    if (myanimelist) {
      formData.append('myanimelist', myanimelist)
    }
    if (youtube) {
      formData.append('youtube', youtube)
    }
    if (website) {
      formData.append('website', website)
    }
    return axios.post(people, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  delete(id: number): Promise<AxiosResponse> {
    return axios.delete(`${people}/${id}`)
  }
}

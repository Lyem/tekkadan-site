/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AxiosResponse } from 'axios'
import { Slider } from '../Interfaces/SliderInterface'
import axios from '../lib/axios'
import { slider } from '../shared/api.routes'
import { SliderRepositoryInterface } from './Contracts/SliderRepositoryInterface'
import { DataURIToBlob } from '../shared/datauritoblob'

export class SliderRepository implements SliderRepositoryInterface {
  getAllSlider(): Promise<AxiosResponse<Slider[]>> {
    return axios.get(slider)
  }
  createSlider(
    backgroundPhoto: [],
    titlePhoto: [],
    mangaId: string
  ): Promise<AxiosResponse<Slider>> {
    const formData = new FormData()
    if (backgroundPhoto) {
      backgroundPhoto.map((photo) => {
        // @ts-ignore
        const file = DataURIToBlob(photo.base)
        // @ts-ignore
        formData.append('background_photo', file, `${photo.name}`)
      })
    }

    if (titlePhoto) {
      titlePhoto.map((photo) => {
        // @ts-ignore
        const file = DataURIToBlob(photo.base)
        // @ts-ignore
        formData.append('title_photo', file, `${photo.name}`)
      })
    }

    formData.append('manga_over_view_id', mangaId)

    return axios.post(`${slider}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  updateSlider(
    id: number,
    backgroundPhoto: string,
    titlePhoto: string,
    mangaId: number
  ): Promise<AxiosResponse<Slider>> {
    throw new Error('Method not implemented.')
  }
  getById(id: number): Promise<AxiosResponse<Slider>> {
    throw new Error('Method not implemented.')
  }
  deleteSlider(id: number): Promise<null> {
    throw new Error('Method not implemented.')
  }
}

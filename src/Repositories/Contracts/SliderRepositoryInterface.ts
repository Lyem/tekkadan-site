import { AxiosResponse } from 'axios'
import { Slider } from '../../Interfaces/SliderInterface'

export interface SliderRepositoryInterface {
  getAllSlider(): Promise<AxiosResponse<Slider[]>>
  createSlider(
    backgroundPhoto: [],
    titlePhoto: [],
    mangaId: string
  ): Promise<AxiosResponse<Slider>>
  updateSlider(
    id: number,
    backgroundPhoto: string,
    titlePhoto: string,
    mangaId: number
  ): Promise<AxiosResponse<Slider>>
  getById(id: number): Promise<AxiosResponse<Slider>>
  deleteSlider(id: number): Promise<null>
}

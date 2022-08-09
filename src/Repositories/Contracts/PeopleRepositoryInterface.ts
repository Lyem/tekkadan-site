import { AxiosResponse } from 'axios'
import { People } from '../../Interfaces/PeopleInterface'

export interface PeopleRepositoryInterface {
  getAllPeople(): Promise<AxiosResponse<People[]>>
  getPeopleById(id: number): Promise<AxiosResponse<People>>
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
  ): Promise<AxiosResponse<People>>
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
  ): Promise<AxiosResponse<People>>
  delete(id: number): Promise<AxiosResponse>
}

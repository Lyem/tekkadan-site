import axios from '../lib/axios'
import { csrfCookie } from '../shared/api.routes'
import { PeopleRepository } from '../Repositories/PeopleRepository'

export class PeopleService {
  private peopleRepository = new PeopleRepository()

  async getAllPeople() {
    await axios.get(csrfCookie)
    return await this.peopleRepository.getAllPeople()
  }

  async getPeopleById(id: number) {
    await axios.get(csrfCookie)
    return await this.peopleRepository.getPeopleById(id)
  }

  async createPeople(
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
  ) {
    await axios.get(csrfCookie)
    return await this.peopleRepository.createPeople(
      name,
      birth,
      gender,
      photo,
      background_photo,
      about,
      twitter,
      facebook,
      instagram,
      anilist,
      myanimelist,
      youtube,
      website
    )
  }

  async updatePeople(
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
  ) {
    await axios.get(csrfCookie)
    return await this.peopleRepository.updatePeople(
      id,
      name,
      birth,
      gender,
      photo,
      background_photo,
      about,
      twitter,
      facebook,
      instagram,
      anilist,
      myanimelist,
      youtube,
      website
    )
  }

  async deletePeople(id: number) {
    await axios.get(csrfCookie)
    return await this.peopleRepository.delete(id)
  }
}

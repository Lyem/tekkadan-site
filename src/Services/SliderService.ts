import axios from '../lib/axios'
import { SliderRepository } from '../Repositories/SliderRepository'
import { csrfCookie } from '../shared/api.routes'

export class SliderService {
  private sliderRepository = new SliderRepository()

  async getAllSlider() {
    await axios.get(csrfCookie)
    return await this.sliderRepository.getAllSlider()
  }

  async createSlide(backgroundPhoto: [], titlePhoto: [], mangaId: string) {
    await axios.get(csrfCookie)
    return await this.sliderRepository.createSlider(
      backgroundPhoto,
      titlePhoto,
      mangaId
    )
  }
}

import { UserRepository } from '../Repositories/UserRepository'
import axios from '../lib/axios'
import { csrfCookie } from '../shared/api.routes'

export class UserService {
  private userRepository = new UserRepository()

  async Register(name: string, email: string, password: string) {
    await axios.get(csrfCookie)
    return await this.userRepository.Register(name, email, password)
  }

  async Login(email: string, password: string) {
    await axios.get(csrfCookie)
    return await this.userRepository.Login(email, password)
  }

  async Update(
    name?: string,
    tag?: string,
    about?: string,
    photo?: [],
    background?: []
  ) {
    await axios.get(csrfCookie)
    return await this.userRepository.Update(name, tag, about, photo, background)
  }

  async Me() {
    await axios.get(csrfCookie)
    return await this.userRepository.Me()
  }
}

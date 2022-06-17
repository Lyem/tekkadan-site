const _base = 'http://localhost/api/'

export default {
  routes: {
    createUser: _base + 'user',
    login: _base + 'auth',
    getUserByToken: _base + 'user/me',
    image: 'http://localhost/',
    logOut: _base + 'auth'
  }
}

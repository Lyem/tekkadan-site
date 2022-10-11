import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'
import { UserInterface } from '../Interfaces/UserInterface'

export interface UserState {
  logged: boolean
  data: UserInterface
}

const initialState: UserState = {
  logged: false,
  data: {
    id: 0,
    name: '',
    profile_photo: '',
    background_photo: '',
    about: '',
    balance: 0,
    exp: 0,
    banned: false,
    owner: false,
    created_at: new Date(),
    updated_at: new Date()
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.logged = true
    },
    logout: (state) => {
      state.logged = false
      state.data = initialState.data
    },
    setUserInfos: (state, action: PayloadAction<UserInterface>) => {
      state.data = action.payload
    }
  }
})

export const { login, logout, setUserInfos } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer

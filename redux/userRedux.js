import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isLoading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.error = null
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
      state.user = null
    },
    signupStart: (state) => {
      state.isLoading = true
    },
    signupSuccess: (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.error = null
    },
    signupFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
      state.user = null
    },
    logout: (state) => {
      state.user = null
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, signupStart, signupSuccess, signupFailure, logout } = userSlice.actions

export default userSlice.reducer

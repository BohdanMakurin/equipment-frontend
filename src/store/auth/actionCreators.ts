import { Dispatch } from "@reduxjs/toolkit"
import api from "../../api"
import { IEditRequest, ILoginRequest, ILoginResponse, IRegisterRequest } from "../../api/auth/types"
import { loginStart, loginSucess, loginFailure, logoutSuccess,loadProfileStart, loadProfileFailure, loadProfileSucess } from "./authReducer"
import { history } from '../../utils/history'
import { store } from ".."
import { AxiosPromise } from "axios"
import { isTokenExpired } from "../../utils/jwt"
import { Profile } from "../../models/models"

export const loginUser =
  (data: ILoginRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(loginStart())

        const res = await api.auth.login(data)
        localStorage.setItem('token', res.data.token);
        dispatch(loginSucess(res.data.token)) 
        
        
      } catch (e: any) {
        console.error(e)

        dispatch(loginFailure(e.message))
      }
    }

export const registerUser =
  (data: IRegisterRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(loginStart())
        
        const res = await api.auth.register(data)
        
        localStorage.setItem('token', res.data.token);
        dispatch(loginSucess(res.data.token)) 
        
      } catch (e: any) {
        console.error(e)

        dispatch(loginFailure(e.message))
      }
}

export const editProfile = (id: number, data: IEditRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(loadProfileStart())

      const res = await api.auth.editProfile(id, data)

      dispatch(loadProfileSucess(res.data))
      
    } catch (e: any) {
      console.error(e)

      dispatch(loadProfileFailure(e.message))
    }
  }

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
      try {
        // await api.auth.logout()
        localStorage.removeItem('token');
        dispatch(logoutSuccess())

        history.push('/')
      } catch (e) {
          console.error(e)
      }
  }

export const getProfile = (email: string) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(loadProfileStart())

      const res = await api.auth.getProfile(email)

      dispatch(loadProfileSucess(res.data))
      
    } catch (e: any) {
      console.error(e)

      dispatch(loadProfileFailure(e.message))
    }
  }

// // переменная для хранения запроса токена (для избежания race condition)
let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null

export const getAccessToken =
    () =>
    async (dispatch: Dispatch<any>): Promise<string | null> => {
        try {
            const accessToken = store.getState().auth.authData.accessToken

            if (!accessToken || isTokenExpired(accessToken)) {
              if (refreshTokenRequest === null) {
                  refreshTokenRequest = api.auth.refreshToken()
              }

              const res = await refreshTokenRequest
              refreshTokenRequest = null

              dispatch(loginSucess(res.data.token))

              return res.data.token
            }
            
            return accessToken
        } catch (e) {
            console.error(e)

            return null
        }
    }
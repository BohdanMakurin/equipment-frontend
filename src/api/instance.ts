import axios, { AxiosError } from 'axios'
import Endpoints from './endpoints'
import { store } from '../store'
import { getAccessToken, logoutUser } from '../store/auth/actionCreators'


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
})

const urlsSkipAuth = [Endpoints.AUTH.LOGIN, Endpoints.AUTH.REGISTER]

axiosInstance.interceptors.request.use(async (config) => {
    if (config.url && urlsSkipAuth.includes(config.url)) {
        return config
    }

    const accessToken = await store.dispatch(getAccessToken())

    if (accessToken) {
        const autharization = `Bearer ${accessToken}`
        
        config.headers['authorization'] = autharization
    }

    return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
      const isLoggedIn = !!store.getState().auth.authData.accessToken

    //   if ((error.response?.status === 401) && isLoggedIn && error.request.url !== Endpoints.AUTH.LOGOUT) {
    //       store.dispatch(logoutUser())
    //   }

      throw error
  }
)
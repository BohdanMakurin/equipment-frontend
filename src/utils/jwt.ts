import { getUnixTime } from "./date"

export interface IAuthTokenInfo {
    sub: string
    iat: number
    exp: number
}

const LIFE_TIME_TO_UPDATE_MULTIPLIER = 0.5

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
      return true
  }

  try {
      const tokenInfo = token.split('.')[1]
      const tokenInfoDecoded = window.atob(tokenInfo)
      const {sub, iat, exp }: IAuthTokenInfo = JSON.parse(tokenInfoDecoded)

      const tokenLeftTime = exp - getUnixTime()

      const minLifeTimeForUpdate = (exp - iat) * LIFE_TIME_TO_UPDATE_MULTIPLIER

      return tokenLeftTime < minLifeTimeForUpdate
  } catch (e) {
      console.error(e)
      return true
  }
}

export const getEmailFromToken = (): string | null => {
    const token = localStorage.getItem('token')
    if (!token) {
        return null
    }
    try {
        const tokenInfo = token.split('.')[1]
        const tokenInfoDecoded = window.atob(tokenInfo)
        const { sub }: IAuthTokenInfo = JSON.parse(tokenInfoDecoded)
        return sub
        
    } catch (e) {
        console.error(e)
        return null
    }
  }
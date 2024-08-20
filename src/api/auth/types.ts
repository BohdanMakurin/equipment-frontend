export interface ILoginRequest {
  email: string
  password: string
}
  
export interface ILoginResponse {
  token: string
}

export interface IRegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface IEditRequest {
  email: string
  firstName: string
  lastName: string
}
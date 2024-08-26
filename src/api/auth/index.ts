import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import { ILoginResponse, ILoginRequest, IRegisterRequest, IEditRequest } from "./types";
import { Profile } from "../../models/models";

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
  axiosInstance.post(Endpoints.AUTH.LOGIN, params)

export const register = (params: IRegisterRequest): AxiosPromise<ILoginResponse> =>
  axiosInstance.post(Endpoints.AUTH.REGISTER, params)

export const refreshToken = (): AxiosPromise<ILoginResponse> => axiosInstance.get(Endpoints.AUTH.REFRESH)

export const getProfile = (email: string): AxiosPromise<Profile> => axiosInstance.get(`/api/users/email/${email}`)

export const editProfile = (id: number, params: IEditRequest): AxiosPromise<Profile> => axiosInstance.put(`/api/users/${id}`, params)
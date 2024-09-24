import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import { CreateUserRequest, EditUserRequest, User } from "../../models/models";

export const getUsersByAdminId = (id: number): AxiosPromise<User[]> => axiosInstance.get(`/api/users/byAdmin/${id}`);
export const createUser = (data: CreateUserRequest): AxiosPromise<User> => axiosInstance.post(`/api/v1/create`, data);
export const deleteUser = (id: number): AxiosPromise<String> => axiosInstance.delete(`/api/users/${id}`);
export const updateUser = (id: number, params: EditUserRequest): AxiosPromise<User> => axiosInstance.put(`/api/users/workerUpdate/${id}`, params);
export const getUsersByCompanyId = (id: number): AxiosPromise<User[]> => axiosInstance.get(`/api/users/byCompany/${id}`);
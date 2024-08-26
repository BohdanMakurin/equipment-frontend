import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import { CreateUserRequest, User } from "./types";

export const getUsersByAdminId = (id: number): AxiosPromise<User[]> => axiosInstance.get(`/api/users/byAdmin/${id}`);
export const createUser = (data: CreateUserRequest): AxiosPromise<User> => axiosInstance.post(`/api/v1/create`, data);
export const deleteUser = (id: number): AxiosPromise<String> => axiosInstance.delete(`/api/users/${id}`);
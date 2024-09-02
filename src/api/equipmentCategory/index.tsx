import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import { Category, CreateCategoryRequest } from "../../models/models";

export const getCategories = (): AxiosPromise<Category[]> => axiosInstance.get(`/api/EquipmentCategory`);
export const createCategory = (data: CreateCategoryRequest): AxiosPromise<Category> => axiosInstance.post(`/api/EquipmentCategory`, data);
export const deleteCategory = (id: number): AxiosPromise<String> => axiosInstance.delete(`/api/EquipmentCategory/${id}`);
export const getCategoriesByAdminId = (id: number): AxiosPromise<Category[]> => axiosInstance.get(`/api/EquipmentCategory/byAdmin/${id}`);
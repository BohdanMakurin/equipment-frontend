import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import { CreateEquipmentRequest, Equipment, EquipmentEditRequest } from "../../models/models";

export const getEquipmentByAdminId = (id: number): AxiosPromise<Equipment[]> => axiosInstance.get(`/api/equipment/byAdmin/${id}`);
export const getEquipmentByUserId = (id: number): AxiosPromise<Equipment[]> => axiosInstance.get(`/api/equipment/byUser/${id}`);
export const getEquipmentByCompanyId = (id: number): AxiosPromise<Equipment[]> => axiosInstance.get(`/api/equipment/byCompany/${id}`);
export const createEquipment = (data: CreateEquipmentRequest): AxiosPromise<Equipment> => axiosInstance.post(`/api/equipment`, data);
export const deleteEquipment = (id: number): AxiosPromise<String> => axiosInstance.delete(`/api/equipment/${id}`);
export const updateEquipment = (id: number, params: EquipmentEditRequest): AxiosPromise<Equipment> => axiosInstance.put(`/api/equipment/${id}`, params)
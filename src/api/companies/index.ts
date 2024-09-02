import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import {  Company, CompanyEditRequest } from "../../models/models";
import { CreateCompanyRequest} from "../../models/models";

export const getCompaniesByAdminId = (id: number): AxiosPromise<Company[]> => axiosInstance.get(`/api/companies/byAdmin/${id}`);
export const getAllCompanies = (): AxiosPromise<Company[]> => axiosInstance.get(`/api/companies`);
export const createCompany = (data: CreateCompanyRequest): AxiosPromise<Company> => axiosInstance.post(`/api/companies`, data);
export const deleteCompany = (id: number): AxiosPromise<String> => axiosInstance.delete(`/api/companies/${id}`);
export const updateCompany = (id: number, params: CompanyEditRequest): AxiosPromise<Company> => axiosInstance.put(`/api/companies/${id}`, params)
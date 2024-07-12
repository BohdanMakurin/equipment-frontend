import { AxiosPromise } from "axios";
import Endpoints from "../endpoints";
import { axiosInstance } from "../instance";
import {  Company } from "./types";
import { Profile } from "../../models/models";

export const getCompaniesByUserId = (id: number): AxiosPromise<Company[]> => axiosInstance.get(`/api/companies/byAdmin/${id}`)
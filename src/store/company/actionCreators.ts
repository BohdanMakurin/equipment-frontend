import { Dispatch } from "@reduxjs/toolkit"
import api from "../../api"
import {
  loadCompaniesStart,
  loadCompaniesSuccess,
  loadCompaniesFailure,
  addCompany,
  updateCompany,
  deleteCompany
} from "./companyReducer"
import { Company, CompanyEditRequest, CreateCompanyRequest } from "../../models/models"

export const RESET_COMPANY_STORE = 'RESET_COMPANY_STORE';

export const resetCompanyStore = () => ({
    type: RESET_COMPANY_STORE,
});

// Action creator для загрузки всех компаний 
export const fetchAllCompanies = () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadCompaniesStart());
      const res = await api.companies.getAllCompanies();
      dispatch(loadCompaniesSuccess(res.data));
    } catch (e: any) {
      console.error(e);
      dispatch(loadCompaniesFailure(e.message));
    }
  }

// Action creator для загрузки всех компаний по айди админа
export const fetchCompaniesByAdminId = (id: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadCompaniesStart());
      const res = await api.companies.getCompaniesByAdminId(id);
      dispatch(loadCompaniesSuccess(res.data));
    } catch (e: any) {
      console.error(e);
      dispatch(loadCompaniesFailure(e.message));
    }
  }

// Action creator для добавления новой компании
export const createCompany = (company: CreateCompanyRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const res = await api.companies.createCompany(company)
      dispatch(addCompany(res.data));
    } catch (e: any) {
      console.error(e)
      dispatch(loadCompaniesFailure(e.message))
    }
  }

//Action creator для удаления компании
export const removeCompany = (companyId: number) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      await api.companies.deleteCompany(companyId)
      dispatch(deleteCompany(companyId))
    } catch (e: any) {
      console.error(e)
      dispatch(loadCompaniesFailure(e.message))
    }
  }
// Action creator для обновления компании
export const editCompany = (companyId: number, updatedCompany: CompanyEditRequest) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const res = await api.companies.updateCompany(companyId, updatedCompany)
      dispatch(updateCompany(res.data))
    } catch (e: any) {
      console.error(e)
      dispatch(loadCompaniesFailure(e.message))
    }
  }



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
import { Company } from "../../models/models"

// Action creator для загрузки всех компаний
export const fetchCompaniesByUserId = (id: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadCompaniesStart());
      const res = await api.companies.getCompaniesByUserId(id);
      dispatch(loadCompaniesSuccess(res.data));
    } catch (e: any) {
      console.error(e);
      dispatch(loadCompaniesFailure(e.message));
    }
  }

// Action creator для добавления новой компании
// export const createCompany = (company: Company) =>
//   async (dispatch: Dispatch<any>): Promise<void> => {
//     try {
//       const res = await api.companies.create(company)
//       dispatch(addCompany(res.data))
//     } catch (e: any) {
//       console.error(e)
//       dispatch(loadCompaniesFailure(e.message))
//     }
//   }

// Action creator для обновления компании
// export const editCompany = (company: Company) =>
//   async (dispatch: Dispatch<any>): Promise<void> => {
//     try {
//       const res = await api.companies.update(company.companyId, company)
//       dispatch(updateCompany(res.data))
//     } catch (e: any) {
//       console.error(e)
//       dispatch(loadCompaniesFailure(e.message))
//     }
//   }

// Action creator для удаления компании
// export const removeCompany = (companyId: number) =>
//   async (dispatch: Dispatch<any>): Promise<void> => {
//     try {
//       await api.companies.delete(companyId)
//       dispatch(deleteCompany(companyId))
//     } catch (e: any) {
//       console.error(e)
//       dispatch(loadCompaniesFailure(e.message))
//     }
//   }

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CompanyAdmin, User} from '../../models/models'
import { Company } from '../../models/models'


interface CompanyState {
  companies: Company[]
  isLoading: boolean
  error: string | null
}

const initialState: CompanyState = {
  companies: [],
  isLoading: false,
  error: null,
}

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    loadCompaniesStart: (state): CompanyState => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    loadCompaniesSuccess: (state, action: PayloadAction<Company[]>): CompanyState => ({
      ...state,
      companies: action.payload,
      isLoading: false,
      error: null,
    }),
    loadCompaniesFailure: (state, action: PayloadAction<string>): CompanyState => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    addCompany: (state, action: PayloadAction<Company>): CompanyState => ({
      ...state,
      companies: [...state.companies, action.payload],
    }),
    updateCompany: (state, action: PayloadAction<Company>): CompanyState => ({
      ...state,
      companies: state.companies.map(company =>
        company.companyId === action.payload.companyId ? action.payload : company
      ),
    }),
    deleteCompany: (state, action: PayloadAction<number>): CompanyState => ({
      ...state,
      companies: state.companies.filter(company => company.companyId !== action.payload),
    }),
    resetCompanies: (state): CompanyState => ({
      ...initialState,
    }),
  },
})

export const {
  loadCompaniesStart,
  loadCompaniesSuccess,
  loadCompaniesFailure,
  addCompany,
  updateCompany,
  deleteCompany,
  resetCompanies,
} = companySlice.actions

export default companySlice.reducer

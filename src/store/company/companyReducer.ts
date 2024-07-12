import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Admin {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  createdAt: string
  updatedAt: string
  enabled: boolean
  authorities: { authority: string }[]
  username: string
  accountNonLocked: boolean
  accountNonExpired: boolean
  credentialsNonExpired: boolean
}

interface Company {
  companyId: number
  admin: Admin
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

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
  },
})

export const {
  loadCompaniesStart,
  loadCompaniesSuccess,
  loadCompaniesFailure,
  addCompany,
  updateCompany,
  deleteCompany,
} = companySlice.actions

export default companySlice.reducer

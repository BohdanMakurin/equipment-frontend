import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authReducer'
import { useDispatch } from 'react-redux'

import logger from 'redux-logger'
import companyReducer from './company/companyReducer'
import userReducer from './user/userReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    companies: companyReducer,
    users: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ? [logger] : [])),
})


export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
import { configureStore } from '@reduxjs/toolkit'
import productReducer from './product/productSlice'
import authReducer from './product/authSlice'

export const store = configureStore({
    reducer: {
      auth : authReducer,
      product : productReducer,
    }
  })
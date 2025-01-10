import { configureStore } from '@reduxjs/toolkit'
import productReducer from './product/productSlice'
import authReducer from './product/authSlice'
import searchReducer from './product/searchSlice'

export const store = configureStore({
    reducer: {
      auth : authReducer,
      product : productReducer,
      search : searchReducer
    }
  })
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [], // Remove the default product value
}

export const productSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload
      state.products.push(product)
    },
    removeProduct: (state, action) => {
      const product = action.payload
      // Using filter instead of pop to remove the specific product
      state.products = state.products.filter(p => p.id !== product.id)
    }
  },
})

export const { addProduct, removeProduct } = productSlice.actions

export default productSlice.reducer

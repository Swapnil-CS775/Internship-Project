import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [{id:404, name:"Omkar ka product"}],
}

export const productSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    addProduct : (state,action)=>{
      const product = action.payload
      state.products.push(product);
    },
    removeProduct : (state,action)=>{
      const product = action.payload
      state.products.pop(product);
    }
  },
})

export const { addProduct, removeProduct } = productSlice.actions

export default productSlice.reducer
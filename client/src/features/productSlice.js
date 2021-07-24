import { createSlice } from '@reduxjs/toolkit'


export const productSlice = createSlice({
    name: 'product',
    initialState: {
      products: []
    },
    reducers: {
        UPDATE_PRODUCTS(state,action){
      return {
        ...state,
        products: [...action.products],
      };
    }
}})

 // Action creators are generated for each case reducer function
 export const { UPDATE_PRODUCTS} = productSlice.actions
  
 export default productSlice.reducer
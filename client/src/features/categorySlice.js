import { createSlice } from '@reduxjs/toolkit'


export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        currentCategory: '',
        categories: [],
    },
    reducers: {
        UPDATE_CATEGORIES(state,action){
      return {
        ...state,
        categories: [...action.categories],
      };
    },

    UPDATE_CURRENT_CATEGORY(state,action){
      return {
        ...state,
        currentCategory: action.currentCategory
      };
    }
}}
);
        
 // Action creators are generated for each case reducer function
 export const { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } = categorySlice.actions
  
 export default categorySlice.reducer
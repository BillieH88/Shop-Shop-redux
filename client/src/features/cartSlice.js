import { createSlice } from '@reduxjs/toolkit'


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      cartOpen: false,
      cart: [],
    },
    reducers: {

ADD_TO_CART (state,action){

    return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      }
},
    ADD_MULTIPLE_TO_CART(state,action){
    
    return {
        ...state,
        cart: [...state.cart, ...action.products],
    }
},
UPDATE_CART_QUANTITY(state,action) {
  let cartClone = JSON.parse(JSON.stringify(state.cart))
  let newCart = cartClone.map(product => {
    if (action._id === product._id) {
      const newQuantity = action.purchaseQuantity
      product.purchaseQuantity = newQuantity
    }
    return product
  })
    return {
    ...state,
    cartOpen: true,
    cart : newCart
    };
},
REMOVE_FROM_CART(state,action){
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    },
CLEAR_CART(state,){
    return {
      ...state,
      cartOpen: false,
      cart: []
    };
},

TOGGLE_CART(state) {
    return {
      ...state,
      cartOpen: !state.cartOpen
    };
},
     
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
      
      
}
})

  
  // Action creators are generated for each case reducer function
  export const { ADD_TO_CART, UPDATE_CART_QUANTITY,REMOVE_FROM_CART,ADD_MULTIPLE_TO_CART, CLEAR_CART,TOGGLE_CART} = cartSlice.actions
  
  export default cartSlice.reducer
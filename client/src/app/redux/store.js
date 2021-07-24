//https://redux-toolkit.js.org/api/configureStore ->
// Documentation example:
// import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './reducers'
// const store = configureStore({ reducer: rootReducer })
// export default reducer
import {combineReducers, createStore} from 'redux'
import cartReducer from '../../features/cartSlice'
import categoryReducer from '../../features/categorySlice'
import productReducer from '../../features/productSlice'

const rootReducer = combineReducers({
    cart:cartReducer,
    category:categoryReducer,
    product: productReducer
})

const store = createStore(rootReducer)

export default store

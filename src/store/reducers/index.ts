import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { productReducer } from './productReducer'
import { storiesReducer } from './storiesReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
   auth: authReducer,
   products: productReducer,
   stories: storiesReducer,
   user: userReducer
})

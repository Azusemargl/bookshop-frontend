import { combineReducers } from 'redux'
import { appReducer } from './appReducer'
import { authReducer } from './authReducer'
import { storiesReducer } from './storiesReducer'
import { userReducer } from './userReducer'
import { bookReducer } from './bookReducer'
import { cartReducer } from './cartReducer'

export const rootReducer = combineReducers({
   app: appReducer,
   auth: authReducer,
   stories: storiesReducer,
   user: userReducer,
   books: bookReducer,
   cart: cartReducer
})

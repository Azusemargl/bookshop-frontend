import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { storiesReducer } from './storiesReducer'
import { userReducer } from './userReducer'
import { bookReducer } from './bookReducer'

export const rootReducer = combineReducers({
   auth: authReducer,
   stories: storiesReducer,
   user: userReducer,
   books: bookReducer
})

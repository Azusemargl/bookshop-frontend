import { BaseThunk } from './../store';
import { InferAction } from "../store"
import { Login } from "../../types/authTypes"

// Initial data
const initialState = {
   email: null as string | null,
   login: null as string | null
}

// Reducer body
export const authReducer = (state = initialState, action: Action): InitialState => {
   switch (action.type) {
      case 'AUTH/SET_AUTH':
         return {...state, ...action.payload}
   
      default:
         return state
   }
}

// Acions
export const actions = {
   login: (payload: Login) => ({ type: 'AUTH/SET_AUTH', payload }) as const
}

// Thunks
export const signIn = (value: Login): Thunk => async dispatch => {
   dispatch(actions.login(value))
}
export const signUp = (value: Login): Thunk => async dispatch => {
   dispatch(actions.login(value))
}

// Types
type InitialState = typeof initialState
type Action = InferAction<typeof actions>
type Thunk = BaseThunk<Action>

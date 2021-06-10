import { BaseThunk } from './../store'
import { InferAction } from "../store"
import { userAPI } from '../../utils/api/user.api'
import { Auth, Register } from "../../types/authTypes"
import { userFetch } from './userReducer'

// Initial data
const initialState = {
   app: false,
   errors: {
      loginError: null as string | null,
      registerError: null as string | null
   },
   isLoading: false
}

// Reducer body
export const authReducer = (state = initialState, action: Action): InitialState => {
   switch (action.type) {
      case 'AUTH/SET_APP':
         return { ...state, app: action.payload }

      case 'AUTH/SET_LOADING':
         return { ...state, isLoading: action.payload }

      case 'AUTH/SET_LOGIN_MESSAGE':
         return { ...state, errors: { loginError: action.payload, registerError: null } }

      case 'AUTH/SET_REGISTER_MESSAGE':
         return { ...state, errors: { loginError: null, registerError: action.payload } }

      case 'AUTH/REMOVE_MESSAGE':
         return { ...state, errors: { loginError: action.payload, registerError: action.payload } }

      default:
         return state
   }
}

// Acions
export const actions = {
   setLoginMessage: (payload: string | null) => ({ type: 'AUTH/SET_LOGIN_MESSAGE', payload }) as const,
   setRegisterMessage: (payload: string | null) => ({ type: 'AUTH/SET_REGISTER_MESSAGE', payload }) as const,
   removeMessage: () => ({ type: 'AUTH/REMOVE_MESSAGE', payload: null }) as const,
   setApp: (payload: boolean) => ({ type: 'AUTH/SET_APP', payload }) as const,
   setLoading: (payload: boolean) => ({ type: 'AUTH/SET_LOADING', payload }) as const
}

// Thunks
// Send user data to server for auth and set user token to cookie
export const signIn = (value: Auth): Thunk => async dispatch => {
   const res = await userAPI.login(value.email, value.password)

   if (res.message) {
      dispatch(actions.setLoginMessage(res.message))
   } else {
      dispatch(auth(res.token))
   }
}
// Send candidate data to registration and request sign in thunk for the following auth
export const signUp = (value: Register): Thunk => async dispatch => {
   const res = await userAPI.register(value.login, value.email, value.password)

   if (res.message) {
      dispatch(actions.setRegisterMessage(res.message))
   } else {
      dispatch(signIn(value))
   }
}
// Get user token and send it for veritify to remain auth after page refresh
export const auth = (token: string): Thunk => async dispatch => {
   dispatch(actions.setLoading(true))
   const res = await userAPI.auth(token)
   try {
      dispatch(userFetch(res, token))
      dispatch(actions.setLoading(false))
      dispatch(actions.setApp(true))
   } catch(e) {
      console.log(`Error: ${e}`)
      dispatch(actions.setLoading(false))
   }
}

// Types
type InitialState = typeof initialState
type Action = InferAction<typeof actions>
type Thunk = BaseThunk<Action>

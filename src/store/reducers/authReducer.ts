import { BaseThunk } from './../store'
import { InferAction } from "../store"
import { userAPI } from '../../utils/api/user.api'
import { delete_cookie } from '../../utils/helpers/cookies'
import { Auth, Login, Register } from "../../types/authTypes"

// Initial data
const initialState = {
   auth:    false,
   id:      null as string | null,
   login:   null as string | null,
   email:   null as string | null,
   avatar:  null as string | null,
   role:    null as Array<string> | null,
   token:   null as string | null,
   errors: {
      loginError: null as string | null,
      registerError: null as string | null
   },
}

// Reducer body
export const authReducer = (state = initialState, action: Action): InitialState => {
   switch (action.type) {
      case 'AUTH/SET_AUTH':
         return {...state, ...action.payload}

      case 'AUTH/SET_LOGIN_MESSAGE':
         return {...state, errors: {loginError: action.payload, registerError: null}}

      case 'AUTH/SET_REGISTER_MESSAGE':
         return {...state, errors: {loginError: null, registerError: action.payload}}

      case 'AUTH/REMOVE_MESSAGE':
         return {...state, errors: {loginError: action.payload, registerError: action.payload}}

      default:
         return state
   }
}

// Acions
export const actions = {
   setUser: (payload: Login) => ({ type: 'AUTH/SET_AUTH', payload }) as const,
   logout: () => ({ type: 'AUTH/SET_AUTH', payload: {
      auth:   false,
      id:     null,
      login:  null,
      email:  null,
      avatar: null,
      role:   null,
      token:  null
   }}) as const,
   setLoginMessage: (payload: string | null) => ({ type: 'AUTH/SET_LOGIN_MESSAGE', payload }) as const,
   setRegisterMessage: (payload: string | null) => ({ type: 'AUTH/SET_REGISTER_MESSAGE', payload }) as const,
   removeMessage: () => ({ type: 'AUTH/REMOVE_MESSAGE', payload: null }) as const,
}

// Thunks
// Send user data to server for auth and set user token to cookie
export const signIn = (value: Auth): Thunk => async dispatch => {
   const res = await userAPI.login(value.email, value.password)

   if (res.message) {
      dispatch(actions.setLoginMessage(res.message))
   } else {
      dispatch(auth(res.token))
      delete_cookie('token')
      document.cookie = `token=${res.token}`
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
   const res = await userAPI.auth(token)

   try {
      dispatch(actions.setUser(res))
   } catch(e) {
      console.log(`Error: ${e}`);
   }
}
// Delete auth coockie and user data from state
export const logout = (): Thunk => async dispatch => {
   dispatch(actions.logout())
   delete_cookie('token')
}

// Types
type InitialState = typeof initialState
type Action = InferAction<typeof actions>
type Thunk = BaseThunk<Action>

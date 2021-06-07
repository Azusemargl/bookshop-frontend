import { BaseThunk } from './../store'
import { InferAction } from "../store"
import { userAPI } from '../../utils/api/user.api'
import { Auth, Login, Register } from "../../types/authTypes"
import { Books } from '../../types/bookTypes'

// Initial data
const initialState = {
   app: false,
   auth: false,
   id: null as string | null,
   login: null as string | null,
   email: null as string | null,
   avatar: null as string | null,
   role: null as Array<string> | null,
   token: null as string | null,
   city: 'Москва',
   gender: '' as 'M' | 'F',
   orders: [
      {
         "id": 1,
         "name": "Атака титанов. Книга 1",
         "image": "https://cdn1.ozone.ru/s3/multimedia-d/wc1200/6011956477.jpg",
         "author": "Исаяма Хадзимэ",
         "rating": 5,
         "review": 723,
         "price": 495,
         "past_price": 569,
         "category": "Манга",
         "year_of_issue": 2021,
         "date": 1622617937313,
         "sales": 5672
      },
      {
         "id": 2,
         "name": "Технологическая сингулярность",
         "image": "https://cdn1.ozone.ru/multimedia/wc1200/1017508200.jpg",
         "author": "Шанахан Мюррей",
         "rating": 4,
         "review": 31,
         "price": 325,
         "past_price": 387,
         "category": "Наука",
         "yaer": 2016,
         "date": 1622617937314,
         "sales": 150
      },
      {
         "id": 3,
         "name": "ДНК и её человек",
         "image": "https://cdn1.ozone.ru/multimedia/wc500/1036752299.jpg",
         "author": "Клещенко Елена",
         "rating": 4,
         "review": 9,
         "price": 368,
         "past_price": 413,
         "category": "Наука",
         "yaer": 2020,
         "date": 1622617937315,
         "sales": 43
      }
   ] as Array<Books>,
   createdAt: null as Date | null,
   errors: {
      loginError: null as string | null,
      registerError: null as string | null
   },
   isLoading: false
}

// Reducer body
export const authReducer = (state = initialState, action: Action): InitialState => {
   switch (action.type) {
      case 'AUTH/SET_AUTH':
         return { ...state, ...action.payload }

      case 'AUTH/SET_APP':
         return { ...state, app: action.payload }

      case 'AUTH/SET_LOADING':
         return { ...state, isLoading: action.payload }

      case 'AUTH/SET_TOKEN':
         return { ...state, token: action.payload }

      case 'AUTH/SET_LOGIN_MESSAGE':
         return { ...state, errors: { loginError: action.payload, registerError: null } }

      case 'AUTH/SET_REGISTER_MESSAGE':
         return { ...state, errors: { loginError: null, registerError: action.payload } }

      case 'AUTH/REMOVE_MESSAGE':
         return { ...state, errors: { loginError: action.payload, registerError: action.payload } }

      case 'AUTH/SET_AVATAR':
         return { ...state, avatar: action.payload }

      default:
         return state
   }
}

const logoutData = {
   auth: false,
   id: null,
   login: null,
   email: null,
   avatar: null,
   role: null,
   token: null
}

// Acions
export const actions = {
   setUser: (payload: Login) => ({ type: 'AUTH/SET_AUTH', payload }) as const,
   logout: () => ({ type: 'AUTH/SET_AUTH', payload: logoutData }) as const,
   setLoginMessage: (payload: string | null) => ({ type: 'AUTH/SET_LOGIN_MESSAGE', payload }) as const,
   setRegisterMessage: (payload: string | null) => ({ type: 'AUTH/SET_REGISTER_MESSAGE', payload }) as const,
   removeMessage: () => ({ type: 'AUTH/REMOVE_MESSAGE', payload: null }) as const,
   setAvatar: (payload: string) => ({ type: 'AUTH/SET_AVATAR', payload }) as const,
   setApp: (payload: boolean) => ({ type: 'AUTH/SET_APP', payload }) as const,
   setToken: (payload: string) => ({ type: 'AUTH/SET_TOKEN', payload }) as const,
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
      dispatch(actions.setUser(res))
      dispatch(actions.setToken(token))
      dispatch(actions.setLoading(false))
      dispatch(actions.setApp(true))
   } catch (e) {
      console.log(`Error: ${e}`)
      dispatch(actions.setLoading(false))
   }
}
// Delete auth coockie and user data from state
export const logout = (): Thunk => async dispatch => {
   dispatch(actions.logout())
}
// Send image file to server for save
export const savePhoto = (file: File): Thunk => async dispatch => {
   dispatch(actions.setAvatar(file.name))
}

// Types
type InitialState = typeof initialState
type Action = InferAction<typeof actions>
type Thunk = BaseThunk<Action>

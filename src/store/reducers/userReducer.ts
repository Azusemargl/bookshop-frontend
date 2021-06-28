import { BaseThunk } from './../store'
import { InferAction } from "../store"
import { userAPI } from '../../utils/api/user.api'
import { Login } from "../../types/authTypes"
import { Books } from '../../types/bookTypes'

// Initial data
const initialState = {
   auth: false,
   id: null as string | null,
   login: null as string | null,
   email: null as string | null,
   password: null as string | null,
   newPassword: null as string | null,
   avatar: {
      photo: null as string | null,
      error: null as string | null 
   },
   role: null as Array<string> | null,
   balance: 0,
   scores: 0,
   favorites: [] as Array<Books>,
   cart: null as string | null,
   token: null as string | null,
   city: 'Москва',
   gender: '' as 'M' | 'F',
   createdAt: null as Date | null,
   orders: [
      {
         "_id": "1",
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
         "_id": "2",
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
         "_id": "3",
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
   message: null as string | null,
   isLoading: false
}

// Reducer body
export const userReducer = (state = initialState, action: Action): InitialState => {
   switch (action.type) {
      case 'USER/SET_AUTH':
         return { ...state, ...action.payload }

      case 'USER/SET_TOKEN':
         return { ...state, token: action.payload }

      case 'USER/SET_AVATAR':
         return { ...state, avatar: { photo: action.payload.photo, error: action.payload.error } }

      case 'USER/SET_FAVORITES':
         return { ...state, favorites: action.payload }

      case 'USER/REMOVE_FAVORITES':
         return { ...state, favorites: action.payload }

      case 'USER/UPDATE_LOGIN':
         return { ...state, login: action.payload }

      case 'USER/UPDATE_EMAIL':
         return { ...state, email: action.payload }

      case 'USER/SET_PASSWORD':
         return { ...state, password: action.payload }

      case 'USER/SET_NEW_PASSWORD':
         return { ...state, newPassword: action.payload }

      case 'USER/SET_MESSAGE':
         return { ...state, message: action.payload }

      case 'USER/SET_LOADING':
         return { ...state, isLoading: action.payload }

      default:
         return state
   }
}

const logoutData = {
   auth: false,
   id: null,
   login: null,
   email: null,
   avatar: {photo: null, error: null},
   role: null,
   favorites: [],
   token: null
}

// Acions
export const actions = {
   setUser:   (payload: Login) => ({ type: 'USER/SET_AUTH', payload }) as const,
   setAvatar: (payload: {photo: string | null, error: string | null}) => ({ type: 'USER/SET_AVATAR', payload }) as const,
   setToken: (payload: string) => ({ type: 'USER/SET_TOKEN', payload }) as const,
   logout: () => ({ type: 'USER/SET_AUTH', payload: logoutData }) as const,
   setFavorites:  (payload: Array<Books>) => ({ type: 'USER/SET_FAVORITES', payload }) as const,
   removeFavorites:  (payload: Array<Books>) => ({ type: 'USER/REMOVE_FAVORITES', payload }) as const,
   updateLogin:  (payload: string) => ({ type: 'USER/UPDATE_LOGIN', payload }) as const,
   updateEmail:  (payload: string) => ({ type: 'USER/UPDATE_EMAIL', payload }) as const,
   setPassword:  (payload: string | null) => ({ type: 'USER/SET_PASSWORD', payload }) as const,
   setNewPassword:  (payload: string | null) => ({ type: 'USER/SET_NEW_PASSWORD', payload }) as const,
   setMessage:  (payload: string | null) => ({ type: 'USER/SET_MESSAGE', payload }) as const,
   setLoading:  (payload: boolean) => ({ type: 'USER/SET_LOADING', payload }) as const
}

// Thunks
// Get user token and send it for veritify to remain auth after page refresh
export const userFetch = (data: Login, token: string): Thunk => async dispatch => {
   try {
      dispatch(actions.setUser(data))
      dispatch(actions.setToken(token))
   } catch(e) {
      console.log(`Error: ${e}`)
   }
}
// Set fvorites
export const fetchFavorites = (userId: string, bookId: string): Thunk => async dispatch => {
   const res = await userAPI.setFavorits(userId, bookId)
   
   try {
      dispatch(actions.setFavorites(res))
   } catch(e) {
      console.log(`Error: ${e}`)
   }
}
// Remove login
export const removeFavorites = (userId: string, bookId: string): Thunk => async dispatch => {
   const res = await userAPI.removeFavorits(userId, bookId)
   
   try {
      dispatch(actions.setFavorites(res))
   } catch(e) {
      console.log(`Error: ${e}`)
   }
}
// Send image file to server for save
export const savePhoto = (id: string, file: File): Thunk => async dispatch => {
   const res = await userAPI.avatar(id, file)
   const photo = res.avatar
   const error = res.error?.message || res.error
   
   try {
      dispatch(actions.setAvatar({ photo, error }))
   } catch(e) {
      console.log(`Error: ${e}`)
   }
}
// Remove image file
export const removePhoto = (id: string): Thunk => async dispatch => {
   const res = await userAPI.deleteAvatar(id)

   if (res.status === 200) {
      dispatch(actions.setAvatar({ photo: null, error: null }))
   } else {
      console.log(`Error: ${res.status}`)
   }
}
// Update login
export const fetchLogin = (id: string | null, login: string): Thunk => async dispatch => {
   dispatch(actions.setLoading(true))
   const res = await userAPI.updateLogin(id, login)
   
   try {
      dispatch(actions.updateLogin(res.login))
      dispatch(actions.setLoading(false))
   } catch(e) {
      console.log(`Error: ${e}`)
      dispatch(actions.setLoading(false))
   }
}
// Update email
export const fetchEmail = (id: string | null, email: string): Thunk => async dispatch => {
   dispatch(actions.setLoading(true))
   const res = await userAPI.updateEmail(id, email)
   
   try {
      dispatch(actions.updateEmail(res.email))
      dispatch(actions.setLoading(false))
   } catch(e) {
      console.log(`Error: ${e}`)
      dispatch(actions.setLoading(false))
   }
}
// Update password
export const fetchPassword = (
   id: string, password: string | null, newPassword: string | null
): Thunk => async dispatch => {
   const res = await userAPI.updatePassword(id, password, newPassword)

   try {
      dispatch(actions.setMessage(res.message))
      dispatch(actions.setPassword(null))
      dispatch(actions.setNewPassword(null))
      setTimeout(() => dispatch(actions.setMessage(null)), 3000)
   } catch(e) {
      console.log(`Error: ${e}`)
   }
}

// Types
type InitialState = typeof initialState
type Action = InferAction<typeof actions>
type Thunk = BaseThunk<Action>

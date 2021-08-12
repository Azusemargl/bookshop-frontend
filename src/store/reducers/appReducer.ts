import { BaseThunk } from './../store'
import { InferAction } from "../store"

// Initial data
const initialState = {
   app: false,
   isLoading: false,
   isAuthForm: false
}

// Reducer body
export const appReducer = (state = initialState, action: Action): InitialState => {
   switch (action.type) {
      case 'APP/SET_APP':
         return { ...state, app: action.payload }

      case 'APP/SET_LOADING':
         return { ...state, isLoading: action.payload }

      case 'APP/SET_AUTHFORM':
         return { ...state, isAuthForm: action.payload }


      default:
         return state
   }
}

// Actions
export const actions = {
   setApp: (payload: boolean) => ({ type: 'APP/SET_APP', payload }) as const,
   setLoading: (payload: boolean) => ({ type: 'APP/SET_LOADING', payload }) as const,
   setAuthForm: (payload: boolean) => ({ type: 'APP/SET_AUTHFORM', payload }) as const,
}

// Thunks
// Set app
export const fetchApp = (value: boolean): Thunk => async dispatch => {
   try {
      dispatch(actions.setApp(value))
   } catch(e) {
      console.log(`Error: ${e}`)
   }
}
// Set app loading
export const fetchLoading = (value: boolean): Thunk => async dispatch => {
   try {
      dispatch(actions.setLoading(value))
   } catch(e) {
      console.log(`Error: ${e}`)
   }
}

// Types
type InitialState = typeof initialState
type Action = InferAction<typeof actions>
type Thunk = BaseThunk<Action>

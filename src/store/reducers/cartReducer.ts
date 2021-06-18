import { BaseThunk } from './../store'
import { InferAction } from "../store"
import { cartAPI } from '../../utils/api/cart.api'
import { BooksCart } from '../../types/bookTypes'

// Initial data
const initialState = {
   books: [] as Array<BooksCart>,
   isLoading: true,
   isDisabled: [] as Array<string>
}

// Reducer body
export const cartReducer = (state = initialState, action: Action): InitialState => {
   switch (action.type) {
      case 'CART/SET_BOOKS':
         return { ...state, books: action.payload }

      case 'CART/SET_LOADING':
         return { ...state, isLoading: action.payload }

      case 'CART/SET_DISABLED':
         return { ...state, isDisabled: [...state.isDisabled, action.payload] }

      case 'CART/REMOVE_DISABLED':
         return { ...state, isDisabled: [...state.isDisabled.filter(item => item !== action.payload)] }

      default:
         return state
   }
}

// Actions
export const actions = {
   setBooks: (payload: Array<BooksCart>) => ({ type: 'CART/SET_BOOKS', payload }) as const,
   setLoading: (payload: boolean) => ({ type: 'CART/SET_LOADING', payload }) as const,
   setDisabled: (payload: string) => ({ type: 'CART/SET_DISABLED', payload }) as const,
   removeDisabled: (payload: string) => ({ type: 'CART/REMOVE_DISABLED', payload }) as const
}

// Thunks
// Get all the books
export const getCartItem = (id: string): Thunk => async dispatch => {
   const res = await cartAPI.getBooks(id)

   try {
      dispatch(actions.setBooks(res))
      dispatch(actions.setLoading(false))
   } catch (e) {
      console.log(`Error: ${e}`)
      dispatch(actions.setLoading(false))
      dispatch(actions.setLoading(false))
   }
}
export const fetchCartItem = (bookId: string, cartId: string): Thunk => async dispatch => {
   dispatch(actions.setDisabled(bookId))
   const res = await cartAPI.setBooks(bookId, cartId)

   try {
      dispatch(actions.setBooks(res))
      dispatch(actions.removeDisabled(bookId))
   } catch (e) {
      console.log(`Error: ${e}`)
      dispatch(actions.removeDisabled(bookId))
   }
}
export const removeCartItem = (bookId: string, cartId: string, cartProductId: string): Thunk => async dispatch => {
   dispatch(actions.setDisabled(bookId))
   const res = await cartAPI.removeBooks(bookId, cartId, cartProductId)

   try {
      dispatch(actions.setBooks(res))
      dispatch(actions.removeDisabled(bookId))
      dispatch(actions.setLoading(false))
   } catch (e) {
      console.log(`Error: ${e}`)
      dispatch(actions.removeDisabled(bookId))
      dispatch(actions.setLoading(false))
   }
}

// Types
type InitialState = typeof initialState
type Action = InferAction<typeof actions>
type Thunk = BaseThunk<Action>

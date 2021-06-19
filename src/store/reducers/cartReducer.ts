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

      case 'CART/SET_COUNT_BOOKS':
         return {...state, books: state.books.map(book => book._id === action.payload.id
               ? { ...book, count: action.payload.count }
               : book
            ) 
         }

      default:
         return state
   }
}

// Actions
export const actions = {
   setBooks: (payload: Array<BooksCart>) => ({ type: 'CART/SET_BOOKS', payload }) as const,
   setLoading: (payload: boolean) => ({ type: 'CART/SET_LOADING', payload }) as const,
   setDisabled: (payload: string) => ({ type: 'CART/SET_DISABLED', payload }) as const,
   removeDisabled: (payload: string) => ({ type: 'CART/REMOVE_DISABLED', payload }) as const,
   setCountBooks: (payload: CounterResponse) => ({ type: 'CART/SET_COUNT_BOOKS', payload }) as const
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
// Set new cart item
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
// Remove current cart item
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
// Change product count
export const changeCountCartItem = (itemId: string, count: number): Thunk => async dispatch => {
   const res = await cartAPI.changeCounter(itemId, count)
   const data = { id: itemId, count: res.count }

   try {
      dispatch(actions.setCountBooks(data))
   } catch (e) {
      console.log(`Error: ${e}`)
   }
}

// Types
type InitialState = typeof initialState
type Action = InferAction<typeof actions>
type Thunk = BaseThunk<Action>
type CounterResponse = { id: string, count: number }

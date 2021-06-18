import { BaseThunk } from './../store'
import { InferAction } from "../store"
import { Books } from '../../types/bookTypes'
import { bookAPI } from '../../utils/api/book.api'
import { fetchLoading } from './appReducer'

// Initial data
const initialState = {
   items: [] as Array<Books>
}

// Reducer body
export const bookReducer = (state = initialState, action: Action): InitialState => {
   switch (action.type) {
      case 'BOOK/SET_BOOKS':
         return { ...state, items: action.payload }

      default:
         return state
   }
}

// Acions
export const actions = {
   setBooks: (payload: Array<Books>) => ({ type: 'BOOK/SET_BOOKS', payload }) as const,
}

// Thunks
// Get all the books
export const fetchBooks = (): Thunk => async dispatch => {
   dispatch(fetchLoading(true))
   const res = await bookAPI.getBooks()

   try {
      dispatch(actions.setBooks(res))
      dispatch(fetchLoading(false))
   } catch (e) {
      console.log(`Error: ${e}`)
      dispatch(fetchLoading(false))
   }
}

// Types
type InitialState = typeof initialState
type Action = InferAction<typeof actions>
type Thunk = BaseThunk<Action>

import { BaseThunk } from './../store'
import { InferAction } from "../store"
import { Books } from '../../types/bookTypes'
import { bookAPI } from '../../utils/api/book.api'
import { fetchLoading } from './appReducer'
import { FilterTypes } from '../../types/filterTypes'

// Initial data
const initialState = {
   books: [] as Array<Books>,
   filter: {} as FilterTypes
}

// Reducer body
export const filterReducer = (state = initialState, action: Action): InitialState => {
   switch (action.type) {
      case 'FILTER/SET_BOOKS':
         return { ...state, books: action.payload }

      case 'FILTER/SET_FILTER':
            return { ...state, filter: action.payload }

      default:
         return state
   }
}

// Acions
export const actions = {
   setBooks: (payload: Array<Books>) => ({ type: 'FILTER/SET_BOOKS', payload }) as const,
   setFilter: (payload: FilterTypes) => ({ type: 'FILTER/SET_FILTER', payload }) as const,
}

// Thunks
// Set filter
export const setFilter = (filter: FilterTypes): Thunk => async dispatch => {
   try {
      dispatch(actions.setFilter(filter))
   } catch (e) {
      console.log(`Error: ${e}`)
      dispatch(fetchLoading(false))
   }
}
// Set filter
export const fetchFilterBooks = (filter: FilterTypes): Thunk => async dispatch => {
   dispatch(fetchLoading(true))
   const res = await bookAPI.getFilteredBooks(filter)

   try {
      dispatch(actions.setBooks(res))
      dispatch(actions.setFilter(filter))
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

import { Books } from "../../types/bookTypes"
import { InferAction } from "../store"
import books from "../books.json"

const initialState = {
   books: books as Array<Books>
}

export const productReducer = (state = initialState, action: Action) => {
   switch (action.type) {
      case 'PRODUCT/SET_PRODUCTS':
         return {...state, ...action.payload}
   
      default:
         return state
   }
}

export const actions = {
   setProduct: (payload: Books) => ({ type: 'PRODUCT/SET_PRODUCTS', payload }) as const
}

// Types
type InitialState = typeof initialState
type Action = InferAction<typeof actions>

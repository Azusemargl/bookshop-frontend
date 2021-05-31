import { Books } from "../../types/types"
import { InferAction } from "../store"

const initialState = {
   books: [
      {
         id: 1,
         name: 'Атака титанов. Книга 1',
         image: 'https://cdn1.ozone.ru/s3/multimedia-d/wc1200/6011956477.jpg',
         author: 'Исаяма Хадзимэ',
         rating: 5,
         review: 723,
         price: 495,
         past_price: 569,
      },
      {
         id: 2,
         name: 'Технологическая сингулярность',
         image: 'https://cdn1.ozone.ru/multimedia/wc1200/1017508200.jpg',
         author: 'Шанахан Мюррей',
         rating: 4,
         review: 31,
         price: 325,
         past_price: 387,
      }
   ]
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

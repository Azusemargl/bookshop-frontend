import { InferAction } from "../store"
import { Stories } from "../../types/storiesTypes"
import stories from "../stories.json"

const initialState = {
   stories: stories as Array<Stories>
}

export const storiesReducer = (state = initialState, action: Action) => {
   switch (action.type) {
      case 'STORIES/SET_STORIES':
         return {...state, ...action.payload}
   
      default:
         return state
   }
}

export const actions = {
   setProduct: (payload: Stories) => ({ type: 'STORIES/SET_STORIES', payload }) as const
}

// Types
type Action = InferAction<typeof actions>

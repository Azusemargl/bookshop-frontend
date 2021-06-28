import { BaseThunk, InferAction } from './../store'
import { orderAPI } from '../../utils/api/order.api'
import { Order } from '../../types/orderTypes'

const initialState = {
   order: [] as Array<Order> | []
}

export const orderReducer = (state = initialState, action: Action): InitialState => {
   switch(action.type) {
      case 'ORDER/SET_ORDER':
         return { ...state, order: [...state.order, action.payload] }

      default:
         return state
   }
}

// Actions
export const actions = {
   setOrder: (payload: Order) => ({ type: 'ORDER/SET_ORDER', payload }) as const
}

// Thunks
export const fetchOrder = (data: Order): Thunk => async dispatch => {
   const res = await orderAPI.setOrder(data)

   if (res.status === 200) {
      dispatch(actions.setOrder(res.data))
   } else {
      console.log('Server error')
   }
}

// Types
type InitialState = typeof initialState
type Action = InferAction<typeof actions>
type Thunk = BaseThunk<Action>

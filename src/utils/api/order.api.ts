import { instance } from './api'
import { Order } from '../../types/orderTypes'

export const orderAPI = {
   setOrder: (order: Order) => {
      return instance.post<Order>('order/create', { order })
   }
}
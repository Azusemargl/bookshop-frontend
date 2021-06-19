import { instance } from './api'
import { BooksCart } from '../../types/bookTypes'

export const cartAPI = {
   getBooks: (id: string) => {
      return instance.get<Array<BooksCart>>(`/cart/get/${id}`).then(res => res.data)
   },
   setBooks: (bookId: string, cartId: string) => {
      return instance.post<Array<BooksCart>>('/cart/add', {bookId, cartId}).then(res => res.data)
   },
   removeBooks: (bookId: string, cartId: string, cartProductId: string) => {
      return instance.post<Array<BooksCart>>('/cart/remove', {bookId, cartId, cartProductId}).then(res => res.data)
   },
   changeCounter: (itemId: string, count: number) => {
      return instance.post<{count: number}>('/cart/count', {itemId, count}).then(res => res.data)
   }
}

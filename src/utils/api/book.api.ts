import { instance } from './api'
import { Books } from '../../types/bookTypes'

export const bookAPI = {
   getBooks: () => {
      return instance.get<Array<Books>>('/books/all').then(res => res.data)
   }
}

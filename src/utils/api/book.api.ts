import { instance } from './api'
import { Books } from '../../types/bookTypes'
import { FilterTypes } from '../../types/filterTypes'
import { SearchTypes } from './../../types/filterTypes';

export const bookAPI = {
   getBooks: () => {
      return instance.get<Array<Books>>('/books/all').then(res => res.data)
   },
   getFilteredBooks: (filter: FilterTypes) => {
      return instance.post<Array<Books>>('/books/filtered', {filter}).then(res => res.data)
   },
   getFilteredBooksBySearch: (filter: SearchTypes) => {
      return instance.post<Array<Books>>('/books/search', {filter}).then(res => res.data)
   }
}

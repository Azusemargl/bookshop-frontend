import { instance } from './api'
import { Books } from '../../types/bookTypes'
import { ParsedQuery } from 'query-string'

export const filterAPI = {
   getFilterBooks: (filter: ParsedQuery<string>) => {
      return instance.post<Array<Books>>('/filter', { filter }).then(res => res.data)
   }
}

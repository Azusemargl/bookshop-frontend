import { Books } from '../../types/bookTypes'
import { discount } from './discount'

export const sort = (
   filtered: Array<Books>, filter: string, limit: number | undefined
) => {
   switch (filter) {
      case 'new':
         return filtered.sort((prev, next) => next.date - prev.date).slice(0, limit)

      case 'bestsellers':
         return filtered.filter(book => book.sales >= 1000).slice(0, limit)

      case 'best_prices':
         return filtered.sort((prev, next) => {
            return discount(next.past_price, next.price) - discount(prev.past_price, prev.price)
         }).slice(0, limit)
   
      default:
         break
   }
}

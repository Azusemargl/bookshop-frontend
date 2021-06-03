import { Books } from '../../types/bookTypes'
import { discount } from './discount'

export const sort = (
   setFiltered: (value: Array<Books>) => void, filtered: Array<Books>, filter: string, limit: number | undefined
) => {
   switch (filter) {
      case 'new':
         const newBooks = []
         newBooks.push(...filtered.sort((prev, next) => next.date - prev.date).slice(0, limit))
         setFiltered(newBooks)
         break

      case 'bestsellers':
         const bestsellers = []
         bestsellers.push(...filtered.filter(book => book.sales >= 1000).slice(0, limit))
         setFiltered(bestsellers)
         break

      case 'best_prices':
         const best_prices = []
         best_prices.push(...filtered.sort((prev, next) => {
            return discount(next.past_price, next.price) - discount(prev.past_price, prev.price)
         }).slice(0, limit))
         setFiltered(best_prices)
         break
   
      default:
         break
   }
}

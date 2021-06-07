import { Books } from "../../types/bookTypes"

export const userAnalysis = {
   getCategories: (orders: Array<Books>) => {
      const categories = orders.map(order => order.category) // Get book categories
      return categories.filter((value, index, self) => self.indexOf(value) === index) || 0 // Get unique categories
   },

   getCategoriesCount: (categories: Array<string>, orders: Array<Books>) => {
      let order = []

      for (let i = 0; i < categories.length; i++) {
         let currentCategory = 0
         orders.forEach(item => orders[i].category === item.category && currentCategory++)
         order.push(currentCategory)
      }

      return order
   }
}
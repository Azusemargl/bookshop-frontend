import { BooksCart } from "./bookTypes"

export type Order = {
   cartProductsId: Array<BooksCart>
   price: number
   userId: string | null
   name: string | null
   email: string | null
   city: string
   address: string
   completed: boolean
}

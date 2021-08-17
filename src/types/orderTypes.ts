import { BooksCart } from "./bookTypes"

export type Order = {
   _id?: string | null
   books: Array<BooksCart>
   price: number
   userId: string | null
   name: string | null
   email: string | null
   city: string
   address: string
   completed: boolean
}

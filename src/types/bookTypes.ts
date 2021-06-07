export type Books = {
   id: number
   name: string
   image: string
   author: string
   rating: number
   review: number
   price: number
   past_price: number
   category: string
   yaer: number
   date: number
   sales: number
}

export type BookCard = {
   id?: number
   name: string
   image: string
   author: string
   rating: number
   review: number
   price: number
   past_price: number
   sales?: number
}

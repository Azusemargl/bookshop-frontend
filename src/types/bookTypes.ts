export type Books = {
   _id: string
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
   _id: string
   name: string
   image: string
   author: string
   rating: number
   review: number
   price: number
   past_price: number
   sales?: number
}

export type BooksCart = {
   _id: string
   book: Books
   count: number
}

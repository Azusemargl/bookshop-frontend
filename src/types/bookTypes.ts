export type Books = {
   _id: string
   name: string
   image: string
   author: string
   publisher: string
   rating: number
   review: number
   price: number
   past_price: number
   category: string
   year_of_issue: number
   cover_type: string
   number_of_pages: number
   age_restrictions: number
   description: string
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

import React from 'react'
import { Product } from '../../components'
import { BookCard } from '../../types/bookTypes'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './products.scss'

const Products: React.FC<Props> = ({ books }) => {
   return (
      <>
         {books.map(book => (
            <Product
               key={book.id}
               name={book.name}
               image={book.image}
               author={book.author}
               rating={book.rating}
               review={book.review}
               price={book.price}
               past_price={book.past_price}
            />
         ))}
      </>
   )
}

export default Products

// Types
type Props = {
   books: Array<BookCard>
}

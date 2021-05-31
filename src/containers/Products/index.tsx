import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { Product } from '../../components'
import './products.scss'

const Products = () => {
   const books = useSelector((state: AppState) => state.products.books)
   
   return (
      <div className="products">
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
      </div>
   )
}

export default Products

import React from 'react'
import { useSelector } from 'react-redux'
import { Empty, Product } from '../../components'
import { AppState } from '../../store/store'
import './favorits.scss'

const Favorits: React.FC = React.memo(() => {
   const { favorites } = useSelector((state: AppState) => state.user)

   return (
      <>
         {favorites.length >= 1 ? (
            <div className="favorits">
               {favorites.map(book => (
                  <Product
                     _id={book._id}
                     key={book._id}
                     name={book.name}
                     image={book.image}
                     author={book.author}
                     rating={book.rating}
                     review={book.review}
                     price={book.price}
                     past_price={book.past_price}
                     sales={book.sales}
                     mainPage={true}
                  />
               ))}
            </div>
         ) : (
            <Empty title="Нет избранных книг" />
         )}
      </>
   )
})

export default Favorits

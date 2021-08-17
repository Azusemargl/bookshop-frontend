import React from 'react'
import Slider from "react-slick"
import { Product } from '..'
import { sort } from '../../utils/helpers/sort'
import { home_slider } from '../../utils/sliders/settings'
import { Books } from '../../types/bookTypes'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './section.scss'

const Section: React.FC<Props> = React.memo(({ title, books, filter }) => {
   const [filtered, setFiltered] = React.useState<Array<Books> | undefined>([...books])

   React.useEffect(() => setFiltered(sort(books, filter, 16)), [books])

   return (
      <div className="section">
         <h2 className="home__title">{title}</h2>
         <Slider {...home_slider}>
            {filtered && filtered.map(book => (
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
         </Slider>
      </div>
   )
})

export default Section

// Props
type Props = {
   title: string
   books: Array<Books>
   filter: 'new' | 'bestsellers' | 'best_prices'
}

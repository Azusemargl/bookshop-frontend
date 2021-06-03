import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { Stories } from '../../containers'
import { Section } from '../../components'
import './home.scss'

const Home: React.FC = React.memo(() => {
   const books = useSelector((state: AppState) => state.products.books)

   return (
      <div className="home">
         <Stories />
         <Section title="Новинки" books={books} filter="new" />
         <Section title="Бестселлеры" books={books} filter="bestsellers" />
         <Section title="Лучшие цены" books={books} filter="best_prices" />
      </div>
   )
})

export default Home

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { fetchBooks } from '../../store/reducers/bookReducer'
import { Stories } from '../../containers'
import { Section } from '../../components'
import './home.scss'

const Home: React.FC = React.memo(() => {
   const dispatch = useDispatch()
   const books = useSelector((state: AppState) => state.books.items)

   React.useEffect(() => {
      dispatch(fetchBooks())
   }, [])

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
